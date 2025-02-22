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

func GetSurvey(w http.ResponseWriter, r *http.Request) {
	var survey models.Survey
	params := mux.Vars(r)
	id := params["id"]

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

	if res := database.DB.Preload("Questions").Where("id = ? and user_id = ?", id, userID).First(&survey); res.Error != nil {
		Error(w, "Could not find survey.", http.StatusNotFound)
		return
	}

	res := types.Response{
		Status: types.Success,
		Message: "Survey retrieved.",
		Data: survey,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}

func UpdateSurveyDetails(w http.ResponseWriter, r *http.Request) {
	var data types.UpdateSurveyDetailsSchema
	cookie, err := r.Cookie("jwt")

	if err != nil {
		Error(w, "Not authenticated.", http.StatusUnauthorized)
		return
	}

	id, err := auth.GetIdFromToken(cookie.Value);

	if err != nil {
		Error(w, "Could not verify user.", http.StatusUnauthorized)
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		Error(w, "Failed to decode JSON.", http.StatusBadRequest)
		return
	}

	if id != data.Survey.UserID {
		Error(w, "Not allowed.", http.StatusUnauthorized)
		return
	}

	txerr := database.DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Save(&data.Survey).Error; err != nil {
			return err
		}

		if (len(data.Question) == 0) { return nil }

		for _, question := range data.Question {
			var err error

			if question.Name == "" {
				err = tx.Delete(&question).Error
			} else {
				err = tx.Save(&data.Question).Error
			}

			if err != nil { return err }
		}

		return nil
	})

	if txerr != nil {
		Error(w, "Faild to save survey.", http.StatusInternalServerError)
		return
	}

	res := types.Response{
		Status: types.Success,
		Message: "Success",
		Data: data,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}

func DeleteSurvey(w http.ResponseWriter, r *http.Request) {
	var survey models.Survey
	params := mux.Vars(r)
	id := params["id"]
	cookie, err := r.Cookie("jwt")

	if err != nil {
		Error(w, "Not authenticated.", http.StatusUnauthorized)
		return
	}

	userID, err := auth.GetIdFromToken(cookie.Value);

	if err != nil {
		Error(w, "Could not verify user.", http.StatusUnauthorized)
		return
	}

	if err := database.DB.Where("id = ?", id).First(&survey).Error; err != nil {
		Error(w, "Could not find survey.", http.StatusNotFound)
		return
	}

	if userID != survey.UserID {
		Error(w, "Not allowed.", http.StatusUnauthorized)
		return
	}

	txerr := database.DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Unscoped().Model(&survey).Association("Questions").Unscoped().Clear(); err != nil {
			return err
		}

		if err := tx.Delete(&survey).Error; err != nil {
			return err
		}

		return nil
	})

	if txerr != nil {
		Error(w, "Faild to delete survey.", http.StatusInternalServerError)
		return
	}

	res := types.Response{
		Status: types.Success,
		Message: "Successfuly deleted survey.",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}