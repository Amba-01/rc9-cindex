package database

import (
	"errors"
	"fmt"
	"github.com/rc9-cindex/dev/cindex-users/models"
	"github.com/rc9-cindex/dev/cindex-users/utils"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
)

var db *gorm.DB

type DAO struct {
	DB *gorm.DB
}

func NewDAO() *DAO {
	var dbConfig = utils.GetConfigManager().Get().Database
	dbUri:= fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		dbConfig.Username,
		dbConfig.Password,
		dbConfig.Host,
		dbConfig.Port,
		dbConfig.Name)

	println("dbUri:", dbUri)
	db, err := gorm.Open(mysql.Open(dbUri), &gorm.Config{})

	if err != nil {
		log.Fatalln(err)
	}

	db.AutoMigrate(&models.User{})

	return &DAO{DB: db}
}

func (dao *DAO) GetDBConnection() (*gorm.DB, error) {
	if dao.DB != nil {
		return dao.DB, nil
	}
	return nil, errors.New("could not get Database connection")
}