const MessageElm = ({ direction, text }) => {
    return (
        <div className= {direction + '_cont'}>
            <div className={"message-elm" + direction} >
                <div className={"alert alert-primary " + direction}>
                    {text}
                </div>
            </div>
        </div>

    )
}

export default MessageElm