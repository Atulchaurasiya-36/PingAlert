import express from "express"
import {signup,login,logout} from "../controller/userAuth.controller.js"
const router=express.Router()
console.log(router)
router.post("/signup",signup)
router.post("/login",login)
router.get("/logout",logout)

export default router