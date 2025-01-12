package database

import (
	"log"

	"github.com/dharmik48/survey/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect(url string) {
	con, err := gorm.Open(postgres.Open(url))

	if err != nil {	log.Fatal("Could not connect to database.") }

	con.AutoMigrate(&models.User{})
}