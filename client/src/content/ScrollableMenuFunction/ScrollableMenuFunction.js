const scrollableMenuFunction = (s3_list) => {

    const formattedS3 = {
        Questions: {
            1: {},
            2: {},
            3: {}
        }
    };

    s3_list.map((object) => {

        const question = object.Key[1];
        const part = object.Key[2];
        const objectJSON = {
            date: object.LastModified,
            email: object.Key.split("/")[1],
            fileKey: object.Key
        };

        if (!formattedS3.Questions[question][part]){
            formattedS3.Questions[question][part] = [objectJSON];
        } else {
            formattedS3.Questions[question][part].push(objectJSON);
        };
    });
    return formattedS3; 
};

export default scrollableMenuFunction;