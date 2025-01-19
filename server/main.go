package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/dharmik48/survey/api"
	"github.com/dharmik48/survey/config"
	"github.com/dharmik48/survey/database"
	"github.com/gorilla/mux"
)

func main() {
	env := config.New()

	database.Connect(env.DatabaseURL)

	// router
	r := mux.NewRouter()

	// function handlers
	r.HandleFunc("/api/signup", api.Signup).Methods(http.MethodPost)
	r.HandleFunc("/api/login", api.Login).Methods(http.MethodPost)
	r.HandleFunc("/api/user", api.GetUser).Methods(http.MethodGet)

	// start server
	var addr string
	PORT := env.Port

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