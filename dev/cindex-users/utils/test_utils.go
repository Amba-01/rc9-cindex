package utils

import (
	"github.com/google/uuid"
	"github.com/rc9-cindex/dev/cindex-users/models"
)

func NewUserDTO() *models.UserDTO {
	return &models.UserDTO{
		Username:           "Terrifying - " + uuid.New().String(),
		Email:          "abay@gmail.com",
		Password: uuid.New().String(),
		Country:    "DE",
	}
}