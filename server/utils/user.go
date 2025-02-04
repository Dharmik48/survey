package utils

import (
	"github.com/dharmik48/survey/models"
	"github.com/dharmik48/survey/types"
)

func ExtractUserWithoutPassword(user models.User, userWithoutPassword *types.UserWithoutPassword) {
	userWithoutPassword.CreatedAt = user.CreatedAt
	userWithoutPassword.DeletedAt = user.DeletedAt
	userWithoutPassword.UpdatedAt = user.UpdatedAt
	userWithoutPassword.Email = user.Email
	userWithoutPassword.Username = user.Username
	userWithoutPassword.ID = user.ID
	userWithoutPassword.Surveys = user.Surveys
}