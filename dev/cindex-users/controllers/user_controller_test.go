package controllers

import (
	"bytes"
	"encoding/json"
	"github.com/labstack/echo"
	"github.com/rc9-cindex/dev/cindex-users/database"
	"github.com/rc9-cindex/dev/cindex-users/repositories"
	"github.com/rc9-cindex/dev/cindex-users/services"
	"github.com/rc9-cindex/dev/cindex-users/utils"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestCreateNewUser(t *testing.T) {
	e := echo.New()

	dao := database.NewDAO()

	// ROUTES
	userRepository := repositories.NewUserRepository(dao)
	userService := services.NewUserService(&userRepository)

	b := utils.NewUserDTO()
	requestByte, _ := json.Marshal(b)
	requestReader := bytes.NewReader(requestByte)

	req := httptest.NewRequest(echo.POST, "/", requestReader)
	req.Header.Set("Content-Type", "application/json")

	rec := httptest.NewRecorder()

	c := e.NewContext(req, rec)
	c.SetPath("/users")

	h := NewUserController(userService)

	if assert.NoError(t, h.CreateUser(c)) {
		assert.Equal(t, http.StatusCreated, rec.Code)
	}
}
