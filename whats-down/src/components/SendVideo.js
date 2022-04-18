import { useState } from 'react';
const SendVideo = () => {
    const [Video, setVideo] = useState();
    const handleVideo = (e) => {
        setVideo(URL.createObjectURL(e.target.files[0]))
        document.getElementById('media-to-send').classList.remove('collapse');
        document.getElementById('send_button').classList.remove('collapse');
    }
    return (
        <div className="send-photo">
            <label className="input-group-text" for='picture'>Upload a Video:</label>
            <input type="file" className="form-control" id='picture' onChange={handleVideo}></input>
            <video src={Video} alt="Pic" className="img-thumbnail collapse" width="140" height="140"  type="video/mp4" id = "media-to-send"/>
        </div>
    )
}
export default SendVideo