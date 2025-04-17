package types

import "github.com/dharmik48/survey/models"

type RegisterSchema struct {
	Username string `json:"username" validate:"required,min=3,max=50"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8,max=64"`
	Surveys []models.Survey `json:"surveys"`
	models.Model
}

type LoginSchema struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8,max=64"`
	models.Model
}

type UserWithoutPassword struct {
	Username string `json:"username" validate:"required,min=3,max=50"`
	Email    string `json:"email" validate:"required,email"`
	Surveys []models.Survey `json:"surveys" gorm:"foreignKey:UserID"`
	models.Model
}