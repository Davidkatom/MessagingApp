import TimeStempCalc from "../functions/TimeStempCalc";
const MessageElm = ({ direction, text, timeStamp }) => {
    return (
        <div className={direction + '_cont'}>
            <div className={"message-elm" + direction} >
                <div className={"alert alert-primary " + direction}>
                    {text}
                    <span className="time_stamp">
                        {TimeStempCalc(timeStamp)}
                    </span>
                </div>
            </div>
        </div>

    )
}

export default MessageElm