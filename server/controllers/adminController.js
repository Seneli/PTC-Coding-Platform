const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtPassword = require("../config/default.json").jwtPassword;
const jwtAdminPassword = require("../config/default.json").jwtAdminPassword;

const Admin = require("../models/adminModel");

const createAdminAccount = async (req, res) => {
    try {
      const email = "tech@projecttechconferences.com";
      const password = "2!gE~R$*B.nX-jWE2~HX'Bn}`-YAjz5h{s9y%PH@5{#jVT/";

      // hash the password
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
  
      // saving the password
      const newAdmin = new Admin({
        email: email,
        passwordHash: passwordHash
      });
      const savedAdmin = await newAdmin.save();
  
      //create token
      const adminToken = jwt.sign(
        {
          user: savedAdmin._id,
        },
        jwtAdminPassword
      );
  
      //send the token in an HTTP-only cookie
      res
        .cookie("adminToken", adminToken, {
          httpOnly: true,
        })
        .json({ message: "You have successfully created an Admin account" });
    } catch (err) {
      console.error(err);
      res.status(500).send("failed to login to admin account");
    }
};


const loginAdminAccount = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        //validate input has been entered
        if (!email || !password) {
          return res
            .status(400)
            .json({ errorMessage: "Please enter all required fields." });
        }
    
        //search if the email matches an email in the DB
        const existingAdmin = await Admin.findOne({
          email: email,
        });
    
        if (!existingAdmin) {
          return res
            .status(401)
            .json({
              errorMessage: "Wrong admin account information. Failed to log in.",
            })
            .send();
        }
    
        //compare passwordHash to existing user's pwhash
        const passwordCorrect = await bcrypt.compare(
          password,
          existingAdmin.passwordHash
        );

        if (!passwordCorrect) {
          return res.status(401).json({
            errorMessage: "Wrong admin account information. Failed to log in.",
          });
        }
    
        //make jwt
        const adminToken = jwt.sign({ user: existingAdmin._id }, jwtAdminPassword );
      
        //send the token in an HTTP-only cookie
        res
        .cookie("adminToken", adminToken, { httpOnly: true })
        .cookie("token", "", {httpOnly: true, expires: new Date(0)})
        .json({ message: "You have successfully logged in as an Admin" });

      } catch (err) {
        console.error(err);
        res.status(500).send();
      }
};

module.exports = { createAdminAccount, loginAdminAccount }; 