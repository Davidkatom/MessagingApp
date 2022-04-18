import TimeStempCalc from "../functions/TimeStempCalc";

const VideoElm = ({ direction, imgSrc, timeStamp }) => {

    return (

        <div class={direction + '_cont'}>
            <div className={"message-elm" + direction} >
                <div className={"alert alert-primary " + direction}>

                    <video src={imgSrc} controls alt="profile" className="img-thumbnail" width="400" height="400" type="video/mp4" >
                        <source src={imgSrc} type="video/mp4"></source>
                    </video>


                    <span className="time_stamp">
                        {TimeStempCalc(timeStamp)}
                    </span>
                </div>
            </div>
        </div>

    )
}

export default VideoElm