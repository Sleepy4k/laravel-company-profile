const convertDateToLocaleString = (date: string) => {
    const convertedDate = new Date(date);

    if (isNaN(convertedDate.getTime())) {
        return date;
    }

    const day = convertedDate.getDate();
    const month = convertedDate.toLocaleString('id-ID', { month: 'long' });
    const year = convertedDate.getFullYear();

    return `${day.toString().padStart(2, '0')} ${month} ${year}`;
}

const capitalizeFirstLetter = (str: string) => {
    try {
        return str.charAt(0).toUpperCase() + str.slice(1);
    } catch (error) {
        return str;
    }
}

export { convertDateToLocaleString, capitalizeFirstLetter };