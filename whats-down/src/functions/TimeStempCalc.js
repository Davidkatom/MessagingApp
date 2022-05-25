
function sqlToJsDate(sqlDate){
    let dateTimeParts= sqlDate.split(/[- : //]/); // regular expression split that creates array with: year, month, day, hour, minutes, seconds values
    console.log(dateTimeParts);
    return new Date(parseInt(dateTimeParts[2]), parseInt(dateTimeParts[1]), parseInt(dateTimeParts[0]), parseInt(dateTimeParts[3]), parseInt(dateTimeParts[4]), parseInt(dateTimeParts[5]));
}


export default function TimeStempCalc(timeStamp) {
    console.log(sqlToJsDate(timeStamp));
    timeStamp = sqlToJsDate(timeStamp);
    console.log(timeStamp.getFullYear());
    console.log(timeStamp.getMonth());
    console.log(timeStamp.getDate());
    var date = timeStamp == null ? '' : timeStamp.toLocaleDateString() === new Date().toLocaleDateString() ?
            ' ' + timeStamp.getHours() + ':' + (timeStamp.getMinutes() < 10 ? '0' : '') + timeStamp.getMinutes() :
            ' ' + timeStamp.getDate() + '/' + (timeStamp.getMonth() + 1) + '/' + timeStamp.getFullYear();
    ;
    console.log('date:');
    console.log(date);
    return date
}

