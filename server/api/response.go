package api

import (
	"encoding/json"
	"net/http"

	"github.com/dharmik48/survey/auth"
	"github.com/dharmik48/survey/database"
	"github.com/dharmik48/survey/models"
	"github.com/dharmik48/survey/types"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

func NewResponse(w http.ResponseWriter, r *http.Request) {
	var data []map[string]string
	params := mux.Vars(r)
	surveyID := params["surveyID"]

	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		Error(w, "Failed to decode JSON.", http.StatusBadRequest)
		return
	}

	txerr := database.DB.Transaction(func(tx *gorm.DB) error {
		for _, el := range data {
			response := types.SurveyResponseSchema{
				QuestionID: el["id"],
				SurveyID: surveyID,
				Value: el["value"],
			}

			if res := database.DB.Model(&models.Response{}).Create(&response); res.Error != nil {
				return res.Error
			}
		}

		return nil
	})

	if txerr != nil {
		Error(w, "Failed to submit response.", http.StatusInternalServerError)
		return
	}

	res := types.Response{
		Status: types.Success,
		Message: "Response Submited",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}

func GetResponses(w http.ResponseWriter, r *http.Request) {
	var responses []types.ResponseSchema
	var survey models.Survey
	params := mux.Vars(r)
	surveyID := params["surveyID"]

	jwt, err := r.Cookie("jwt")

	if err != nil {
		Error(w, "Not authenticated.", http.StatusUnauthorized)
		return
	}

	userID, err := auth.GetIdFromToken(jwt.Value)

	if err != nil {
		Error(w, "Failed to verify user.", http.StatusInternalServerError)
		return
	}

	if err := database.DB.Where("user_id = ?",userID).First(&survey).Error; err != nil {
		Error(w, "Failed to fetch responses.", http.StatusUnauthorized)
		return
	}

	if err := database.DB.Model(&models.Response{}).Where("survey_id = ?", surveyID).Find(&responses).Error; err != nil {
		Error(w, "Failed to get responses.", http.StatusInternalServerError)
		return
	}

	res := types.Response{
		Status: types.Success,
		Data: responses,
		Message: "Success",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}