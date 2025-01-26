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
	UserID uuid.UUID `json:"userID"`
	Model
}