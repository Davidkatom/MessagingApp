import { useState } from 'react';

const SendPhoto = () => {
    const [Picture, setPicture] = useState();
    const handlePicture = (e) => {
        setPicture(URL.createObjectURL(e.target.files[0]))
        document.getElementById('profile_mini_pic').classList.remove('collapse');
    }
    return (
        <div className="send-photo">
            <label className="input-group-text" for='picture'>Upload a Profile Picture:</label>
            <input type="file" className="form-control" id='picture' onChange={handlePicture}></input>
            <img src={Picture} alt="profile" className="img-thumbnail" width="140" height="140" id = "media-to-send"/>
        </div>
    )
}
export default SendPhoto