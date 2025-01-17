import React from "react";
import { useContext } from "react";
import './Editor.css';
import { ImageContext } from "./store/image-context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditorContainer from "./components/EditorContainer";
import { toast } from "react-toastify";

export default function Editor(){
    const navigate = useNavigate();
    const {
        imageFormat, 
        previewImage,   
        updateBrightness,
        updateContrast, 
        updateRotation, 
        updateSaturation
    } = useContext(ImageContext);

    const handleCancel = () => {
        // axios.post('http://localhost:8080/cancel',{isSmallScreen: (window.innerWidth >= 768) ? false : true})
        // .then(response => {
        //    console.log(response);
        // })
        updateBrightness(0);
        updateContrast(0);
        updateSaturation(0);
        updateRotation(0);
        navigate('/');
       
    }

    const handleDownload = () => {
        axios.post('https://pixelart-backend-t6lh.onrender.com/download', {isSmallScreen: (window.innerWidth >= 768) ? false : true})
        .then(response => {

            const a = document.createElement('a');
            a.href = `data:image/jpeg;base64,${response.data.downloadImage}`; 
            a.download = `downloaded_image.${imageFormat}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            toast.success('Image downloaded successfully!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored',
                progress: undefined,
            });
        }).catch(error => {
            console.error('Error downloading image:', error);
            toast.error( 'Failed to download image. Please try again.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: 'colored',
                progress: undefined,
            });
        });
        navigate('/');
    }

    return <div className="editor">
            <div className="headerNav">
                <div className="logo-container"> 
                    <a href="/">
                        <img className="logo" src='/logo2.png' alt="logo"/>
                        <h1 style={{fontFamily: 'monospace'}}>PixelArt</h1>
                    </a>
                </div>
                <div className="actionButtons">
                    <button id="closeButton" onClick={handleCancel}>Close</button>
                    {previewImage && <button id="downloadButton" onClick={handleDownload}><>
                    <img src="/download.png" alt="logo" />
                    <p>Save</p> 
                    </></button>}
                </div> 
            </div>
                <EditorContainer />
           
            
        </div>
        
}