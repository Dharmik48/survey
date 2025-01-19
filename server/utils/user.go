package utils

import "github.com/dharmik48/survey/models"

func ExtractUserWithoutPassword(user models.User, userWithoutPassword *models.UserWithoutPassword) {
	userWithoutPassword.CreatedAt = user.CreatedAt
	userWithoutPassword.DeletedAt = user.DeletedAt
	userWithoutPassword.UpdatedAt = user.UpdatedAt
	userWithoutPassword.Email = user.Email
	userWithoutPassword.ID = user.ID
}