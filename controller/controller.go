package controller

import (
	"encoding/json"
	"net/http"
)

type User struct {
	Email string `json:"email"`
	Password string `json:"password"`
}

func Signup(w http.ResponseWriter, r *http.Request) {
	var user User

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Failed to decode JSON.", http.StatusBadRequest)
		return
	}

	// TODO: add validation
	if user.Email == "" || user.Password == "" {
		http.Error(w, "Missing Data.", http.StatusBadRequest)
		return
	}

	json, err := json.Marshal(user)

	if err != nil {
		http.Error(w, "Could not convert response to JSON.", http.StatusInternalServerError)
		return
	}

	w.Write(json)
}