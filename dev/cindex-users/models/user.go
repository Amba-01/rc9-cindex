package models

import "github.com/jinzhu/gorm"

type UserDTO struct {
	ID  uint 	`json:"id,string,omitempty"`
	Gender  string `json:"gender"`
	Firstname  string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Username  string `json:"username"`
	Email string `json:"email"`
	SeqNo int64 `json:"seqNo" gorm:"auto_increment;not_null"`
	Password  string `json:"password"`
	Country  string `json:"country"`
}

type User struct {
	gorm.Model
	UserDTO
}

type Tabler interface {
	TableName() string
}

func (User) TableName() string {
	return "User"
}
