package utils

import (
	"encoding/json"
	"github.com/labstack/echo"
	"github.com/rc9-cindex/dev/cindex-users/models"
	"io/ioutil"
	"log"
)

func RetrieveRequestObject(c echo.Context) *models.UserDTO{

	body, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		log.Fatalln("Error retrieving request body")
	}
	bodyString := string(body)
	println(bodyString)
	userDTO := new(models.UserDTO)
	json.Unmarshal([]byte(bodyString), &userDTO)

	return userDTO
}
