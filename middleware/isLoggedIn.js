// Import Internal Modules
const {User} = require("../user/userModel");
const { extractToken } = require("./../utils/extractToken");
const { validateToken } = require("./../utils/validateToken");
const { catchAsync } = require("./../utils/catchAsync");
const { AppError } = require("./../utils/appError");


const isLoggedIn = catchAsync(async(req, res, next )=>{
    const token = await extractToken(req);

    if(!token){
        return next(new AppError("UnAuthorized Request" , 401));
    }

    const userId = await validateToken(token);
     
    if(!userId){
        return next(new AppError("UnAuthorized Request" , 401));
    }

    const user = await User.findById(userId);

    if(!user || user.isBlocked){
        return next(new AppError("Account not exist or account has Blocked" , 204));
    }

  req.user = user ;
  next();

});

//export 
module.exports = { isLoggedIn } ;