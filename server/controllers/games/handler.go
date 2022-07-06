package games

import (
	"github.com/gofiber/fiber/v2"
	"server/models"
)

func (h handler) GetGames(c *fiber.Ctx) error {
	var games []models.Game

	if result := h.DB.Find(&games); result.Error != nil {
		return fiber.NewError(fiber.StatusNotFound, result.Error.Error())
	}

	return c.Status(fiber.StatusOK).JSON(&games)
}

func (h handler) GetGame(c *fiber.Ctx) error {
	id := c.Params("id")

	var game models.Game
	if result := h.DB.Find(&game, id); result.Error != nil {
		return fiber.NewError(fiber.StatusNotFound, result.Error.Error())
	}

	return c.Status(fiber.StatusOK).JSON(&game)
}

type AddGameRequestBody struct {
	Title string `json:"title"`
}

func (h handler) AddGame(c *fiber.Ctx) error {
	body := AddGameRequestBody{}

	// parse body into RequestBody struct
	if err := c.BodyParser(&body); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	var game models.Game
	game.Title = body.Title

	// insert new db entry
	if result := h.DB.Create(&game); result.Error != nil {
		return fiber.NewError(fiber.StatusNotFound, result.Error.Error())
	}

	return c.Status(fiber.StatusCreated).JSON(&game)
}

type UpdateGameRequestBody struct {
	Id    int    `json:"id"`
	Title string `json:"title"`
}

func (h handler) UpdateGame(c *fiber.Ctx) error {
	id := c.Params("id")
	body := UpdateGameRequestBody{}

	if err := c.BodyParser(&body); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	var game models.Game
	if result := h.DB.First(&game, id); result.Error != nil {
		return fiber.NewError(fiber.StatusNotFound, result.Error.Error())
	}

	game.Title = body.Title

	h.DB.Save(&game)
	return c.Status(fiber.StatusOK).JSON(&game)
}

func (h handler) DeleteGame(c *fiber.Ctx) error {
	id := c.Params("id")

	var game models.Game
	if result := h.DB.First(&game, id); result.Error != nil {
		return fiber.NewError(fiber.StatusNotFound, result.Error.Error())
	}

	h.DB.Delete(&game)
	return c.SendStatus(fiber.StatusOK)
}

type DeleteGamesRequestBody struct {
	Ids []int `json:"ids"`
}

func (h handler) DeleteGames(c *fiber.Ctx) error {
	body := DeleteGamesRequestBody{}

	if err := c.BodyParser(&body); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	ids := body.Ids
	var games []models.Game
	if result := h.DB.Where("id IN ?", ids).Find(&games); result.Error != nil || len(games) == 0 {
		return fiber.NewError(fiber.StatusNotFound, result.Error.Error())
	}

	h.DB.Delete(&games)

	return c.Status(fiber.StatusOK).JSON(ids)
}
