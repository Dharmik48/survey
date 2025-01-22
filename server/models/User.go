package models

import (
	"github.com/dharmik48/survey/types"
)

type User struct {
	Username string `json:"username" validate:"required,min=3,max=50"`
	Email    string  `json:"email" validate:"required,email" gorm:"unique"`
	Password string  `json:"password" validate:"required,min=8,max=64"`
	types.Model
}