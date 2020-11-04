package services

import (
	"github.com/rc9-cindex/dev/cindex-users/models"
	"github.com/rc9-cindex/dev/cindex-users/repositories"
	"github.com/stroiman/go-automapper"
	"log"
)

type IUserService interface {
	CreateUser(unit *models.UserDTO) *models.UserDTO
	FetchUserById(unitId string) *models.UserDTO
	UpdateUser(unitId string, unit *models.UserDTO) *models.UserDTO
	FetchUsers() [] models.UserDTO
	DeleteUser(unitId string) (err error)
}
type UserService struct {
	UserRepository repositories.IUserRepository
}

func NewUserService(repository *repositories.IUserRepository) IUserService {
	return &UserService{ UserRepository: *repository}
}

func (b *UserService) CreateUser(unitDTO *models.UserDTO) *models.UserDTO {
	unit := new(models.User)
	automapper.MapLoose(unitDTO, &unit)
	User, err := b.UserRepository.SaveUser(*unit)
	if err != nil{
		panic("Error creating User")
	}
	UserDTO := new(models.UserDTO)

	automapper.Map(User, &UserDTO)
	return UserDTO
}

func (b *UserService) FetchUserById(unitId string) *models.UserDTO {
	User, err := b.UserRepository.GetUserById(unitId)
	if err != nil {
		log.Println("User with id", unitId, "not found")
	}
	UserDTO := new(models.UserDTO)
	automapper.Map(User, &UserDTO)
	return UserDTO
}

func (b *UserService) UpdateUser(unitId string, unitDTO *models.UserDTO) *models.UserDTO {
	unit := new(models.User)
	automapper.MapLoose(unitDTO, &unit)
	User, err := b.UserRepository.UpdateUser(unitId, unit)
	if err != nil{
		panic("Error updating User")
	}
	UserDTO := new(models.UserDTO)
	automapper.Map(User, &UserDTO)
	return UserDTO
}

func (b *UserService) FetchUsers() [] models.UserDTO {
	Users, err := b.UserRepository.GetUsers()
	if err != nil{
		panic("Error fetching User")
	}
	var UserDTOs []models.UserDTO
	automapper.Map(Users, &UserDTOs)
	return UserDTOs
}

func (b *UserService) DeleteUser(unitId string) (err error) {
	err = b.UserRepository.DeleteUser(unitId)
	if err != nil{
		return err
	}
	return nil
}
