import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

function InputFile(props) {
  const { onChange, defaultImage } = props;
  const [previewImage, setPreviewImage] = useState(defaultImage);

  function handleInputChange(event) {
    const selectedFile = event.target.files[0];
    setPreviewImage(URL.createObjectURL(selectedFile));
    if (onChange) {
      onChange(selectedFile);
    }
  }

  useEffect(() => {
    setPreviewImage(defaultImage);
  }, [defaultImage]);

  return (
    <>
      <Form.Control
        type="file"
        onChange={handleInputChange}
      />
      {previewImage && (
        <div>
          <img className="mt-3" src={previewImage} alt="Preview" style={{ maxHeight: '200px', maxWidth: 'auto' }} />
        </div>
      )}
    </>
  );
}

export default InputFile;