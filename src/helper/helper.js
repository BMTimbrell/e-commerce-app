export const formatDate = date => {
    let result = new Date(date);
    const day = result.getDate();
    const month = result.getMonth() + 1;
    const year = result.getFullYear();
    result = day + '/' + month + '/' + year;
    return result;
};