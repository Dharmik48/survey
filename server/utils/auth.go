package utils

import "golang.org/x/crypto/bcrypt"

func Hash(password *string) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(*password), bcrypt.DefaultCost)

	*password = string(hash)

	return err
}