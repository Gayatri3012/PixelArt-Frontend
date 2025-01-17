import React, { useContext, useState } from "react";
import './EditorContainer.css';
import { ImageContext } from "../store/image-context";
import axios from "axios";
import {ReactCrop, type Crop} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import ImagePreview from "./ImagePreview";
import LoadingSpinner from './LoadingSpinner'

export default function EditorContainer() {

    const [isLoading, setIsLoading] = useState(false)

    const [brighnessState, setBrightnessState] = useState(0);
    const [contrastState, setContrastState] = useState(0);
    const [saturationState, setSaturationState] = useState(5);
    const [rotationState, setRotationState] = useState(0);
    const [cropState, setCropState] = useState<Crop>({
        unit: 'px',
        x: 0, 
        y: 0,
        width: 0,
        height: 0
    })


    const {
        previewImage,
        smallPreviewImage,
        imageFormat,
        brightness, 
        contrast, 
        saturation, 
        updatePreviewImage, 
        updateSmallPreviewImage,
        updateBrightness,
        updateContrast,
        updateSaturation,
        updateRotation
    } = useContext(ImageContext);

    const [showBrightness, setShowBrightness] = useState<Boolean>(false); 
    const [showContrast, setShowContrast] = useState<Boolean>(false);
    const [showSaturation, setShowSaturation] = useState<Boolean>(false);
    const [showRotation, setShowRotation] = useState<Boolean>(false);
    const [showCrop, setShowCrop] = useState<Boolean>(false);

    const handleClickBrightness = () => {
        setShowContrast(false);
        setShowSaturation(false);
        setShowRotation(false);
        setShowBrightness(!showBrightness);
        setShowCrop(false);
    }

    const handleBrightnessChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        const brightnessNumber = parseInt(event.target?.value);
        updateBrightness(brightnessNumber)
        axios.post('https://pixelart-backend-t6lh.onrender.com/brightness',{ brightness: brightnessNumber })
        .then(response => {
            setBrightnessState(brightnessNumber);
            updateSmallPreviewImage(response.data.smallPreviewImage)
            return response.data.previewImage;
        }).then((preview)=>{
            updatePreviewImage(preview);

        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });
    }


    const handleClickContrast = () => {
        setShowContrast(!showContrast);
        setShowSaturation(false);
        setShowBrightness(false);
        setShowRotation(false);
        setShowCrop(false);
    }

    const handleContrastChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        const contrastNumber = parseInt(event.target?.value);
        updateContrast(contrastNumber);
        axios.post('https://pixelart-backend-t6lh.onrender.com/contrast',{contrast: contrastNumber })
        .then(response => {
            setContrastState(contrastNumber);
            updateSmallPreviewImage(response.data.smallPreviewImage)
            return response.data.previewImage;
        }).then((preview)=>{
            updatePreviewImage(preview);
        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });
    }
   

    const handleClickSaturation = () => {
        setShowContrast(false);
        setShowSaturation(!showSaturation);
        setShowBrightness(false);
        setShowRotation(false);
        setShowCrop(false);
    }

    const handleSaturationChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        const saturationNumber = parseInt(event.target?.value);
        updateSaturation(saturationNumber);
        axios.post('https://pixelart-backend-t6lh.onrender.com/saturation',{saturation: saturationNumber })
        .then(response => {
            setSaturationState(saturationNumber)
            updateSmallPreviewImage(response.data.smallPreviewImage)
            return response.data.previewImage;
        }).then((preview)=>{
            updatePreviewImage(preview);
        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });
    }


    const handleClickRotation = () => {
        setShowRotation(!showRotation);
        setShowContrast(false);
        setShowSaturation(false);
        setShowBrightness(false);
        setShowCrop(false);
    }

    const handleRotationChange = () => {

        var rotationNumber = rotationState + 90;
        if(rotationNumber === 360){
            rotationNumber = 0;
        }
        axios.post('https://pixelart-backend-t6lh.onrender.com/rotate',{rotation: rotationNumber})
        .then(response => {
            setRotationState(rotationNumber);
            updateSmallPreviewImage(response.data.smallPreviewImage)
            return response.data.previewImage;
        }).then((preview)=>{
            updatePreviewImage(preview);
        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });
    }

    const handleClickCrop = () => {
        setShowRotation(false);
        setShowContrast(false);
        setShowSaturation(false);
        setShowBrightness(false);
        setShowCrop(!showCrop);
    }

    const handleCropChange = (c: any) => {
        setCropState({
            unit: 'px',
            x: parseInt(c.x),
            y: parseInt(c.y),
            width: parseInt(c.width),
            height: parseInt(c.height)
        });
         
    }


    const onSaveAction = (action: string, value: any) => {

        setIsLoading(true)
        
        axios.post('https://pixelart-backend-t6lh.onrender.com/saveAction',{ action, value , isSmallScreen: window.innerWidth < 768})
        .then(response => {
            if(action === 'brightness'){
                updateBrightness(value);
                setShowBrightness(false);
            } else if(action === 'contrast'){
                updateContrast(value);
                setShowContrast(false);
            } else if(action === 'saturation'){
                updateSaturation(value);
                setShowSaturation(false);
            } else if(action === 'rotation'){
                updateRotation(value);
                setShowRotation(false);
            } else if(action === 'crop'){
                setShowCrop(false)
                updateSmallPreviewImage(response.data.smallPreviewImage)
            }
        
            return response.data.previewImage;
        }).then((preview)=>{
            updatePreviewImage(preview);
            setIsLoading(false)
        })
        .catch(error => {
            console.error('Error updating image:', error);
        });
    }


    return (
        <div className="editorContainer">

           {previewImage && <nav className="editorOptions">
                <li>
                    <button onClick={handleClickBrightness} className={`editorOptionButtons ${showBrightness ? 'selectedOption' : ''}`}>
                        {!showBrightness && <img src="/brightness.png" height={40} width={40} alt="" />}
                        {showBrightness && <img src="/brightness-selected.png" height={40} width={40} alt="" />}
                    </button>
                </li>
                <li>
                    <button onClick={handleClickContrast}  className={`editorOptionButtons ${showContrast ? 'selectedOption' : ''}`}>
                        {!showContrast && <img src="/contrast.png" height={40} width={40} alt="" />}
                        {showContrast && <img src="/contrast-selected.png" height={40} width={40} alt="" />}
                    </button>
                    </li>
                <li>
                    <button onClick={handleClickSaturation}  className={`editorOptionButtons ${showSaturation ? 'selectedOption' : ''}`}>
                        <img src="/saturation2.png" height={40} width={40} alt="" />
                    </button>
                </li>
                <li>
                    <button onClick={handleClickRotation}  className={`editorOptionButtons ${showRotation ? 'selectedOption' : ''}`}>
                       {!showRotation && <img src="/Rotate.png" height={40} width={40} alt="" />}
                       {showRotation && <img src="/rotate-selected.png" height={40} width={40} alt="" />}
                    </button>
                </li>
                <li>
                    <button onClick={handleClickCrop}  className={`editorOptionButtons ${showCrop ? 'selectedOption' : ''}`}>
                        {!showCrop && <img src="/crop.png" height={40} width={40} alt="" />}
                        {showCrop && <img src="/crop-selected.png" height={40} width={40} alt="" />}
                    </button>
                </li>
                
            </nav>}

            {!isLoading && <div className="imageAndRange">
                {previewImage && !showCrop && <ImagePreview 
                largePreview={previewImage} 
                smallPreview={typeof(smallPreviewImage) === 'string' ? smallPreviewImage : '' } 
                isForCrop={false}
                /> }

                
                {!previewImage && !showCrop && <div className="selectImageText">
                    <h3>Please select image for processing</h3>
                    <a href="/">Select Image</a>
                    </div>}
            
                {showBrightness && !isLoading && <div className="Range">
                    <p>Brightness</p>
                    <input type="range" min={-50} max={50}  value={brightness} onChange={handleBrightnessChange}/>
                    <div>
                        <button onClick={() => {
                            setShowBrightness(false);
                        }}><img src="/discardChanges.png" height={28} width={28} alt="" /></button>
                        <button onClick={() => onSaveAction('brightness', brighnessState)}>
                            <img src="/saveChanges.png" height={28} width={28} alt="" />
                            </button>
                    </div>
                </div>}
                {showContrast &&  !isLoading && <div className="Range">
                    <p>Contrast</p>
                    <input type="range" min={1} max={91} step={9} value={contrast} onChange={handleContrastChange}/>
                    <div>
                        <button onClick={() => {
                            setShowContrast(false);
                        }}><img src="/discardChanges.png" height={28} width={28} alt="" /></button>
                        <button onClick={() => onSaveAction('contrast', contrastState)}>
                        <img src="/saveChanges.png" height={28} width={28} alt="" />
                        </button>
                    </div>
                </div>}
                {showSaturation &&  !isLoading &&<div className="Range">
                    <p>Saturation</p>
                    <input type="range" min={0} max={100} step={2} value={saturation} onChange={handleSaturationChange}/>
                    <div>
                        <button onClick={() => {
                            setShowSaturation(false);
                        }}><img src="/discardChanges.png" height={28} width={28} alt="" /></button>
                        <button onClick={() => onSaveAction('saturation', saturationState/50)}>
                        <img src="/saveChanges.png" height={28} width={28} alt="" />
                        </button>
                    </div>
                </div>}
                {showRotation &&  !isLoading &&<div className="Range">
                    {/* <p>Rotate</p> */}
                    <button onClick={handleRotationChange} >
                        <img src="rotate-selected.png" alt="rotate" 
                        style={{height: '2rem', width: '2rem'}} 
                        
                        />
                    </button>
                    <div>
                        <button onClick={() => {
                            setShowRotation(false);
                        }}>
                            <img src="/discardChanges.png" height={28} width={28} alt="" />
                            </button>
                        <button onClick={() => onSaveAction('rotation', rotationState)}>
                        <img src="/saveChanges.png" height={28} width={28} alt="" />
                        </button>
                    </div>
                </div>}

                {showCrop && <div className="cropContainer">
                    <ReactCrop crop={cropState} 
                    className="cropArea" 
                    onChange={(c) => handleCropChange(c)}
                
                    >
                        <img  src={`data:image/${imageFormat};base64,${previewImage}`} alt="preview"  />
                    </ReactCrop>
                    <div className="cropActionButtons">
                        <button onClick={() => {
                            setShowCrop(false);
                        }}>
                            <img src="/discardChanges.png" height={28} width={28} alt="" />
                        </button>
                        <button onClick={() => onSaveAction('crop', cropState)}>
                        <img src="/saveChanges.png" height={28} width={28} alt="" />
                        </button>
                    </div>
                </div> 
                }
            </div>}
            {isLoading && <div className="loadingContainer">
                <LoadingSpinner />
            </div>}
        </div>
        
    )
}