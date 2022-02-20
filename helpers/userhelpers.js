const jwt = require("jsonwebtoken");

// error handling function

module.exports.handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.code === 11000) {
    errors.email = "Email already exist please Login";
  }

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach((prop) => {
      if (prop.path === "email") {
        errors.email = prop.message;
      }

      if (prop.path === "password") {
        errors.password = prop.message;
      }
    });
  }
  return errors;
  // console.log('-----',errors)
};

// function for jwt token generation

// module.exports.generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_KEY, {
//     expiresIn: 3 * 24 * 60 * 60 * 1000,
//   });
// };
 module.exports.generateToken =(id)=> {
   return jwt.sign({id}, process.env.privateKey,{
      expiresIn: 3*24*60*60*1000
   })
 }
