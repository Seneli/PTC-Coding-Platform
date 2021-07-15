const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const mongoURI = require("../config/default.json").mongoURI;

const storage = new GridFsStorage({
    url: mongoURI,
    options: { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    },
    file: async (req, file) => {

        //Make it so that the file name is JUST the question (11C or something)
        //and it checks the user's email then redirects them to their 11C file or 
        //it will redirect them to a "NO SUBMISSION YET" txt file if they haven't submitted!
        return {
            bucketName: "week1",
            filename: req.headers.path,
            fileFilter: "text/plain",
            metadata: {
                email: req.email,
                question: req.headers.path,
            }
        };
    },
});

module.exports = multer({ storage });