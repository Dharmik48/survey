package types

import (
	"time"

	"github.com/dharmik48/survey/models"
)

type UpdateSurveyDetailsSchema struct {
	Survey models.Survey `json:"survey"`
	Question []models.Question `json:"questions"`
}

type SurveyResponseSchema struct {
	SurveyID string `json:"surveyID"`
	QuestionID string `json:"questionID"`
	Value any `json:"value"`
	ID       string `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}