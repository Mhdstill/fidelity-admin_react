import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import '@ckeditor/ckeditor5-build-classic/build/translations/fr';
import '@ckeditor/ckeditor5-build-classic/build/translations/en-gb';

function InputCKEditor(props) {
    const { value, setValue } = props;

    function handleCKEditorChange(event, editor) {
        const data = editor.getData();
        setValue(data);
    }

    return (
        <Form.Group controlId="description">
            <CKEditor
                editor={ClassicEditor}
                data={value}
                onChange={handleCKEditorChange}
                config={{
                    language: 'fr',
                    ckfinder: {
                        uploadUrl: 'https://example.com/uploads'
                    }
                }}
            />
        </Form.Group>
    )
}

export default InputCKEditor;