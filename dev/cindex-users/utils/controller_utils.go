package utils

import (
	"encoding/json"
	"github.com/inventory-mgt/models"
	"github.com/labstack/echo"
	"io/ioutil"
	"log"
)

func RetrieveRequestObject(c echo.Context) *models.ProductDTO{

	body, err := ioutil.ReadAll(c.Request().Body)
	if err != nil {
		log.Fatalln("Error retrieving request body")
	}
	bodyString := string(body)
	println(bodyString)
	productDTO := new(models.ProductDTO)
	json.Unmarshal([]byte(bodyString), &productDTO)

	return productDTO
}
