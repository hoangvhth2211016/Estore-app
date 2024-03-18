
export default function CustomDateTime({ style, dateTime, showDate, showTime }) {
    const originalDateTime = new Date(dateTime);
    let formattedString = '';
    if (showDate) {
        const formattedDate = originalDateTime.toLocaleDateString(undefined, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        formattedString += formattedDate;
    }
    if (showTime) {
        const formattedTime = originalDateTime.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit'
        });
        formattedString += ' ' + formattedTime;
    }

    return (
        <span className={style}>
            {formattedString}
        </span>
    )
}
