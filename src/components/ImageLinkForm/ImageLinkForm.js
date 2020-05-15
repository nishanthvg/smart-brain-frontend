import React from 'react';
import './ImageLinkForm.css'
const ImageLinkForm = ({OnInputChange,OnButtonSubmit}) => {
    return (
        <div >
            <p className ="f3">
                {'This magic brain will detect faces. Give it a try'}
            </p>
            <div className = 'center'>
            <div className = 'form center pa3 br4 shadow-3'>
                <input className = 'f4  w-70 center' type ='text' onChange = {OnInputChange} />
                <button className = 'w-30 grow f4 link  dib white bg-light-purple' onClick = {OnButtonSubmit}>Detect</button>
            </div>
            </div>  
        </div>
    )
}

export default ImageLinkForm;
