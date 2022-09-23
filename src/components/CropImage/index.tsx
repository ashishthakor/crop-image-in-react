import { Slider, Typography, Button } from '@mui/material';
import React, { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../utils/getCropImage';

const CropImage = () => {
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [rotation, setRotation] = useState<number>(0);
    const [zoom, setZoom] = useState<number>(1);
    const [crop, setCrop] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState<any>(null)

    const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null)
            setSelectedFile(URL.createObjectURL(event?.target?.files[0]));
    }
    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])
    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                selectedFile,
                croppedAreaPixels,
                rotation
            )
            console.log('donee', { croppedImage })
            setCroppedImage(croppedImage)
        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels, rotation])
    // console.log("selectedFile", selectedFile);
    console.log("rotation", rotation);
    return (
        <>
            <input
                accept="image/*"
                multiple={false}
                type="file"
                onChange={(event) => fileChangeHandler(event)}
            />
            <div className='input-image'>
                <div style={{position: 'relative', height: 200, width: 250 }}>

                    <Cropper
                        image={selectedFile}
                        crop={crop}
                        rotation={rotation}
                        zoom={zoom}
                        aspect={4 / 3}
                        onCropChange={setCrop}
                        onRotationChange={setRotation}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        objectFit="horizontal-cover"
                    />
                </div>
                <Typography
                    variant="overline"
                >
                    Rotation
                </Typography>
                <Slider
                    value={rotation}
                    min={0}
                    max={360}
                    step={1}
                    aria-labelledby="Rotation"
                    onChange={(e, rotation) => setRotation(Number(rotation))}
                />
                <Button
                    onClick={showCroppedImage}
                    variant="contained"
                // color="primary"
                >
                    Show Result
                </Button>
            </div>
            <div style={{ height: "400px", width: "400px" }}>

                {console.log("cropped Images", croppedImage)}
                {croppedImage && <img height="100%" width="100%" src={croppedImage} alt="cropped" />}
            </div>
        </>
    )
}

export default CropImage;