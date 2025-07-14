import joi from "joi"

export const eventValidationSchema=(req,res,next)=>{
   const { error }=joi.object({
  title:joi.string().min(3).trim().required().messages({
    "title empty":"title should not be empty"
  }),
  description:joi.string().allow(" ",null).max(200).trim().required().messages({
    "description empty":"description should not be empty"
  }),
  
 reminderTime: joi.date()
      .required()
      .custom((value, helpers) => {
        const now = new Date();
        const fiveMinutesLater = new Date(now.getTime() + 5 * 60000);

        if (value < fiveMinutesLater) {
          return helpers.message("Reminder time must be at least 5 minutes ahead of current time");
        }

        return value;
      })
      .messages({
        "any.required": "Reminder time is required",
        "date.base": "Reminder time must be a valid date"
      }),
    sendEmail: joi.boolean()
    .required()
    .messages({
      "any.required": "sendEmail flag is required"
    }),
    sendSMS: joi.boolean()
    .required()
    .messages({
      "any.required": "sendSMS flag is required"
    }),
    reminderSent: joi.boolean()
    .optional()

}).validate(req.body)
if (error) {
      return res.status(400).json({
        success: false,
        svcCode:"Ev01",
        message: error.details[0].message || "All fields are required for storing event"
      });
    }
next();

}