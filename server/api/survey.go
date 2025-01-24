package api

import (
	"encoding/json"
	"net/http"

	"github.com/dharmik48/survey/database"
	"github.com/dharmik48/survey/models"
	"github.com/dharmik48/survey/types"
)

func NewSurvey(w http.ResponseWriter, r *http.Request) {
	var data models.Survey

	if res := database.DB.Model(&models.Survey{}).Create(&data); res.Error != nil {
		Error(w, "Could not create survey.", http.StatusInternalServerError)
	}

	res := types.Response{
		Status: types.Success,
		Message: "Survey created",
		Data: data,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}