const express = require("express")
const Route = express.Router()

const { addUser, getUserData, updateUserData, deleteUserData, getUserByGender} = require("../controllers/userController")

Route.post("/addUser", addUser)
Route.get("/UserData", getUserData)
Route.put("/updateUser/:id", updateUserData)
Route.delete("/deleteUser/:id", deleteUserData)
Route.get("/getUserData", getUserByGender)

module.exports = Route