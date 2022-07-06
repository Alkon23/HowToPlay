package games

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type handler struct {
	DB *gorm.DB
}

func GameRoutes(api fiber.Router, db *gorm.DB) {
	h := &handler{DB: db}

	routes := api.Group("/games")
	routes.Post("/", h.AddGame)
	routes.Get("/", h.GetGames)
	routes.Get("/:id", h.GetGame)
	routes.Put("/:id", h.UpdateGame)
	routes.Delete("/", h.DeleteGames)
	routes.Delete("/:id", h.DeleteGame)
}
