const router = require("express").Router();
const Submission = require("../models/submissionModel");
const { submissionAuth, adminAuth } = require("../middleware/auth");
// const upload = require("../middleware/upload");
// const mongoose = require("mongoose");
// const Grid = require("gridfs-stream");




// // const conn = mongoose.connection;
// // conn.once("open", function () {
// //   gfs = Grid(conn.db, mongoose.mongo);
// //   gfs.collection("week1");
// // });

// const replaceSubmissions = async (req, res, next) => {
//   try {
//     const file = await gfs.files.findOne({
//       metadata: {
//         email: req.email,
//         question: req.headers.path,
//       },
//     });
//     if (file) {
//       await gfs.files.deleteOne(file);
//     }
//     next();
//   } catch (err) {
//     console.log(err);
//     res.status(500).error(err);
//   }
// };

// router.post(
//   "/upload",
//   submissionAuth,
//   replaceSubmissions,
//   upload.single("file"),
//   async (req, res) => {
//     try {
//       if (req.file === undefined) return res.send("you must select a file.");
//       const imgUrl = `http://localhost:5000/submission/file/${req.file.filename}`;
//       return res.send(imgUrl);
//     } catch {
//       //VERIFY ERROR HANDLING!!!
//       res.send({ message: "could not upload file owo", error: error });
//     }
//   }
// );

// router.get("/file/:filename", submissionAuth, async (req, res) => {
//   try {
//     const file = await gfs.files.findOne({
//       metadata: {
//         email: req.email,
//         question: req.params.filename,
//       },
//     });
//     if (!file) {
//       res.send(false);
//       return;
//     }
//     const readStream = gfs.createReadStream(file);
//     readStream.pipe(res);
//   } catch (error) {
//     res.send({ message: "not found", error: error });
//   }
// });

// router.get("/date/:filename", submissionAuth, async (req, res) => {
//   try {
//     const file = await gfs.files.findOne({
//       metadata: {
//         email: req.email,
//         question: req.params.filename,
//       }
//     });
//     if (!file) {
//       res.send(`N/A`);
//       return;
//     }
//     const date = new Date(file.uploadDate);
//     res.send(date.toString());
//   } catch (error) {
//     res.send({ message: "not found", error: error.message });
//   }
// });

// router.get("/admin/file/:email/:filename", adminAuth, async (req, res) => {
//   try {
//     const file = await gfs.files.findOne({
//       metadata: {
//         email: req.params.email,
//         question: req.params.filename,
//       }
//     });
//     if (!file) {
//       res.send(`Contestant ${req.params.email} has not submitted a file for question ${req.params.filename}`);
//       return;
//     }
//     const readStream = gfs.createReadStream(file);
//     readStream.pipe(res);
//   } catch (error) {
//     res.send({ message: "not found", error: error.message });
//   }
// });

// router.get("/admin/date/:email/:filename", adminAuth, async (req, res) => {
//   try {
//     const file = await gfs.files.findOne({
//       metadata: {
//         email: req.params.email,
//         question: req.params.filename,
//       }
//     });
//     if (!file) {
//       res.send(`N/A`);
//       return;
//     }
//     const date = new Date(file.uploadDate);
//     res.send(date.toString());
//   } catch (error) {
//     res.send({ message: "not found", error: error.message });
//   }
// });

// router.get("/admin/dropdown/:questionCode", adminAuth, async (req, res) => {
//   try {
//     const resSubmittedUsers = [];   
//     await gfs.files
//       .find(
//         { filename: req.params.questionCode },
//         { sort : {metadata: 1 }} 
//      )
//       .toArray((err, files) => {
//       if (!files || files.length === 0) {
//         resSubmittedUsers.push({email: "No submissions available"});
//       } else {
//         files.map(file => {
//           resSubmittedUsers.push({
//             email: file.metadata.email
//           })
//         });
//       };
//       res.json(resSubmittedUsers);
//     });

//   } catch (err) {
//     res.send({ errorMessage: "problem finding emails", error: err.message });
//   };
// });

module.exports = router;
