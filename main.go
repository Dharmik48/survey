package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

type Student struct {
	ID int `json:"id"`
	Name string `json:"name"`
	Branch string `json:"branch"`
}

var db *sql.DB

func main() {
	err := godotenv.Load(".env")

	if err != nil { log.Fatal("Error loading .env: ", err) }

	CONNECTION_STRING := os.Getenv("CONNECTION_STRING")

	db, err = sql.Open("postgres", CONNECTION_STRING)

	if err != nil { log.Fatal("ERROR📛",err) }

	// router
	r := mux.NewRouter()

	// function handlers
	r.HandleFunc("/api/students", createStudent).Methods("POST")
	r.HandleFunc("/api/students", getStudents).Methods("GET")
	r.HandleFunc("/api/students/{id}", getStudent).Methods("GET")
	r.HandleFunc("/api/students/{id}", updateStudent).Methods("PUT")
	r.HandleFunc("/api/students/{id}", deleteStudent).Methods("DELETE")

	// listen on port
	fmt.Println("Listening on port 3000")
	log.Fatal(http.ListenAndServe(":3000", r))
}

func createStudent (res http.ResponseWriter, req *http.Request) {
	var stu Student

	stu.Name = req.FormValue("name")
	stu.Branch =  req.FormValue("branch")

	if stu.Name == "" || stu.Branch == "" {
		http.Error(res, "Missing data.", http.StatusBadRequest)
		return
	}

	row := db.QueryRow("INSERT INTO students (name, branch) VALUES ($1, $2) RETURNING *", stu.Name, stu.Branch)

	if err := row.Scan(&stu.ID, &stu.Name, &stu.Branch); err != nil {
		http.Error(res, "Something went wrong while inserting data: "+ err.Error() , http.StatusInternalServerError)
		return
	}

	stuJson, err := json.Marshal(stu)

	if err != nil {
		http.Error(res, "Something went wrong while creating JSON", http.StatusInternalServerError)
		return
	}
	res.WriteHeader(http.StatusCreated)
	res.Write(stuJson)
}

func getStudents (res http.ResponseWriter, req *http.Request) {
	query := "SELECT * FROM students"

	rows, err := db.Query(query)

	if err != nil {
		http.Error(res, "Something went wrong: " + err.Error(), http.StatusInternalServerError)
		return
	}

	var students []Student
	for rows.Next() {
		var stu Student

		if err := rows.Scan(&stu.ID, &stu.Name, &stu.Branch); err != nil {
			http.Error(res, "Something went wrong: " + err.Error(), http.StatusInternalServerError)
			return
		}

		students = append(students, stu)
	}

	json, err := json.Marshal(students)

	if err != nil {
		http.Error(res, "Something went wrong: " + err.Error(), http.StatusInternalServerError)
		return
	}

	res.Write(json)
}

func getStudent (res http.ResponseWriter, req *http.Request) {
	var stu Student
	id := mux.Vars(req)["id"]

	query := "SELECT * FROM students WHERE id = $1"

	row := db.QueryRow(query, id)

	if err := row.Scan(&stu.ID, &stu.Name, &stu.Branch); err != nil {
		http.Error(res, "Requested resource could not be found.", http.StatusNotFound)
		return
	}

	json, err := json.Marshal(stu)

	if err != nil {
		http.Error(res, "Something went wrong: "+err.Error(), http.StatusInternalServerError)
		return
	}

	res.Write(json)
}

func updateStudent (res http.ResponseWriter, req *http.Request) {
	var stu Student

	id := mux.Vars(req)["id"]

	name, branch := req.FormValue("name"), req.FormValue("branch")

	query := "UPDATE students SET name = $1, branch = $2 WHERE id = $3 RETURNING *"

	row := db.QueryRow(query, name, branch, id)

	if err := row.Scan(&stu.ID, &stu.Name, &stu.Branch); err != nil {
		http.Error(res, "Something went wrong: "+err.Error(), http.StatusInternalServerError)
		return
	}

	json, err := json.Marshal(stu)

	if err != nil {
		http.Error(res, "Something went wrong: "+err.Error(), http.StatusInternalServerError)
		return
	}

	res.Write(json)
}

func deleteStudent (res http.ResponseWriter, req *http.Request) {
	var stu Student
	id := mux.Vars(req)["id"]

	if id == "" {
		http.Error(res, "Insufficient information.", http.StatusBadRequest)
		return
	}

	query := "DELETE FROM students where id = $1 RETURNING *"

	row := db.QueryRow(query, id)

	if err := row.Scan(&stu.ID, &stu.Name, &stu.Branch); err != nil {
		http.Error(res, "Requested resource could not be found.", http.StatusNotFound)
		return
	}

	json, err := json.Marshal(stu)

	if err != nil {
		http.Error(res, "Something went wrong: "+err.Error(), http.StatusInternalServerError)
		return
	}

	res.Write(json)
}