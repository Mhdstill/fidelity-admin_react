const API_URL = "https://mhd-it.fr";

const refreshAuthToken = async (refreshToken) => {
    try {
        const response = await fetch(`${API_URL}/api/token/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refresh_token: refreshToken,
            }),
        });

        if (!response.ok) {
            throw new Error("Response not OK");
        }

        const data = await response.json();
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("refreshToken", data.refresh_token);
        return data.token;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const callAPI = async (endpoint, method, body = {}) => {
    const authToken = localStorage.getItem("authToken");
    const refreshToken = localStorage.getItem("refreshAuthToken");
    let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
    };
    let response;

    try {
        response = await fetch(`${API_URL}${endpoint}`, {
            method,
            headers,
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error("Response not OK");
        }
    } catch (error) {
        console.log(error);
        console.log(refreshToken)
        if (error.message === "Response not OK" && response.status === 401 && refreshToken) {
            const newAuthToken = await refreshAuthToken(refreshToken);
            if (newAuthToken) {
                headers.Authorization = `Bearer ${newAuthToken}`;
                response = await fetch(`${API_URL}${endpoint}`, {
                    method,
                    headers,
                    body: JSON.stringify(body),
                });
                console.log(response);
            }
        } else {
            console.error(error);
            return null;
        }
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        return data;
    } else {
        return response;
    }
};



export { API_URL, callAPI, refreshAuthToken }