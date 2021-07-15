import axios from 'axios';

export interface Props {
  fileKey: string;
}

/**
 * @description Deletes a file from the public-read s3 bucket by key
 *
 * @returns {function} handleDelete({fileKey}) Returns true if successful
 */
export function useAWSDelete() {
  /**
   *
   * @param {string} fileKey The key of the object being deleted
   * @returns {boolean} success
   */
  async function handleDelete({ fileKey }: Props) {
    console.log(fileKey);

    await axios.post(`${process.env.REACT_APP_ENDPOINT}/aws/delete_s3`, {
      fileKey,
    });

    return true;
  }

  return {
    handleDelete,
  };
}
