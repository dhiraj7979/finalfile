import axios from "axios";
import React from "react";


// components/simple-dropzone.component.js
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { getDroppedOrSelectedFiles } from 'html5-file-selector'



const sendDataToBackend = async (filesSubmittedByUser) => {
    const body = {
        name: "testNAme",
        bio: "Test bio123",
        files: filesSubmittedByUser
    }

    const response = await axios.post('https://httpbin.org/post', JSON.stringify(body));
    const json = await response.json();
    console.log(`data: ${json}`);
}


const SimpleDropZone = () => {

    const getUploadParams = ({ meta }) => {
        console.log(meta);
        return { url: 'https://httpbin.org/post' }
    }

    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    const handleSubmit = (files, allFiles) => {
        // console.log(files.map(f => f.meta))
        // allFiles.forEach(f => f.remove())

        sendDataToBackend(files);

        console.log("Hello...from handleSubmit")
        console.log('Files submitted:');
        console.log(allFiles);

    }

    const getFilesFromEvent = e => {
        return new Promise(resolve => {
            getDroppedOrSelectedFiles(e).then(chosenFiles => {
                resolve(chosenFiles.map(f => f.fileObject))
            })
        })
    }

    const InputChooseFile = ({ accept, onFiles, files, getFilesFromEvent }) => {
        const text = files.length > 0 ? 'Add more files' : 'Choose files to upload'

        const buttonStyle = {
            backgroundColor: '#67b0ff',
            color: '#fff',
            cursor: 'pointer',
            padding: 15,
            borderRadius: 30
        }

        return (
            <label style={buttonStyle}>
                {text}
                <input
                    style={{ display: 'none' }}
                    type="file"
                    accept={accept}
                    multiple
                    onChange={e => {
                        getFilesFromEvent(e).then(chosenFiles => {
                            onFiles(chosenFiles)
                        })
                    }}
                />
            </label>
        )
    }

    return (
        <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
            InputComponent={InputChooseFile}
            getFilesFromEvent={getFilesFromEvent}
            classNames
        />
    );
};

export default SimpleDropZone;