import express from "express"
import auth from "../middleware/auth.middleware.js"
import { addEvent, getMyEvents, getSingleEvent,updateEvent,deleteEvent ,getUpcomingEvents,getEventLogs} from "../controller/userEvent.controller.js"
import { eventValidationSchema } from "../validation/eventValidation.js";



 const router=express.Router()
 //post validater
 router.use("/create",eventValidationSchema )
 router.use(auth)
 router.post("/create",addEvent)

//  get events

 router.get("/mine",auth,getMyEvents)
 router.get("/getSingleEvent/:id",auth,getSingleEvent)

//  update Events

 router.use("/updateEvent",eventValidationSchema)
 router.use("/updateEvent",auth)
 router.put("/updateEvent/:id",updateEvent)

//  delete events
 router.use("/deleteEvent",auth)
 router.delete("/deleteEvent/:id",deleteEvent)

//  for upcoming request
router.get("/upcomingEvents",auth,getUpcomingEvents)

// logs for all events

router.get("/getEventLogs",auth,getEventLogs)




 export default router

