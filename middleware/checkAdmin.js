// Import Internal Modules
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");


/**
 * 
 */
const checkAdmin = catchAsync(async (req, res, next) => {
  const user = req.user;

  if (user.type !== "admin") {
    return next(new AppError("UnAuthenticated", 401));
  }

  next();
});


// export 
module.exports = { checkAdmin } ;