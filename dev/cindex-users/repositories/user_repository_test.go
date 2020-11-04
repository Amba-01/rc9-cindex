package repositories

import (
	"github.com/rc9-cindex/dev/cindex-users/database"
	"github.com/rc9-cindex/dev/cindex-users/models"
	"github.com/rc9-cindex/dev/cindex-users/utils"
	"github.com/stroiman/go-automapper"
	"testing"
)

func TestSaveUser(t *testing.T){

	UserDTO := 	utils.NewUserDTO()

	unit := new(models.User)
	automapper.MapLoose(UserDTO, &unit)

	dao := database.NewDAO()

	UserRepository := NewUserRepository(dao)
	_, err := UserRepository.SaveUser(*unit)

	if err != nil {
		t.Errorf("this is the error from creating User%v\n", err)
	}

	//assert.NotNil(t, savedUser.ID)
	//assert.Equal(t, UserDTO.Name, savedUser.Name)
	//assert.Equal(t, UserDTO.Email, savedUser.Email)

}

