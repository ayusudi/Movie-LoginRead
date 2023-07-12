function errorHandler(err, req, res, next) {
  // console.log(err, "<<< ERROR HANDLER");
  let message = "Internal server error"
  let code = 500
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      message = err.errors[0].message
      code = 400
      break;
    case "ValidationError":  // Login tidak input email & password 
      message = "Please input email and passsword for login"
      code = 400
      break
    case "FailedLogin":
      message = "Login failed"
      code = 401
      break
    case "JsonWebTokenError":
    case "TokenExpiredError":
      message = "Invalid token"
      code = 401
      break
    case "Unauthorized":
    case "NoToken":
      message = "Unauthorized"
      code = 401
      break
    case "Forbidden":
      message = "Forbidden"
      code = 403
      break
    case "NotFound":
      message = "Data not found"
      code = 404
      break
  }
  res.status(code).json({ message })
}

module.exports = errorHandler