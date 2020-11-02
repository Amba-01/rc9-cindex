package database

import (
	"errors"
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/rc9-cindex/dev/cindex-users/models"
	"github.com/rc9-cindex/dev/cindex-users/utils"
	"log"
	"net/url"
)

var db *gorm.DB

type DAO struct {
	DB *gorm.DB
}

func NewDAO() *DAO {
	var dbConfig = utils.GetConfigManager().Get().Database
	dbUri := url.URL{
		User:     url.UserPassword(dbConfig.Username, dbConfig.Password),
		Scheme:   "postgres",
		Host:     fmt.Sprintf("%s:%s", dbConfig.Host, dbConfig.Port),
		Path:     dbConfig.Name,
		RawQuery: (&url.Values{"sslmode": []string{"disable"}}).Encode(),
	}
	db, err := gorm.Open("postgres", dbUri.String())

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