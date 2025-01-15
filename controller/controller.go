package controller

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/dharmik48/survey/auth"
	"github.com/dharmik48/survey/database"
	"github.com/dharmik48/survey/models"
	"github.com/go-playground/validator/v10"
	"gorm.io/gorm"
)

func Signup(w http.ResponseWriter, r *http.Request) {
	var user models.User

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Failed to decode JSON.", http.StatusBadRequest)
		return
	}

	// validation
	validate := validator.New()

	if err := validate.Struct(user); err != nil {
		http.Error(w, "Failed to validate data.", http.StatusBadRequest)
		return
	}

	// hash password
	if err := auth.Hash(&user.Password); err != nil {
		http.Error(w, "Failed to hash password.", http.StatusInternalServerError)
		return
	}

	result := database.DB.Create(&user)

	if errors.Is(result.Error, gorm.ErrDuplicatedKey) {
		http.Error(w, "Email already exists.", http.StatusConflict)
		return
	}

	if result.Error != nil {
		http.Error(w, "Could not create user.", http.StatusInternalServerError)
		return
	}

	json, err := json.Marshal(user.ID)

	if err != nil {
		http.Error(w, "Could not convert response to JSON.", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write(json)
}