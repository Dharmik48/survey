package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/dharmik48/survey/api"
	"github.com/dharmik48/survey/database"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load(".env.local")

	if err != nil { log.Fatal("Error loading .env: ", err) }

	PORT := os.Getenv("PORT")
	DATABASE_URL := os.Getenv("DATABASE_URL")

	database.Connect(DATABASE_URL)

	// router
	r := mux.NewRouter()

	// function handlers
	r.HandleFunc("/api/signup", api.Signup).Methods(http.MethodPost)
	r.HandleFunc("/api/login", api.Login).Methods(http.MethodPost)
	r.HandleFunc("/api/user", api.GetUser).Methods(http.MethodGet)

	// start server
	var addr string

	if PORT == "" {
		addr = "0.0.0.0:3000"
	} else {
		addr = fmt.Sprintf("0.0.0.0:%v", PORT)
	}

	server := &http.Server{
		Addr: addr,
		Handler: r,
	}

	fmt.Printf("Listening on %v", addr)
	if err := server.ListenAndServe(); err != nil {
		log.Println(err.Error())
	}
}