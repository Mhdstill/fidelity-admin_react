import { callAPI } from "./api";

async function uploadFile(file)
{
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.set('Content-Type', file.type);
    let fileResponse = await callAPI('/api/media_objects', 'POST', formData);
    const fileResponseData = await fileResponse.json();
    let mediaObjectIRI = fileResponseData["@id"];

    return mediaObjectIRI;
};

export { uploadFile }
