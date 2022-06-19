package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"log"
	"server/config"
	"server/controllers/games"
)

func main() {
	c, err := config.LoadConfig()

	if err != nil {
		log.Fatalln("Failed at config", err)
	}

	// initialize application and database
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET, POST, PUT, DELETE",
	}))
	db := config.InitDB(c.DBUrl)

	// register endpoints
	api := app.Group("/api")
	games.GameRoutes(api, db)

	// start listening requests
	app.Listen(c.Port)
}
