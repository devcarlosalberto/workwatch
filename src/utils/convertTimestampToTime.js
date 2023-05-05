export function convertTimestampToTime(timestamp) {
    const date = new Date(timestamp)
    const hours = date.getUTCHours().toString().padStart(2, 0)
    const minutes = date.getUTCMinutes().toString().padStart(2, 0)
    const seconds = date.getUTCSeconds().toString().padStart(2, 0)
    return `${hours}:${minutes}:${seconds}`
}

console.log(convertTimestampToTime(Date.now()))
