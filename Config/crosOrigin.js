const allowedOrigin = require("./allowedOrigin");

const crosOrigin = {
  origin: (origin, callback) => {
    if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
      //null is for 'no error' and true is use as a boolean
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CROS"));
    }
  },
  credentials: true,
  optionSuccessStatus: 200,
};

module.exports = crosOrigin;
