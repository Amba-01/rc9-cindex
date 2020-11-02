package utils

type Config struct {
	Server server
	Database database
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