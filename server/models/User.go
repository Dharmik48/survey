package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID       uuid.UUID `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Email    string  `json:"email" validate:"required,email" gorm:"unique"`
	Password string  `json:"password" validate:"required,min=8,max=64"`
}

type UserWithoutPassword struct {
	gorm.Model
	ID       uuid.UUID `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Email    string  `json:"email" validate:"required,email" gorm:"unique"`
}