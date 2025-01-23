package api

import (
	"net/http"

	"github.com/gorilla/mux"
)

func NewServer(addr string) (*http.Server) {
	// router
	r := mux.NewRouter()

	// function handlers
	r.HandleFunc("/api/signup", Signup).Methods(http.MethodPost)
	r.HandleFunc("/api/login", Login).Methods(http.MethodPost)
	r.HandleFunc("/api/user", GetUser).Methods(http.MethodGet)
	r.HandleFunc("/api/logout", Logout).Methods(http.MethodGet)

	server := &http.Server{
		Addr:    addr,
		Handler: r,
	}

	return server
}