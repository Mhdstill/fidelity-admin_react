const formatDateToFR = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
};

const formatDatetimeToFR = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

    return formattedDate;
};

export { formatDateToFR, formatDatetimeToFR }
