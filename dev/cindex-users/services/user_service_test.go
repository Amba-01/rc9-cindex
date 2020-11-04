package services

import (
	"github.com/rc9-cindex/dev/cindex-users/database"
	"github.com/rc9-cindex/dev/cindex-users/repositories"
	"github.com/rc9-cindex/dev/cindex-users/utils"
	"github.com/stretchr/testify/assert"
	"log"
	"os"
	"testing"
)

var serviceUndertest IUserService

func TestMain(m *testing.M) {
	log.Println("#####----Before Test: Initialising Test Resources----#####")

	dao := database.NewDAO()
	UserRepository := repositories.NewUserRepository(dao)
	serviceUndertest = NewUserService(&UserRepository)

	exitVal := m.Run()
	log.Println("#####----After Test: Tearing down Test Resources----#####")
	os.Exit(exitVal)
}

func TestCreateUser(t *testing.T) {

	UserDTO := utils.NewUserDTO()
	savedUserDTO := serviceUndertest.CreateUser(UserDTO)

	assert.Equal(t, UserDTO.Username, savedUserDTO.Username)
	assert.Equal(t, UserDTO.Email, savedUserDTO.Email)
}

func TestFetchUserById(t *testing.T) {

	UserDTO := utils.NewUserDTO()
	serviceUndertest.CreateUser(UserDTO)

	savedUserDTO := serviceUndertest.FetchUserById(UserDTO.UserID)

	assert.NotNil(t, savedUserDTO.UserID)
	assert.Equal(t, UserDTO.UserID, savedUserDTO.UserID)
}

func TestUpdateUser(t *testing.T) {

	UserDTO := utils.NewUserDTO()
	savedUserDTO := serviceUndertest.CreateUser(UserDTO)
	newEmail := "changed@email.com"
	Username := "Jake Wood"

	savedUserDTO.Username = Username
	savedUserDTO.Email = newEmail

	updatedUserDTO := serviceUndertest.UpdateUser(savedUserDTO.UserID, savedUserDTO)
	assert.NotNil(t, updatedUserDTO.UserID)
	assert.Equal(t, updatedUserDTO.UserID, savedUserDTO.UserID)
}

func TestGetUsers(t *testing.T) {

	firstUserDTO := utils.NewUserDTO()
	secondUserDTO := utils.NewUserDTO()

	serviceUndertest.CreateUser(firstUserDTO)
	serviceUndertest.CreateUser(secondUserDTO)

	Users := serviceUndertest.FetchUsers()
	assert.GreaterOrEqual(t, len(Users), 2)
}

func TestDeleteUser(t *testing.T) {

	UserDTO := utils.NewUserDTO()
	savedUserDTO := serviceUndertest.CreateUser(UserDTO)

	serviceUndertest.DeleteUser(savedUserDTO.UserID)

	nilUserDTO := serviceUndertest.FetchUserById(UserDTO.UserID)

	assert.Empty(t, nilUserDTO.UserID)
}