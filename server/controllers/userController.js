const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtPassword = require("../config/default.json").jwtPassword;

const User = require("../models/userModels");
const sendEmail = require("../email/sendEmail");
// const clientURL = `localhost://5000`;
const clientURL = process.env.CLIENT_URL;
// const clientURL = process.env.CLIENT_URL || 5000; //env accounts for heroku

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, passwordVerify } = req.body;

    // validation
    if (!firstName || !lastName || !email || !password || !passwordVerify) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }

    if (password.length < 6) {
      return res.status(400).json({
        errorMessage: "Please enter a password longer than 6 characters.",
      });
    }

    if (password !== passwordVerify) {
      return res.status(400).json({
        errorMessage:
          "Your password and verify password fields do not match. Please enter a matching password to proceed.",
      });
    }

    //check if there is already an account with this user info in the database?
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });
    }

    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // saving the password
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      passwordHash: passwordHash,
    });
    const savedUser = await newUser.save();

    //create token
    const token = jwt.sign({ user: savedUser._id }, jwtPassword);

    //send the token in an HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .cookie("adminToken", "", { httpOnly: true, expires: new Date(0) })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate input has been entered
    if (!email || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }

    //search if the email matches an email in the DB
    const existingUser = await User.findOne({
      email: email,
    });

    if (!existingUser) {
      return res
        .status(401)
        .json({
          errorMessage: "Wrong email entered.",
        })
        .send();
    }

    //compare passwordHash to existing user's pwhash
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect) {
      return res.status(401).json({
        errorMessage: "Wrong password entered.",
      });
    }

    //make jwt
    const token = jwt.sign({ user: existingUser._id }, jwtPassword);

    //send the token in an HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .cookie("adminToken", "", { httpOnly: true, expires: new Date(0) })
      .json({ message: "login successful" });
    //.send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const logOut = (req, res) => {
  //expire the cookie + delete the token!
  res
    .cookie("token", "", { httpOnly: true, expires: new Date(0) })
    .cookie("adminToken", "", { httpOnly: true, expires: new Date(0) })
    .send();
};

const loggedIn = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ loggedIn: false });

    const verifiedId = jwt.verify(token, jwtPassword);

    User.findById(verifiedId.user, (err, data) => {
      if (err) {
        console.log("ERROR" + err);
        res.status(500).error(err);
        res.json({
          loggedIn: true,
          name: `${data.firstName} ${data.lastName}`,
          email: `${data.email}`,
        });
      }
    });
  } catch (err) {
    res.json({ loggedIn: false });
  }
};

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(401)
        .json({ errorMessage: "Wrong email entered." })
        .send();
    }

    let token = req.cookies.token;
    if (token) await token.deleteOne();

    const resetToken = jwt.sign({ user: user._id }, jwtPassword);

    // const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
    // const link = `localhost:5000/auth/pw-reset?token=${resetToken}&id=${user._id}`;
    // link = "1";
    const link = `localhost:3000/pw-reset/${resetToken}/${user._id}`;
    sendEmail(
      // user.email,
      email,
      "Password Reset Request",
      {
        name: user.firstName,
        link: link,
      },
      "./template/requestResetPassword.handlebars"
    );
    res.send(`Instructions to reset your password have been sent to: ${email}`);
    return link;
  } catch (err) {
    res.status(500).send();
  }
};

const resetPassword = async (req, res) => {
  const { password, token, id } = req.body;
  try {
    let passwordResetToken = token;
    if (!passwordResetToken) {
      throw new Error("Invalid or expired password reset token");
    };

    if (password.length < 6) {
      return res.status(400).json({
        errorMessage: "Please enter a password longer than 6 characters.",
      });
    }

    //replace password in DB
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.findById({ _id: id });
    await User.updateOne({ _id: id }, { passwordHash: passwordHash });

    sendEmail(
      user.email,
      "Password Reset Successfully",
      {
        name: user.firstName,
      },
      "./template/resetPassword.handlebars"
    );

    res.send("Your password has been successfully reset.");

  } catch (err) {
    if (err.message === "Invalid or expired password reset token"){
      res.status(500).json({errorMessage: err.message });
      return;
    }
    console.error(err);
    res.status(500).send();
  }
};

//USE UNTIL WE LEARN TO QUERY FROM THE GFS.FILES DIRECTLY!
const getUsers = async (req, res) => {
  const users = await User.find().select({ email: 1, _id: 0 });
  if (!users) {
    console.log("no users");
  }
  console.log(users);
  res.json(users);
};

module.exports = {
  signUp,
  logIn,
  logOut,
  loggedIn,
  requestPasswordReset,
  resetPassword,
  getUsers,
};
