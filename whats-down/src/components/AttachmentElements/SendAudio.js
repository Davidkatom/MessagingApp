import { useState } from 'react';
const SendAudio = () => {
    var inProgress = false;
    var recorder = null;
    const [recording, setRecording] = useState();
    const recordAudio = () =>
        new Promise(async resolve => {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            const audioChunks = [];

            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            const start = () => mediaRecorder.start();

            const stop = () =>
                new Promise(resolve => {
                    mediaRecorder.addEventListener("stop", () => {
                        const audioBlob = new Blob(audioChunks);
                        const audioUrl = URL.createObjectURL(audioBlob);
                        const audio = new Audio(audioUrl);
                        const play = () => audio.play();
                        resolve({ audioBlob, audioUrl, play });
                        setRecording(audioUrl)
                        stream.getTracks().forEach(t => t.stop())
                    });

                    mediaRecorder.stop();
                });

            resolve({ start, stop });
        });


    const startRecording = async () => {        
        (async () => {
            var button = document.getElementById('record-button')
            if (!inProgress) {
                recorder = await recordAudio();
                recorder.start();
                inProgress = true;
                button.classList.add("recording")
                document.getElementById('close-button').classList.add('collapse');
            }
            else {
                await recorder.stop();
                inProgress = false;
                button.classList.remove("recording")
                document.getElementById('media-to-send').classList.remove('collapse');
                document.getElementById('send_button').classList.remove('collapse');
                document.getElementById('close-button').classList.remove('collapse');
            }
        })();
    }



    return (
        <div className="send-audio">
            <label className="input-group-text" id='audio'>Record voice message:</label>
            <button className="btn btn-primary" id="record-button" onClick={startRecording}>Record</button>
            <div>
                <audio controls src={recording} id='media-to-send' className='collapse'></audio>
            </div>
        </div>
    )
}
export default SendAudio;