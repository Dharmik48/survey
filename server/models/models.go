package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Model struct {
	ID       uuid.UUID `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `json:"deletedAt" gorm:"index"`
}

type User struct {
	Username string `json:"username" validate:"required,min=3,max=50"`
	Email    string  `json:"email" validate:"required,email" gorm:"unique"`
	Password string  `json:"password" validate:"required,min=8,max=64"`
	Surveys []Survey `json:"surveys"`
	Model
}

type Survey struct {
	Title string `json:"title" validate:"min=3,max=50" gorm:"default:Untitled"`
	Description string `json:"description"`
	UserID uuid.UUID `json:"userID"`
	Questions []Question `json:"questions"`
	Published bool `json:"published"`
	Model
}

type Question struct {
	Label string `json:"label" validate:"required,min=3,max=35"`
	Name string `json:"name" validate:"required,min=3,max=35,uniqueIndex:idx_survey_name"`
	Type string `json:"type"`
	Options string `json:"options" gorm:"default:null"`
	SurveyID uuid.UUID `json:"surveyID"`
	ID       uuid.UUID `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type Response struct {
	SurveyID uuid.UUID `json:"surveyID"`
	QuestionID uuid.UUID `json:"questionID"`
	Value string `json:"value"`
	ID       uuid.UUID `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}