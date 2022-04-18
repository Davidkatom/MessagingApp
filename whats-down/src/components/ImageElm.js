import { useState } from 'react';

const ImageElm = ({ direction, imgSrc }) => {

    return (
        
        <div class = {direction + '_cont'}>
            <div className={"message-elm" + direction} >
                <div className={"alert alert-primary " + direction}>
                    <img src={imgSrc} alt="profile" className="img-thumbnail" width="140" height="140" />
                </div>
            </div>
        </div>

    )
}

export default ImageElm