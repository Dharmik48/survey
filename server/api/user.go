package api

import (
	"encoding/json"
	"errors"
	"net/http"

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