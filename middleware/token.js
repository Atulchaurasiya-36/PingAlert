import jwt from "jsonwebtoken"
export const generateTokenAndSaveInCookies=async(userId,res)=>{
  const token=jwt.sign({userId},process.env.jwt_secret,{
    expiresIn:"10d"
  })
  res.cookie("jwt",token,{
    httpOnly:true,
    secure:false,
    sameSite:"lax",
    path:"/"
  })
 return token;
}