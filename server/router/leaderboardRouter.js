const router = require("express").Router();
const User = require("../models/userModels");
const Submission = require("../models/submissionModel");
const { submissionAuth } = require("../middleware/auth");
  
router.get("/", async (req, res) => {
    try {
        const users = await User.find()
            .select({firstName: 1, lastName: 1, score: 1, _id: 0})
            .sort({score: -1});
        if (!users){
            console.log("no users");
        }
        console.log(users);
        res.json(users);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/personal", submissionAuth, async (req, res) => {
    try {
        const users = await User.find({ email: req.email })
            .select({ score: 0, _id: 0, passwordHash: 0, firstName: 0, lastName: 0, __v: 0, email: 0 });
        if (!users){
            console.log("no users");
        };
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

module.exports = router ; 