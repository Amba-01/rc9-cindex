package repositories

import (
	"github.com/rc9-cindex/dev/cindex-users/database"
	"github.com/rc9-cindex/dev/cindex-users/models"
)

type IUserRepository interface {
	SaveUser(User models.User) (unit *models.User, err error)
	GetUserById(unitId string) (unit *models.User, err error)
	UpdateUser(unitId string, UserDTO *models.User) (unit models.User, err error)
	GetUsers() (units []*models.User, err error)
	DeleteUser(UserId string) (err error)
}
type UserRepository struct {
	DAO *database.DAO
}

func NewUserRepository(dao *database.DAO) IUserRepository {
	return &UserRepository{ DAO: dao}
}
func (b *UserRepository) SaveUser(User models.User) (unit *models.User, err error) {
	db, err := b.DAO.GetDBConnection()
	err = db.Create(&User).Error
	if err != nil {
		return nil, err
	}
	return &User, nil
}
func (b *UserRepository) GetUserById(unitId string) (unit *models.User, err error) {
	var User models.User

	db, err := b.DAO.GetDBConnection()
	err = db.Where("User_id = ?", unitId).Find(&User).Error
	if err != nil {
		return nil, err
	}
	return &User, nil
}

func (b *UserRepository) UpdateUser(unitId string, UserDTO *models.User) (unit models.User, err error) {
	var User models.User
	db, err := b.DAO.GetDBConnection()
	err = db.Where("User_id = ?", unitId).Find(&User).Error
	if err != nil {
		return models.User{}, err
	}
	err = db.Model(&User).Update(UserDTO).Error
	if err != nil {
		return models.User{}, err
	}
	return User, nil
}

func (b *UserRepository) GetUsers() (units []*models.User, err error) {
	db, err := b.DAO.GetDBConnection()
	var Users []*models.User
	if err := db.Find(&Users).Error; err != nil {
		return nil, err
	}
	return Users, nil
}

func (b *UserRepository) DeleteUser(UserId string) (err error) {
	var User models.User
	db, err := b.DAO.GetDBConnection()
	err = db.Where("User_id = ?", UserId).Find(&User).Error
	if err != nil {
		return err
	}

	err = db.Delete(User).Error
	if err != nil {
		return err
	}
	return nil
}
