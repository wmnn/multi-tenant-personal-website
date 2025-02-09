export function formatDate(date: Date) {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    const month = months[date.getMonth()]; // Get month name
    const year = date.getFullYear(); // Get year
    
    return `${month} ${year}`; // Return formatted string
}
export function getDateDifference(startDate: Date, endDate: Date) {
    // Ensure the start date is before the end date, swap if necessary
    if (startDate > endDate) {
        [startDate, endDate] = [endDate, startDate];
    }

    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();

    // Adjust if months is negative (i.e., the end month is before the start month in the same year)
    if (months < 0) {
        years--;
        months += 12;
    }

    months++;

    // Conditionally format the result
    let result = '';
    if (years > 0) {
        result += `${years} year${years !== 1 ? 's' : ''} `;
    }
    result += `${months} month${months !== 1 ? 's' : ''}`;

    return result;
}
export function formatDates(start: Date, end: any) {

    // Check if 'end' is a valid date 
    //@ts-ignore
    const isValidDate = end instanceof Date && !isNaN(end);

    if (!end || !isValidDate) {
        // If 'end' is not provided or it's not a valid date, return only the start date and the difference
        return `${formatDate(new Date(start))} (${getDateDifference(new Date(start), new Date())})`;
    }
    return `${formatDate(new Date(start))} - ${formatDate(new Date(end))} (${getDateDifference(new Date(start), new Date(end))})`
}