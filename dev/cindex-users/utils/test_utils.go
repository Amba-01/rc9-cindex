package utils

import (
	"github.com/google/uuid"
	"github.com/inventory-mgt/models"
)

func NewUserDTO() *models.ProductDTO {
	return &models.ProductDTO{
		Name:           "Terrifying - " + uuid.New().String(),
		Price:          670.0,
	}
}