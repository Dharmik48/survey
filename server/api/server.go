package api

import (
	"encoding/json"
	"net/http"

	"github.com/dharmik48/survey/auth"
	"github.com/dharmik48/survey/types"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
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
	s.Use(authMiddleware)

	// surveys
	r.HandleFunc("/api/survey", NewSurvey).Methods(http.MethodPost)
	r.HandleFunc("/api/surveys", GetSurveys).Methods(http.MethodGet)
	r.HandleFunc("/api/surveys/{id}", GetSurvey).Methods(http.MethodGet)
	r.HandleFunc("/api/surveys/{id}", UpdateSurveyDetails).Methods(http.MethodPut)
	r.HandleFunc("/api/surveys/{id}", DeleteSurvey).Methods(http.MethodDelete)

	r.HandleFunc("/api/surveys/published/{id}", GetPublishedSurvey).Methods(http.MethodGet)

	// responses
	r.HandleFunc("/api/response/{surveyID}", NewResponse).Methods(http.MethodPost)
	s.HandleFunc("/api/response/{surveyID}", GetResponses).Methods(http.MethodGet)

	c := cors.New(cors.Options{
    AllowedOrigins: []string{"https://surveysphere-web.vercel.app"},
    AllowCredentials: true,
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
    Debug: true,
})

	handler := c.Handler(r)

	server := &http.Server{
		Addr:    addr,
		Handler: handler,
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

func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		jwt, err := r.Cookie("jwt")

		if err != nil {
			Error(w, "Not authenticated.", http.StatusUnauthorized)
			return
		}

		if _, err := auth.GetIdFromToken(jwt.Value); err != nil {
			Error(w, "Failed to verify user.", http.StatusInternalServerError)
			return
		}

		next.ServeHTTP(w, r)
	})
}