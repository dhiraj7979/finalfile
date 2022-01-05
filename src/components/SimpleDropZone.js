import axios from "axios";
import React from "react";
// import axios from "axios";

import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";

const SimpleDropZone = () => {
  // Payload data and url to upload files
  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };

  // Return the current status of files being uploaded
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };

  // Return array of uploaded files after submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    // allFiles.forEach((f) => f.remove());
    axios
      .post("https://v2.convertapi.com/upload", files)
      .then((res) => {
        console.log("file Uploaded", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*,audio/*,video/*"
    />
  );
};

export default SimpleDropZone;
