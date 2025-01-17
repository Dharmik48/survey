package auth

import (
	"log"
	"os"
	"time"

	"github.com/dharmik48/survey/models"
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
)


type ErrMissingTokenSecret struct{}

func (e *ErrMissingTokenSecret) Error() string {
	return "Missing token secret."
}

func GenerateToken(user models.User) (string, error) {
	err := godotenv.Load(".env.local")

	if err != nil { log.Fatal("Error loading .env: ", err) }

	TOKEN_SECRET := os.Getenv("TOKEN_SECRET")

	if TOKEN_SECRET == "" { return "", &ErrMissingTokenSecret{} }

	t := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 7).Unix(),
	})

	s, err := t.SignedString([]byte(TOKEN_SECRET))

	return s, err
}