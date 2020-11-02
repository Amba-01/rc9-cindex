package models

import "github.com/jinzhu/gorm"

type UserDTO struct {
	ID  string `json:"id"`
	UserID  string `json:"userId"`
	Username  string `json:"username"`
	Email string `json:"email"`
	Password  string `json:"password"`
	CountryKey  string `json:"countryKey"`
}

type User struct {
	gorm.Model
	UserDTO
}
