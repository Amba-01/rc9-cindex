package repositories

import (
	"context"
	"github.com/rc9-cindex/dev/cindex-users/database"
	"github.com/rc9-cindex/dev/cindex-users/models"
	"github.com/rc9-cindex/dev/cindex-users/utils"
	"github.com/segmentio/kafka-go"
	"github.com/stroiman/go-automapper"
	"testing"
)

func TestSaveUser(t *testing.T){

	userDTO := 	utils.NewUserDTO()

	unit := new(models.User)
	automapper.MapLoose(userDTO, &unit)

	dao := database.NewDAO()

	userRepository := NewUserRepository(dao)
	_, err := userRepository.SaveUser(*unit)

	if err != nil {
		t.Errorf("this is the error from creating user%v\n", err)
	}

	//assert.NotNil(t, savedUser.ID)
	//assert.Equal(t, userDTO.Name, savedUser.Name)
	//assert.Equal(t, userDTO.Email, savedUser.Email)
}

func TestSendMessage(t *testing.T){
	w := kafka.NewWriter(kafka.WriterConfig{
		Brokers: []string{"localhost:9092"},
		Topic:   "invent360",
		Balancer: &kafka.LeastBytes{},
	})

	w.WriteMessages(context.Background(),
		kafka.Message{
			Key:   []byte("Key-A"),
			Value: []byte("Hello World!"),
		},
		kafka.Message{
			Key:   []byte("Key-B"),
			Value: []byte("One!"),
		},
		kafka.Message{
			Key:   []byte("Key-C"),
			Value: []byte("Two!"),
		},
	)

	w.Close()
}

