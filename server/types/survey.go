package types

import "github.com/dharmik48/survey/models"

type UpdateSurveyDetailsSchema struct {
	Survey models.Survey `json:"survey"`
	Question []models.Question `json:"questions"`
}