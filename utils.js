const bcrypt = require('bcrypt');


exports.hashPassword = password => bcrypt.hashSync(password, 10);
exports.compareHashedPassword = (password, hash) => bcrypt.compareSync(password, hash);

const uniqueMessage = error => {
  let output;
  try {
    let fieldName = error.message.substring(
      error.message.lastIndexOf(".$") + 2,
      error.message.lastIndexOf("_1")
    );
    output =
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1) +
      " already exists";
  } catch (ex) {
    output = "Unique field already exists";
  }

  return output;
};


exports.errorHandler = error => {
  let message = "";

  if (error.code) {
    switch (error.code) {
      case 11000:
      case 11001:
        message = uniqueMessage(error);
        break;
      default:
        message = "Something went wrong";
    }
  } else {
    for (let errorName in error.errorors) {
      if (error.errorors[errorName].message)
        message = error.errorors[errorName].message;
    }
  }

  return message;
};

// sign up validator

exports.signUpValidation = (req, res, next) => {
  req.check('name', 'Name is required').notEmpty();
  req.check('email', 'Email should between 3 to 32 chars')
    .matches(/^w+[+.w-]*@([w-]+.)*w+[w-]*.([a-z]{2,4}|d+)$/i)
    .isLength({
      min: 4, max: 32
    });
  req.check('password', 'Password is required').notEmpty();
  req.check('password')
    .isLength({
      min: 6
    })
    .withMessage('Must be greater than 5')
    .matches(/\d/)
    .withMessage('Must contain atleast 1 numeric')

  const errors = req.validationResult()
  if (errors) {
    const firstError = errors.map((err) => err.msg)[0];
    return res.status(400).json({
      error: firstError
    });
  }
  next();
}
