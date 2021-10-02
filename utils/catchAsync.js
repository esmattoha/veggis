/**
 * @param {*} fu 
 * @returns 
 */
const catchAsync = (fu) => {
  return (req, res, next) => {
    fu(req, res, next).catch(next);
  };
};

// export
module.exports = { catchAsync };