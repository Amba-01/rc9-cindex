package utils

type Config struct {
	Server server
	Database database
	MessageQueue messageQueue
}

type server struct {
	Host string
	Port string
}

type database struct {
	Host string
	Port string
	Username string
	Password string
	Name string
}

type messageQueue struct {
	Address string
	Brokers string
	Port string
	Topic string
	Verbose bool
	ConsumerGroup string
	ClientId string
}