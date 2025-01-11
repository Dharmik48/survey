package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)


func main() {
	err := godotenv.Load(".env.local")

	if err != nil { log.Fatal("Error loading .env: ", err) }

	port := os.Getenv("PORT")

	// router
	r := mux.NewRouter()

	// function handlers

	// start server
	var addr string

	if port == "" {
		addr = "0.0.0.0:3000"
	} else {
		addr = fmt.Sprintf("0.0.0.0:%v", port)
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