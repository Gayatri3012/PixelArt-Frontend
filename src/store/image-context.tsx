import React, { createContext , useState} from "react";

interface ImageContext {
    image: File | null;
    width: number;
    height: number;
    imageFormat: string | undefined;
    imageName: string | undefined;
    previewImage: string | undefined;
    smallPreviewImage: string | undefined;
    brightness: number;
    contrast: number;
    saturation: number;
    rotation: number;
    updateImage: (newImage: File) => void;
    updateWidth: (width: number) => void,
    updateHeight: (height: number) => void,
    updateImageFormat: (formatInfo: string) => void;
    updateImageName: (newName: string) => void;
    updatePreviewImage: (newPreview: string) => void;
    updateSmallPreviewImage: (newSmallPreview: string) => void;
    updateBrightness: (brightness: number) => void;
    updateContrast: (contrast: number) => void;
    updateSaturation: (saturation: number) => void;
    updateRotation: (rotation: number) => void;

}

export const ImageContext = createContext<ImageContext>({
    image:  null,
    width: 0,
    height: 0,
    imageFormat: undefined,
    imageName: undefined,
    previewImage: undefined,
    smallPreviewImage: undefined,
    brightness: 100,
    contrast: 2,
    saturation: 100,
    rotation: 0,
    updateImage: () => {},
    updateWidth: () => {},
    updateHeight: () => {},
    updateImageFormat: () => {},
    updateImageName: () => {},
    updatePreviewImage: () => {},
    updateSmallPreviewImage:() => {},
    updateBrightness: () => {},
    updateContrast: () => {},
    updateSaturation: () => {},
    updateRotation: () => {},
});



export default function ImageContextProvider({children}: {children: React.ReactNode}) {

    const [image, setImage] = useState<File | null>(null);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [imageFormat, setImageFormat] = useState<string | undefined>(undefined);
    const [imageName, setImageName] = useState<string | undefined>(undefined)
    const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
    const [smallPreviewImage, setSmallPreviewImage] = useState<string | undefined>(undefined);
    const [brightness, setBrightness] = useState<number>(0);
    const [contrast, setContrast] = useState<number>(0);
    const [saturation, setSaturation] = useState<number>(0);
    const [rotation, setRotation] = useState<number>(0);
  
    const updateImage = (newImage: File) => {
        setImage(newImage);
        setWidth(0);
        setHeight(0);
        setImageName('');
        setBrightness(1);
        setContrast(2);
        setSaturation(100);
        setRotation(0);
    }

    const updateImageFormat = (formatInfo: string) => {
        setImageFormat(formatInfo);
    }

    const updateWidth = (width: number) => {
        setWidth(width);
    }

    const updateHeight = (height: number) => {
        setHeight(height);
    }



    const updateImageName = (newName: string) => {
        setImageName(newName)
    }

    const updatePreviewImage = (newPreview :string) => {
        setPreviewImage(newPreview);
    }

    const updateSmallPreviewImage = (newSmallPreview: string) => {
        setSmallPreviewImage(newSmallPreview);
    }

    const updateBrightness = (brightness: number) => {
        setBrightness(brightness)
    }

    const updateContrast = (contrast: number) => {
        setContrast(contrast)
    }

    const updateSaturation = (saturation: number) => {
        setSaturation(saturation)
    }

    const updateRotation = (rotation: number) => {
        setRotation(rotation)
    }
    const ctxValue = {
        image,
        width,
        height,
        imageFormat,
        imageName,
        previewImage,
        smallPreviewImage,
        brightness,
        contrast,
        saturation,
        rotation,
        updateImage,
        updateWidth,
        updateHeight,
        updateImageFormat,
        updateImageName,
        updatePreviewImage,
        updateSmallPreviewImage,
        updateBrightness,
        updateContrast,
        updateSaturation,
        updateRotation
    }

    return (
        <ImageContext.Provider value={ctxValue}>
        {children}
        </ImageContext.Provider>
    )
    
}