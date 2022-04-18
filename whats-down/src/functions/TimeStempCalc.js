
export default function TimeStempCalc(timeStamp) {
    return timeStamp.toLocaleDateString() === new Date().toLocaleDateString() ?
        ' ' + timeStamp.getHours() + ':' + timeStamp.getMinutes() :
        ' ' + timeStamp.getDate() + '/' + (timeStamp.getMonth() + 1) + '/' + timeStamp.getFullYear();
}
