package controllers

import (
	"fmt"
	"github.com/labstack/echo"
	"github.com/rc9-cindex/dev/cindex-users/models"
	"github.com/rc9-cindex/dev/cindex-users/services"
	"github.com/rc9-cindex/dev/cindex-users/utils"
	"net/http"
)

type UserController struct {
	UserService services.IUserService
}

func NewUserController(b services.IUserService) *UserController {
	return &UserController{b}
}

func (b *UserController) CreateUser(c echo.Context) (err error) {
	e := echo.New()

	UserDTO := utils.RetrieveRequestObject(c)
	unit := b.UserService.CreateUser(UserDTO)
	e.Logger.Print("Created User:", unit)
	return c.JSON(http.StatusCreated, unit)
}

func (b *UserController) FetchUserById(c echo.Context) (err error) {
	unitId := c.Param("id")
	//UserId, _ := strconv.ParseUint(unitId, 10, 64)
	UserDTO := b.UserService.FetchUserById(unitId)
	return c.JSON(http.StatusOK, UserDTO)
}

func (b *UserController) FetchUsers(c echo.Context) (err error) {
	fmt.Println("New Server Port:", utils.GetConfigManager().Get().Server.Host)
	return c.JSON(http.StatusOK, b.UserService.FetchUsers())
}

func (b *UserController) UpdateUser(c echo.Context) (err error) {
	UserDTO := new(models.UserDTO)
	if err := c.Bind(UserDTO); err != nil {
		return err
	}

	unitId := c.Param("id")
	if err != nil {
		echo.NewHTTPError(http.StatusBadRequest, "User Id must be int")
		return
	}
	return c.JSON(http.StatusOK, b.UserService.UpdateUser(unitId, UserDTO))
}

func (b *UserController) DeleteUser(c echo.Context) error {
	unitId := c.Param("id")
	if unitId == "" {
		echo.NewHTTPError(http.StatusBadRequest, "User Id must be int")
	}
	return c.JSON(http.StatusOK, b.UserService.DeleteUser(unitId))
}
