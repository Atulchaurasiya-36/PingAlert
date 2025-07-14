
import Event from "../models/event.model.js";



export const addEvent = async (req, res) => {
  try {
    const { title, description, reminderTime, sendEmail, sendSMS, reminderSent } = req.body;
    const newEvent = await Event.create({
      user: req.user.id,  
      title,
      description,
      reminderTime,
      sendEmail,
      sendSMS,
      reminderSent
    });
    return res.status(201).json({
      success: true,
      message: "Event added successfully",
      event: newEvent
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while adding event in database",
      error: err.message
    });
  }
};

export const getMyEvents=async(req,res)=>{
  try{
    const userId=req.user.id
    const events=await Event.find({user:userId})
    return res.status(200).json({
      success:true,
      message:"you got all your events successfully",
      events
    })

  }catch(err){
    console.log(err)
    res.status(400).json({
      success:false,
      message:"getting error while fetching my events"
    })
  }
}

export const getSingleEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.id;

    const event = await Event.findOne({ _id: eventId, user: userId });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found or unauthorized access"
      });
    }

    res.status(200).json({
      success: true,
      message: "Fetched single event successfully",
      event
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error while fetching the single event",
      error: err.message
    });
  }

}

export const updateEvent=async(req,res)=>{
try{
  const eventId=req.params.id
  const userId=req.user.id
  const existingEvent=await Event.findOne({_id:eventId,user:userId})
   if(!existingEvent){
    return res.status(400).json({
      success:false,
      message:"event does not exist"
    })
   }

    const { title, description, reminderTime, sendEmail, sendSMS, reminderSent } = req.body;
    existingEvent.title=title;
    existingEvent.description=description;
    existingEvent.reminderSent=reminderSent
    existingEvent.reminderTime=reminderTime
    existingEvent.sendEmail=sendEmail
    existingEvent.sendSMS=sendSMS
    await existingEvent.save()

    return res.status(200).json({
      success:true,
      message:"event has updated succesfully",
      existingEvent
    })
}catch(err){
   console.log(err)
   res.status(400).json({
    success:false,
    message:"something went wrong while updating the event"
   })


}

}


export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.id;
    const existingEvent = await Event.findOne({ _id: eventId, user: userId });

    if (!existingEvent) {
      return res.status(404).json({
        success: false,
        message: "Event does not exist or you are not authorized"
      });
    }
    const result = await Event.findByIdAndDelete(eventId);

    return res.status(200).json({
      success: true,
      message: "Event has been deleted successfully",
      deletedEvent: result
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong while deleting the event",
      error: err.message
    });
  }
};












