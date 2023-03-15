import { callAPI } from "./api";
import showNotification from '../components/Notification';

async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.set('Content-Type', file.type);
    let fileResponse = await callAPI('/api/media_objects', 'POST', formData);
    const fileResponseData = await fileResponse.json();
    let mediaObjectIRI = fileResponseData["@id"];

    return mediaObjectIRI;
};

function logout(navigate = null, path = null) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('operationToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('module');
    if (navigate && path) {
        navigate(path);
        window.location.reload();
    }
}

async function login(email, password, setAuthToken, setUserData, setModule, setOperationToken, setRefreshAuthToken) {
    try {
        const response = await callAPI('/auth', 'POST', { email, password });
        if(response){
            console.log(response.email);
            console.log(response.operation);
            console.log(response.module);
            console.log(response.refresh_token);

            localStorage.setItem('authToken', response.token);
            localStorage.setItem('operationToken', response.operation);
            localStorage.setItem('userData', JSON.stringify({ email: response.email, role: response.role }));
            localStorage.setItem('module', response.module);
            localStorage.setItem('refreshAuthToken', response.refresh_token);
            setAuthToken(response.token);
            setUserData(JSON.stringify({ email: response.email, role: response.role }));
            setModule(response.module);
            setOperationToken(response.operation);
            setRefreshAuthToken(response.refresh_token);
            showNotification("Connecté en tant que " + response.email, "success")
        }
        
    } catch (error) {
        console.log(error);
        showNotification("Identifiant incorrect.", "danger")
    }
}

export { uploadFile, logout, login }
