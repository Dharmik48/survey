package main

import (
	"fmt"
	"log"

	"github.com/dharmik48/survey/api"
	"github.com/dharmik48/survey/config"
	"github.com/dharmik48/survey/database"
)

func main() {
	env := config.New()
	database.Connect(env.DatabaseURL)

	// start server
	var addr string
	PORT := env.Port

	if PORT == "" {
		addr = "0.0.0.0:3000"
	} else {
		addr = fmt.Sprintf("0.0.0.0:%v", PORT)
	}

	server := api.NewServer(addr)

	fmt.Printf("Listening on %v", addr)
	if err := server.ListenAndServe(); err != nil {
		log.Println(err.Error())
	}
}