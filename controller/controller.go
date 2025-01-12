package controller

import (
	"encoding/json"
	"net/http"

	"github.com/go-playground/validator/v10"
)

type User struct {
	Email string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8,max=32"`
}

func Signup(w http.ResponseWriter, r *http.Request) {
	var user User

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Failed to decode JSON.", http.StatusBadRequest)
		return
	}

	// validation
	validate := validator.New()

	if err := validate.Struct(user); err != nil {
		http.Error(w, "Failed to validate data", http.StatusBadRequest)
		return
	}

	json, err := json.Marshal("Success")

	if err != nil {
		http.Error(w, "Could not convert response to JSON.", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write(json)
}