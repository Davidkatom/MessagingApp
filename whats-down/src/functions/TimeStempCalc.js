
function sqlToJsDate(sqlDate){
    let dateTimeParts= sqlDate.split(/[- : //]/); // regular expression split that creates array with: year, month, day, hour, minutes, seconds values
    return new Date(parseInt(dateTimeParts[2]), parseInt(dateTimeParts[1])-1, parseInt(dateTimeParts[0]), parseInt(dateTimeParts[3]), parseInt(dateTimeParts[4]), parseInt(dateTimeParts[5]));
}
function fixDateWithT(dateWithT) {
    let dateTimeParts= dateWithT.split(/[- : // T .]/); // regular expression split that creates array with: year, month, day, hour, minutes, seconds values
    return new Date(parseInt(dateTimeParts[2]), parseInt(dateTimeParts[1])-1, parseInt(dateTimeParts[0]), parseInt(dateTimeParts[3]), parseInt(dateTimeParts[4]), parseInt(dateTimeParts[5]));
}

export default function TimeStempCalc(timeStamp) {
    try{
        timeStamp.toLocaleDateString();
    }catch{
        try{
            fixDateWithT(timeStamp).toLocaleDateString();
            timeStamp = fixDateWithT(timeStamp)
        }catch{
            try{
                sqlToJsDate(timeStamp).toLocaleDateString();
                timeStamp = sqlToJsDate(timeStamp)
            }catch{
                return "just now";
            }
        }
    }
    var date = timeStamp == null ? '' : timeStamp.toLocaleDateString() === new Date().toLocaleDateString() ?
            ' ' + timeStamp.getHours() + ':' + (timeStamp.getMinutes() < 10 ? '0' : '') + timeStamp.getMinutes() :
            ' ' + timeStamp.getDate() + '/' + (timeStamp.getMonth() + 1) + '/' + timeStamp.getFullYear();
    return date
}

