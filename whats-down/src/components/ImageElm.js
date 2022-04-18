import TimeStempCalc from "../functions/TimeStempCalc";

const ImageElm = ({ direction, imgSrc , timeStamp }) => {

    return (
        
        <div class = {direction + '_cont'}>
            <div className={"message-elm" + direction} >
                <div className={"alert alert-primary " + direction}>
                    <img src={imgSrc} alt="profile" className="img-thumbnail" width="140" height="140" />
                    <span className="time_stamp">
                        {TimeStempCalc(timeStamp)}
                    </span>
                </div>
            </div>
        </div>

    )
}

export default ImageElm