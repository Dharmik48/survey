package types

type Status string

const (
	Error   Status = "error"
	Success Status = "success"
)

type Response struct {
	Status  Status      `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}