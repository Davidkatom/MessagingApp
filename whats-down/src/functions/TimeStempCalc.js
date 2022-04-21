
export default function TimeStempCalc(timeStamp) {
    var date = timeStamp == null ? '' : timeStamp.toLocaleDateString() === new Date().toLocaleDateString() ?
        ' ' + timeStamp.getHours() + ':' + (timeStamp.getMinutes() < 10 ? '0' : '') + timeStamp.getMinutes() :
        ' ' + timeStamp.getDate() + '/' + (timeStamp.getMonth() + 1) + '/' + timeStamp.getFullYear();
    ;
    return date
}

