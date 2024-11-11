export function convertIsoToReadableDate(isoDateString: string) {
    const date = new Date(isoDateString);

    // Use Intl.DateTimeFormat to create a readable format
    const options: any = {
        weekday: 'long',    // "Monday"
        year: 'numeric',    // "2024"
        month: 'long',      // "November"
        day: 'numeric',     // "9"
        // hour: '2-digit',    // "03"
        // minute: '2-digit',  // "45"
        // second: '2-digit',  // "32"
        // timeZoneName: 'short' // "UTC"
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

    return formattedDate;
}