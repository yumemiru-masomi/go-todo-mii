package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Todo モデル（テーブルの構造になる）
type Todo struct {
	ID        uint   `gorm:"primaryKey" json:"id"`//ここの`gorm:"primaryKey" json:"id"`が
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
}

var db *gorm.DB

func initDB() {
	var err error
	db, err = gorm.Open(sqlite.Open("todo.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// テーブルがなければ自動で作成
	db.AutoMigrate(&Todo{})
}

func createTodo(c *gin.Context) {
	var todo Todo
	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.Create(&todo)
	c.JSON(http.StatusCreated, todo)
}

func getTodos(c *gin.Context) {
	var todos []Todo
	db.Find(&todos)
	c.JSON(http.StatusOK, todos)
}

func main() {
	r := gin.Default()
	initDB()

	// 新規追加
	r.POST("/todos", createTodo)

	// 一覧取得
	r.GET("/todos", getTodos)

	// サーバー起動
	r.Run(":8090")
}
