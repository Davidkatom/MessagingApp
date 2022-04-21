import TimeStempCalc from "../../functions/TimeStempCalc";
const MessageElm = ({ direction, src, messagetype, timeStamp }) => {
    return (
        <div className={direction + '_cont'}>
            <div className={"message-elm" + direction} >
                <div className={"alert alert-primary " + direction}>
                    {messagetype === "image" ?
                        <img src={src} alt="profile" className="img-thumbnail" width="140" height="140" />
                        :
                        messagetype === "video" ?
                            <video src={src} controls alt="profile" className="img-thumbnail" width="400" height="400" type="video/mp4" >
                                <source src={src} type="video/mp4"></source>
                            </video>
                            :
                            messagetype === "audio" ?
                                <audio controls src={src}></audio>
                                :
                                messagetype === "text" ?

                                    src

                                    :
                                    null
                    }
                    <span className="time_stamp">{TimeStempCalc(timeStamp)}</span>
                </div>
            </div>
        </div>

    )
}

export default MessageElm