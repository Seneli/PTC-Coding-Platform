const jwt = require("jsonwebtoken");
const secret = require("../config/default.json")
const User = require("../models/userModels");

const submissionAuth = async (req, res, next) => {
    try {
        console.log(req.headers.path);

        const token = req.cookies.token;
        if (!token){
            return res.status(401).json({ErrorMessage: "UNAUTHORIZED"});
        }
        const verifiedId = jwt.verify(token, secret.jwtPassword);
        req.body.userId = verifiedId.user;
        //console.log(verifiedId.user);
        
        await User.findById( verifiedId.user , (err, data) => {
            if (err){
                console.log("ERROR" + err);
                res.status(500).error(err);
            } else {
                req.email = data.email;
            }
        });

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ErrorMessage: "You are not authorized to make this request"});
    }
};


const adminAuth = async (req, res, next) => {
    try {
        const adminToken = req.cookies.adminToken;
        if (!adminToken){
            return res.status(401).json({ErrorMessage: "UNAUTHORIZED"});
        }
        const verified = jwt.verify(adminToken, secret.jwtAdminPassword);

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ErrorMessage: "You are not authorized to make this request"});
    }
};


module.exports = { submissionAuth, adminAuth};