const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");

const { submissionAuth, adminAuth } = require("../middleware/auth");
const Submission = require("../models/submissionModel");

// Filetype lookup
var mime = require("mime-types");

// create a unique id for the submission
const { v4: uuidv4 } = require("uuid");
const { isValidObjectId } = require("mongoose");

const awsDelete = (fileKey) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_USER_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.S3_REGION
  });
  const s3Params = {
    Bucket: process.env.PUBLIC_S3_BUCKET,
    Key: fileKey
  };

  s3.deleteObject(s3Params, function (err, data) {
    console.log(data);
    console.log("successfully deleted");
  });
};

// Clears an open space for s3 Bucket
// Also performs form validation to prevent double uploads
const awsUpload = async (req, res, next) => {
  const { fileName, metadata, path, fileType } = req.body;

  const cleanedFileName = fileName.replace(/\s+/g, "");
  // const mimeFileType = mime.lookup(fileType);
  // console.log("mimetype", mimeFileType);

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_USER_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.S3_REGION
  });

  var fileKey;
  if (path === "/") fileKey = `misc/${uuidv4()}-${cleanedFileName}`;
  else fileKey = `${path}/${uuidv4()}-${cleanedFileName}`;

  // Set up the payload of what we are sending to the S3 api
  const s3Params = {
    Bucket: process.env.PUBLIC_S3_BUCKET,
    Key: fileKey,
    Metadata: metadata,
    Expires: 120,
    //ContentType: mimeFileType,
    ACL: "public-read"
  };

  // Make a request to the S3 API to get a signed URL which we can use to upload our file
  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        errorMessage: "An internal server error occurred, please try again."
      });
    }
    // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
    const returnData = {
      signedRequest: data,
      fileKey,
      //mimeFileType
    };
    //console.log(returnData);
    req.question = req.body.returnData = returnData;

    next();
  });
};

router.post("/sign_s3", submissionAuth, awsUpload, async (req, res) => {
  try {
    //const {fileKey, userId} = req.body;
    //IMPORTANT: fix the structure of the req info!
    const userId = req.body.userId;
    const fileKey = req.body.returnData.fileKey;
    const question = req.body.metadata.question;
    console.log(userId, fileKey, question);
    console.log("in the mongo creation area");

    const existingSubmission = await Submission.findOne({
      userId: userId,
      question: question
    });

    console.log("existing sub ", existingSubmission);
    if (!existingSubmission) {
      //create a submission instance
      console.log("create new submission object");
      const newSubmission = new Submission({
        userId: userId,
        question: question,
        //uploadDate: String,
        fileKey: fileKey
      });
      const saveNewSub = await newSubmission.save();
    } else {
      // deleting old object
      var oldFileKey = existingSubmission.fileKey;
      awsDelete(oldFileKey);

      // update updateFileKey in db
      const updateFileKey = {
        $set: {
          fileKey: fileKey
        }
      };
      const updateSub = await Submission.updateOne(
        existingSubmission,
        updateFileKey
      );
      //update the existingSubmission document
      //return;
    }

    res.status(200).json(req.body.returnData);
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: "Internal Server Error while saving to Mongo" });
  }
});

// list all items in a folder using Prefix
router.get("/list_s3", adminAuth, async (req, res) => {
  const { week } = req.body;

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_USER_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.S3_REGION
  });

  console.log();

  const s3Params = {
    Bucket: process.env.PUBLIC_S3_BUCKET, //bucket name
    Prefix: week
  };

  s3.listObjects(s3Params, function (err, data) {
    console.log(data);

    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "An error occured when finding the object" });
    } else {
      return res.status(200).json(data);
    }
  });
});

router.post("/get_FK", submissionAuth, async (req, res) => {
  const userId = req.body.userId;
  const question = req.body.question;

  const existingSubmission = await Submission.findOne({
    userId: userId,
    question: question
  });

  const fileKey = existingSubmission.fileKey;
  const date = existingSubmission.updatedAt;
  return res.json({ fileKey, date });
});

module.exports = router;
