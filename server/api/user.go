package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/dharmik48/survey/auth"
	"github.com/dharmik48/survey/database"
	"github.com/dharmik48/survey/models"
	"github.com/dharmik48/survey/types"
	"github.com/dharmik48/survey/utils"
	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

func Error(w http.ResponseWriter, message string, code int) {
	res := types.Response{
		Status: types.Error,
		Message: message,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(res)
}

func Signup(w http.ResponseWriter, r *http.Request) {
	var user models.User

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		Error(w, "Failed to decode JSON.", http.StatusBadRequest)
		return
	}

	// validation
	validate := validator.New()

	if err := validate.Struct(user); err != nil {
		Error(w, "Failed to validate data.", http.StatusBadRequest)
		return
	}

	// hash password
	if err := utils.Hash(&user.Password); err != nil {
		Error(w, "Failed to hash password.", http.StatusInternalServerError)
		return
	}

	result := database.DB.Create(&user)

	if errors.Is(result.Error, gorm.ErrDuplicatedKey) {
		Error(w, "Email already exists.", http.StatusConflict)
		return
	}

	if result.Error != nil {
		Error(w, "Could not create user.", http.StatusInternalServerError)
		return
	}

	res := types.Response{
		Status: types.Success,
		Message: "Registration successful",
		Data: map[string]any{"id": user.ID },
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(res)
}

func Login(w http.ResponseWriter, r *http.Request) {
	var data models.User
	var user models.User

	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		Error(w, "Failed to decode JSON.", http.StatusBadRequest)
		return
	}

	validate := validator.New()

	if err := validate.Struct(data); err != nil {
		Error(w, "Failed to validate data.", http.StatusBadRequest)
		return
	}

	if res := database.DB.First(&user, "email = ?", data.Email); res.Error != nil {
		message := "Failed to fetch user details."
		code := http.StatusInternalServerError
		if errors.Is(res.Error, gorm.ErrRecordNotFound) {
			message = "Incorrect email or password."
			code = http.StatusNotFound
	 	}

		Error(w, message, code)
		return
	}

	if err := utils.CompareHashAndPassword(user.Password, data.Password); err != nil {
		Error(w, "Incorrect email or password.", http.StatusNotFound)
		return
	}

	jwt, err := auth.GenerateToken(user)

	if err != nil {
		Error(w, "Failed to login.", http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name: "jwt",
		Value: jwt,
		Expires: time.Now().Add(time.Hour * 24 * 7),
		HttpOnly: true,
		SameSite: http.SameSiteStrictMode,
		Secure: true,
	})

	var userWithoutPassword models.UserWithoutPassword

	utils.ExtractUserWithoutPassword(user, &userWithoutPassword)

	res := types.Response{
		Status: types.Success,
		Message: "Logged in successfully",
		Data: userWithoutPassword,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	var user models.UserWithoutPassword
	cookie, err := r.Cookie("jwt")

	if err != nil {
		fmt.Println(err)
		Error(w, "Not authenticated.", http.StatusUnauthorized)
		return
	}

	claims, err := auth.VerifyToken(cookie.Value)
	if err != nil {
		Error(w, "Invalid token.", http.StatusUnauthorized)
		return
	}

	if res := database.DB.Model(&models.User{}).First(&user, "id = ?", claims.ID); res.Error != nil {
		fmt.Println(res.Error)
		Error(w, "Failed to fetch user details.", http.StatusInternalServerError)
		return
	}

	res := types.Response{
		Status: types.Success,
		Message: "Success",
		Data: user,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}