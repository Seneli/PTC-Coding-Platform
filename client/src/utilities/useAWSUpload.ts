import { useState } from "react";

import axios from "axios";

const DEFAULT_MAX_SIZE = 15e6;

export interface Props {
  metadata: object;
  file: File;
  path: string;
  maxSize?: number;
}

/**
 * @description Provides callbacks and functions to upload files to a public-read AWS bucket
 *
 */
export function useAWSUpload() {
  const [progress, setProgress] = useState<number>(0);

  /**
   * @description Uploads a passed file to a public read AWS bucket
   *
   * @param {File} fileSubmission Must pass in a File -> input.files[0]
   * @param {string} path No trailing slashes! - A string representing the path where the file will be stored
   * @param {number} [maxSize=DEFAULT_MAX_SIZE] The maximum size of the file, defaults to 15mb
   *
   * @returns {string} fileKey
   */
  async function handleUpload({
    metadata,
    file,
    path,
    maxSize = DEFAULT_MAX_SIZE
  }: Props) {
    if (!file) throw new Error("Did you forget to attach a file?");

    // Get the file type and name
    const fileType = file.name.split(".").pop();

    if (file.size > maxSize) throw new Error("Your file is too large");
    if (file.size === 0) throw new Error("Did you forget to attach a file?");

    const signedRes = await axios.post(
      `${process.env.REACT_APP_ENDPOINT}/aws/sign_s3`,
      {
        fileName: file.name,
        metadata: metadata,
        path,
        fileType
      }
    );
    //   console.log("signed res post ", signedRes);
    const { signedRequest, fileKey, mimeFileType } = signedRes.data;

    // Default headers from passport.js interfering - Borrowed from V1
    // delete axios.defaults.headers.common['Authorization'];

    // Initializing the headers
    const options = {
      headers: {
        "Content-Type": mimeFileType
      },
      onUploadProgress: (progressEvent: any) => {
        setProgress(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
      }
    };

    await axios.put(signedRequest, file, options);
    return fileKey;
  }

  return {
    handleUpload,
    progress
  };
}
