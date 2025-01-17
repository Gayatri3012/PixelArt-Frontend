import React, { useEffect, useContext } from 'react';
import { ImageContext } from '../store/image-context';

interface ImageData {
    largePreview: string ,
    smallPreview: string ,
    isForCrop: Boolean
}

function ImagePreview({ largePreview, smallPreview , isForCrop}: ImageData) {
  const { imageFormat ,previewImage, updatePreviewImage} = useContext(ImageContext);

  useEffect(() => {
    if (window.innerWidth >= 768) { 
      updatePreviewImage(largePreview);
    } else {
      updatePreviewImage(smallPreview);
    }
  }, [largePreview, smallPreview]);

  let content;

  if(isForCrop){
    content = (
      <img src={`data:image/${imageFormat};base64,${previewImage}`} 
      alt='selected image'
      />
    )
  } else {
    content = (
      <img className='editingImage' src={`data:image/${imageFormat};base64,${previewImage}`} 
      height={500} width={500}
      alt='selected image'
      />
    )
  }

  return content;
 
}

export default ImagePreview;