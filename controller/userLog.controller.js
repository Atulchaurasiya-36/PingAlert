import Event from "../models/event.model.js";
export const getUpcomingEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();  

    const events = await Event.find({
      user: userId,
      reminderTime: { $gt: now }  
    }).sort({ reminderTime: 1 });

    return res.status(200).json({
      success: true,
      message: "All upcoming events have fetched successfully",
      events
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Error while fetching upcoming events"
    });
  }
};



export const getEventLogs=async(req,res)=>{
  try{
    const userId=req.user.id
    const sentEvents=await Event.find({
      user:userId,
      reminderSent:true
    })

    const pendingEvent=await Event.find({
      user:userId,
      reminderSent:false
    })

    res.status(200).json({
      success:true,
      message:"All pending and sent events have fetched successfully",
      events:{
        sentEvents,
        pendingEvent
      }
    })
  }catch(err){
    console.log(err)
    res.status(400).json({
      success:false,
      message:"something went wrong while fetching the log events"
    })
  }
}

















