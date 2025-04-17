package auth

import (
	"fmt"
	"time"

	"github.com/dharmik48/survey/config"
	"github.com/dharmik48/survey/models"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
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
	config := config.New()

	t := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 7).Unix(),
	})

	s, err := t.SignedString([]byte(config.JWTSecret))

	return s, err
}

func VerifyToken(token string) (*Claims, error) {
	var claims Claims

	config := config.New()

	t, err := jwt.ParseWithClaims(token, &claims, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method")
		}

		return []byte(config.JWTSecret), nil
	})

	if err != nil { return nil, err }

	if !t.Valid { return nil, fmt.Errorf("invalid token") }

	return &claims, nil
}

func GetIdFromToken(token string) (uuid.UUID, error) {
	claims, err := VerifyToken(token)

	if err != nil {
		return uuid.Nil, err
	}

	return claims.ID, nil
}