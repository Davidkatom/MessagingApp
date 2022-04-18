import TimeStempCalc from "../functions/TimeStempCalc";

const AudioElm = ({ direction, Src, timeStamp }) => {

    return (

        <div class={direction + '_cont'}>
            <div className={"message-elm" + direction} >
                <div className={"alert alert-primary " + direction}>
                    <div>
                        <audio controls src={Src}></audio>
                    </div>


                    <span className="time_stamp">
                        {TimeStempCalc(timeStamp)}
                    </span>
                </div>
            </div>
        </div>

    )
}

export default AudioElm