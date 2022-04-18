const MessageElm = ({ direction, text }) => {
    return (
        <div class = {direction + '_cont'}>
            <div className={"message-elm" + direction} >
                <div className={"alert alert-primary " + direction}>
                    <span > {text} </span>
                </div>
            </div>
        </div>

    )
}

export default MessageElm