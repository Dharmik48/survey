package api

import (
	"encoding/json"
	"net/http"

	"github.com/dharmik48/survey/types"
	"github.com/gorilla/mux"
)

func NewServer(addr string) (*http.Server) {
	// router
	r := mux.NewRouter()

	// auth/user
	r.HandleFunc("/api/signup", Signup).Methods(http.MethodPost)
	r.HandleFunc("/api/login", Login).Methods(http.MethodPost)
	r.HandleFunc("/api/user", GetUser).Methods(http.MethodGet)
	r.HandleFunc("/api/logout", Logout).Methods(http.MethodGet)

	s := r.NewRoute().Subrouter()
	s.Use()

	// surveys
	r.HandleFunc("/api/survey", NewSurvey).Methods(http.MethodPost)
	r.HandleFunc("/api/surveys", GetSurveys).Methods(http.MethodGet)
	r.HandleFunc("/api/surveys/{id}", GetSurvey).Methods(http.MethodGet)
	r.HandleFunc("/api/surveys/{id}", UpdateSurveyDetails).Methods(http.MethodPut)
	r.HandleFunc("/api/surveys/{id}", DeleteSurvey).Methods(http.MethodDelete)

	server := &http.Server{
		Addr:    addr,
		Handler: r,
	}

	return server
}

func Error(w http.ResponseWriter, message string, code int) {
	res := types.Response{
		Status: types.Error,
		Message: message,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(res)
}

// func authenticationMiddleware(next http.Handler) http.Handler {
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

// 	})
// }