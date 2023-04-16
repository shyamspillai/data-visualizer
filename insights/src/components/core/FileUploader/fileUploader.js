import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faSpinner, faCheck } from '@fortawesome/free-solid-svg-icons'
import CoreButton from '../Button/button';

const defaultProps = {
    uploadFile: (e) => {
        console.log(e);
    },
    uploadFileText: "Upload File",
    isTypeButton: false,
    uploadInProgress: false,
    uploadSuccessful: false,
    uploadFailed: false
}

const FileUploader = ({
    uploadFile= defaultProps.uploadFile,
    uploadFileText= defaultProps.uploadFileText,
    isTypeButton= defaultProps.isTypeButton,
    uploadInProgress= defaultProps.uploadInProgress,
    uploadSuccessful= defaultProps.uploadSuccessful,
    uploadFailed= defaultProps.uploadFailed
}) => {

    const [inputFileRef, setInputFileRef] = useState(React.useRef(null));
    const [fileData, setFileData] = useState({});

    const triggerInputFileClick = (e) => {
        inputFileRef.current.click();
    }

    const uploadInputFile = (e) => {
        setFileData(e.target.files[0])
        uploadFile(e);
    }

    const getUploadFileText = () => uploadFileText ? uploadFileText : "Upload File";

    const renderFileUploader = () => {
        if (uploadSuccessful) {
            return <span><h3><FontAwesomeIcon icon={faCheck} color='green' />&nbsp; Upload Successful</h3></span> 
        }
        if (uploadInProgress) {
            return <span><h3><FontAwesomeIcon icon={faSpinner} spin={true}/>&nbsp; Uploading file ..</h3></span>
        }
        else {
            return isTypeButton ? 
                <CoreButton onClick={triggerInputFileClick} icon={faUpload} label={getUploadFileText()}/>
                :
                <span onClick={triggerInputFileClick} className="file-upload-text">
                    <h3>
                        <FontAwesomeIcon icon={faUpload}/>&nbsp;{getUploadFileText()}
                    </h3>
                </span>
            }
    }

    return (
        <div className='file-upload-box'>
            <input ref={inputFileRef} onChange={uploadInputFile} type='file' accept='.csv' style={{display: 'none'}} />
            {renderFileUploader()}
        </div>
    );
};

export default FileUploader;