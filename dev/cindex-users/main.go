package main

import (

	"fmt"
	"github.com/BurntSushi/toml"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	log2 "github.com/labstack/gommon/log"
	"github.com/rc9-cindex/dev/cindex-users/controllers"
	"github.com/rc9-cindex/dev/cindex-users/database"
	"github.com/rc9-cindex/dev/cindex-users/repositories"
	"github.com/rc9-cindex/dev/cindex-users/routes"
	"github.com/rc9-cindex/dev/cindex-users/services"
	"github.com/rc9-cindex/dev/cindex-users/utils"
	"log"
	"time"
)

func main()  {
	// ---------------- START ----------------
	confManager := utils.NewMutexConfigManager(loadConfig(APPLICATION_CONFIG))
	// Watch the file for modification and update the config manager with the new config when it's available
	watcher, err := utils.WatchFile(APPLICATION_CONFIG, time.Second, func() {
		fmt.Printf("Configfile Updated\n")
		conf := loadConfig(APPLICATION_CONFIG)
		fmt.Println("New Server Address:", conf.Server.Host)
		confManager.Set(conf)
	})
	check(err)

	// Clean up
	defer func() {
		watcher.Close()
		confManager.Close()
	}()


	e := echo.New()
	e.Use(middleware.CORS())
	// ---------------- eEND ----------------
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	dao := database.NewDAO()

	// ROUTES
	userRepository := repositories.NewUserRepository(dao)
	userService := services.NewUserService(&userRepository)
	userController := controllers.NewUserController(userService)
	routes.InitRoutes(userController, e)

	e.Logger.SetLevel(log2.INFO)
	fmt.Println("Database Port:", confManager.Get().Database.Port)
	e.Logger.Fatal(e.Start(":"+confManager.Get().Server.Port))
}


// ---------------- START ----------------
//const APPLICATION_CONFIG = "/etc/config/application.toml"
const APPLICATION_CONFIG = "/Users/admin01/go/src/github.com/rc9-cindex/dev/cindex-users/config/application.toml"
const BIND = "0.0.0.0:8080"

func check(err error) {
	if err != nil {
		log.Fatalf("error: %v", err)
	}
}

/*
   Simple Yaml Config file loader
*/
func loadConfig(configFile string) *utils.Config {
	conf := &utils.Config{}
	if _, err := toml.DecodeFile(configFile, &conf); err != nil {
		fmt.Println(err)
	}
	return conf
}