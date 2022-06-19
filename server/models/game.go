package models

type Game struct {
	Id    int    `json:"id" gorm:"primaryKey"`
	Title string `json:"title"`
}
