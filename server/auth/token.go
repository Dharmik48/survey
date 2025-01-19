package auth

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/dharmik48/survey/models"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/joho/godotenv"
)


type ErrMissingTokenSecret struct{}
type Claims struct {
	ID uuid.UUID
	jwt.MapClaims
}

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

func VerifyToken(token string) (*Claims, error) {
	var claims Claims
	err := godotenv.Load(".env.local")

	if err != nil { log.Fatal("Error loading .env: ", err) }

	TOKEN_SECRET := os.Getenv("TOKEN_SECRET")

	if TOKEN_SECRET == "" { return nil, &ErrMissingTokenSecret{} }

	t, err := jwt.ParseWithClaims(token, &claims, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method")
		}

		return []byte(TOKEN_SECRET), nil
	})

	if err != nil { return nil, err }

	if !t.Valid { return nil, fmt.Errorf("invalid token") }

	return &claims, nil
}