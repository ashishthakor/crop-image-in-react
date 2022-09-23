import React, { useState } from 'react'

const CropImage = () => {
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null)
            setSelectedFile(URL.createObjectURL(event?.target?.files[0]));
    }
    // console.log("selectedFile", selectedFile);
    return (
        <>
            <input
                accept="image/*"
                multiple={false}
                type="file"
                onChange={(event) => fileChangeHandler(event)}
            />
            <div className='input-image'>
                
            </div>
        </>
    )
}

export default CropImage;