import React, { useContext, useRef, useState } from "react";
import {useNavigate} from 'react-router-dom';
import './UploadImage.css';
import { ImageContext } from "./store/image-context";
import axios from "axios";
import { toast } from "react-toastify";

export default function UploadImage() {
    const [showInputBox, setShowinputBox] = useState(true)
    const [showInputImage, setShowInputImage] = useState(false)
    const FileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const {
        image, 
        updateWidth, 
        updateHeight, 
        updateImageFormat, 
        updateImageName, 
        updateImage, 
        updateSmallPreviewImage,  
        updatePreviewImage
    } = useContext(ImageContext);

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
       const newImage = event.target.files?.[0];
       if(newImage){
        updateImage(newImage);
        setShowinputBox(false);
        setShowInputImage(true)
       }  
    }

    const handleUploadImage = () => {
        if(image){
            updateImageName(image.name);

            const formData = new FormData();
            formData.append('image', image);

            axios.post('https://pixelart-backend-t6lh.onrender.com/upload',formData)
            .then(response => {
                updateImageName(response.data.imageName)
                updatePreviewImage(response.data.previewImage); 
                updateSmallPreviewImage(response.data.smallPreviewImage);
                return response.data.metaData;
            })
            .then(metaData => {
                updateImageFormat(metaData.format);
                return metaData;
            })
            .then(metaData => {
                updateWidth(metaData.width);
                updateHeight(metaData.height);
                toast.success('Image uploaded successfully!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                    progress: undefined,
                });
            })
           .then(() => {
                navigate('/editor');
            })
            .catch(error => {
                console.error('Error uploading image:', error);
                toast.error( 'Failed to upload image. Please try again.', {
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
            
        }
        
    }

  

    return  (
        <div className="uploadImageContainer">
            <p className='notice'>
                *Please note: Initial loading may take up to a minute due to hosting on platforms like Render, which go idle after 15 minutes of inactivity.
            </p>
            <div className="logo-and-name"> 
                <img className="logo" src='/logo2.png' alt="logo"/>
                <p style={{fontFamily: 'monospace'}}>PixelArt</p>
            </div>
        
            <div className="inputBox" >
            { showInputBox && <>
                <label htmlFor="file-upload"  className="custom-file-upload">
                    <img src="/upload-image.png" alt="upload logo"  />
                    <p>Click here to select image for processing</p>
                </label>
                <input 
                    type='file' 
                    id="file-upload" 
                    accept="image/*" 
                    ref={FileInputRef} 
                    required 
                    onChange={handleFileInput} 
                />
            </> }
                {showInputImage && image && <>
                    <p>Selected image</p>
                    <img src={URL.createObjectURL(image)} height={150}  width={150} alt='selected image'/>
                </>}

            </div> 
            <button id="uploadButton" onClick={handleUploadImage} disabled={!showInputImage}>Upload</button>

        </div>
    )
}