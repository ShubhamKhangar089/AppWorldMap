const { Users } = require("../models/userModel");

const authenticateUser = async (req, res, next) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] == "Bearer"
    ) {
      const accessToken = req.headers.authorization.split(" ")[1];
  
      try {
        var decodedData = jwt.verify(
          accessToken,
          process.env.KEY
        );
  
        if (decodedData) {
          const { userId } = decodedData;
  
          const user = await Users.findById(userId);
  
          if (user) {
            req.userId = userId;
            req.email = user.email;
            req.name = user.name;
            next();
          } else {
            return res.status(400).json({
              error: true,
              message: "Invalid Access Token. User does not exist",
            });
          }
        } else {
          return res
            .status(400)
            .json({ error: true, message: "Invalid Access Token" });
        }
      } catch (err) {
        res.status(401).json({ error: true, message: err.message });
      }
    } else {
      return res
        .status(400)
        .json({ error: true, message: "Access Token Required. Please Login..." });
    }
  };
  
  module.exports = {authenticateUser};
  