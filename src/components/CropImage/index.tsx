import { Slider, Typography, Button, Stack } from '@mui/material';
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
            console.log('done', { croppedImage })
            setCroppedImage(croppedImage)
        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels, rotation, selectedFile])
    // console.log("selectedFile", selectedFile);
    console.log("rotation", rotation);
    return (
        <>
            <Stack justifyContent="center" alignItems="center" direction="column" spacing={2}>

                <input
                    accept="image/*"
                    multiple={false}
                    type="file"
                    onChange={(event) => fileChangeHandler(event)}
                />
                <Stack >
                    {selectedFile && <Stack position="relative" width={250} height={200} >
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
                    </Stack>}
                    <Stack direction="column">
                        <Stack>

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
                        </Stack>
                        <Stack>

                            <Typography
                                variant="overline"
                            >
                                Zoom
                            </Typography>
                            <Slider
                                value={zoom}
                                min={1}
                                max={5}
                                step={1}
                                aria-labelledby="Zoom"
                                onChange={(e, zoom) => setZoom(Number(zoom))}
                            />
                        </Stack>
                        <Button
                            onClick={showCroppedImage}
                            variant="contained"
                        // color="primary"
                        >
                            Show Result
                        </Button>
                    </Stack>
                </Stack>
                <Stack width={400} height={300} >
                    {/* {console.log("cropped Images", croppedImage)} */}
                    {croppedImage && <img height="100%" width="100%" src={croppedImage} alt="cropped" />}
                </Stack>
            </Stack>

        </>
    )
}

export default CropImage;