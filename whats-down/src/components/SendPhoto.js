import { useState } from 'react';
import Button from './Button';
const SendPhoto = () => {
    const [Picture, setPicture] = useState();
    const handlePicture = (e) => {
        setPicture(URL.createObjectURL(e.target.files[0]))
        document.getElementById('media-to-send').classList.remove('collapse');
        document.getElementById('send_button').classList.remove('collapse');
    }
    return (
        <div className="send-photo">
            <label className="input-group-text" for='picture'>Upload an image:</label>
            <input type="file" className="form-control" id='picture' onChange={handlePicture}></input>
            <img src={Picture} alt="Pic" className="img-thumbnail collapse" width="140" height="140" id = "media-to-send"/>
        </div>
    )
}
export default SendPhoto