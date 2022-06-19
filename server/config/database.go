package config

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
	"server/models"
)

func InitDB(url string) *gorm.DB {
	db, err := gorm.Open(mysql.Open(url), &gorm.Config{})

	if err != nil {
		log.Fatalln(err)
	}

	db.AutoMigrate(&models.Game{})

	return db
}
