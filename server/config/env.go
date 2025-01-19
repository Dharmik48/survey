package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	JWTSecret    string
	DatabaseURL string
	Port string
}

func New() Config {
	return Config{
		JWTSecret:    getEnv("TOKEN_SECRET"),
		DatabaseURL: getEnv("DATABASE_URL"),
		Port: getEnv("PORT"),
	}
}

func getEnv(key string) string {
	err := godotenv.Load(".env.local")

	if err != nil {
		log.Fatal("Error loading .env: ", err)
	}

	value := os.Getenv(key)

	if value == "" { log.Fatalf("Key is empty: %s", key) }

	return value
}