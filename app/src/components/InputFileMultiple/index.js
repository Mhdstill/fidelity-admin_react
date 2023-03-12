import React, { useState, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';

function InputFileMultiple(props) {
    const { onChange } = props;
    const [files, setFiles] = useState([]);

    function handleInputChange(event) {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles);
        if (onChange) {
            onChange(selectedFiles);
        }
    }

    function handleFileDelete(index) {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    }

    return (
        <>
            <div className="row">
                <div className="col-md-4">
                    <div id="id_drop_area_new_file">
                        <label className="dropzone-input" id="dropzone-wrapper_ged_2" for="dropzone_ged_2">
                            <FontAwesomeIcon icon={faCloudArrowUp} />
                            <input type="file" onChange={handleInputChange} multiple className="photo-to-upload check-size dropzone" />
                            <span className="text-center">
                                Déposez un ou plusieurs fichiers
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            <div id="files-area">
                <div id="filesList">
                    <span className="dropzone-files-list" id="files-names" style={{ flexDirection: 'initial', flexWrap: 'wrap' }}>
                        {files.length > 0 && files.map((file, index) => (
                            <>
                                <span class="file-block">
                                    <span class="file-delete" onClick={() => handleFileDelete(index)}><span>+</span></span>
                                    <span class="name"> {file.name} </span>
                                </span>

                            </>
                        ))}
                    </span>
                </div>
            </div>
        </>
    );
}

export default InputFileMultiple;