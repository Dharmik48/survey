package api

import (
	"encoding/json"
	"net/http"

	"github.com/dharmik48/survey/auth"
	"github.com/dharmik48/survey/database"
	"github.com/dharmik48/survey/models"
	"github.com/dharmik48/survey/types"
)

func NewSurvey(w http.ResponseWriter, r *http.Request) {
	var data models.Survey
	cookie, err := r.Cookie("jwt")

	if err != nil {
		Error(w, "Not authenticated.", http.StatusUnauthorized)
		return
	}

	id, err := auth.GetIdFromToken(cookie.Value)

	if err != nil {
		Error(w, "Could not verify user.", http.StatusUnauthorized)
		return
	}

	data.UserID = id

	if res := database.DB.Model(&models.Survey{}).Create(&data); res.Error != nil {
		Error(w, "Could not create survey.", http.StatusInternalServerError)
		return
	}

	res := types.Response{
		Status: types.Success,
		Message: "Survey created",
		Data: data,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}

func GetSurveys(w http.ResponseWriter, r *http.Request) {
	var surveys []models.Survey

	if res := database.DB.Model(&models.Survey{}).Find(&surveys); res.Error != nil {
		Error(w, "Could not fetch surveys", http.StatusInternalServerError)
	}

	res := types.Response{
		Status: types.Success,
		Message: "Success",
		Data: surveys,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}