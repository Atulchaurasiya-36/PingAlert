import express from "express"
import auth from "../middleware/auth.middleware.js"
import { getUpcomingEvents,getEventLogs} from "../controller/userEvent.controller.js"

 const router=express.Router()

//  for upcoming request
router.get("/upcomingEvents",auth,getUpcomingEvents)

// logs for all events

router.get("/getEventLogs",auth,getEventLogs)

 export default router

