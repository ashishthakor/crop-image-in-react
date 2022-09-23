import { Slider, Typography, Button } from '@mui/material';
import React, { useState } from 'react'

const CropImage = () => {
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [rotation, setRotation] = useState<number>(0);

    const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null)
            setSelectedFile(URL.createObjectURL(event?.target?.files[0]));
    }
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
                    // onClick={showCroppedImage}
                    variant="contained"
                // color="primary"
                >
                    Show Result
                </Button>
            </div>
        </>
    )
}

export default CropImage;