package api

import (
	"encoding/json"
	"errors"
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

func Signup(w http.ResponseWriter, r *http.Request) {
	var data types.RegisterSchema

	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		Error(w, "Failed to decode JSON.", http.StatusBadRequest)
		return
	}

	// validation
	validate := validator.New()

	if err := validate.Struct(data); err != nil {
		Error(w, "Failed to validate data.", http.StatusBadRequest)
		return
	}

	// hash password
	if err := utils.Hash(&data.Password); err != nil {
		Error(w, "Failed to hash password.", http.StatusInternalServerError)
		return
	}

	result := database.DB.Model(&models.User{}).Create(&data)

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
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(res)
}

func Login(w http.ResponseWriter, r *http.Request) {
	var data types.LoginSchema
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

	if res := database.DB.Preload("Surveys").First(&user, "email = ?", data.Email); res.Error != nil {
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

	var userWithoutPassword types.UserWithoutPassword

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
	var user types.UserWithoutPassword
	cookie, err := r.Cookie("jwt")

	if err != nil {
		Error(w, "Not authenticated.", http.StatusUnauthorized)
		return
	}

	claims, err := auth.VerifyToken(cookie.Value)
	if err != nil {
		Error(w, "Invalid token.", http.StatusUnauthorized)
		return
	}

	if res := database.DB.Model(&models.User{}).Preload("Surveys").First(&user, "id = ?", claims.ID); res.Error != nil {
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

func Logout(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, &http.Cookie{
		Name: "jwt",
		Value: "",
		Expires: time.Now(),
		SameSite: http.SameSiteStrictMode,
		HttpOnly: true,
		Secure: true,
	})

	res := types.Response{
		Status: types.Success,
		Message: "Logged out successfully",
	}

	w.Header().Set("Content/Type", "application/json")
	json.NewEncoder(w).Encode(res)
}