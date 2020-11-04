package routes

import (
	"github.com/labstack/echo"
	"github.com/rc9-cindex/dev/cindex-users/controllers"
)

func InitRoutes(controller *controllers.UserController, e *echo.Echo) {
	e.POST("/users", controller.CreateUser)
	e.GET("/users/:id", controller.FetchUserById)
	e.GET("/users", controller.FetchUsers)
	e.PUT("/users:id", controller.UpdateUser)
	e.DELETE("/users:id", controller.DeleteUser)
}
