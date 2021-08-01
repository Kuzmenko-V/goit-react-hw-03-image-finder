import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem =  ({id , webformatURL , onClick}) => (
            <li  className="ImageGalleryItem">
               <img src={webformatURL} id={id} alt="" className="ImageGalleryItem-image" onClick={onClick}/>
            </li>
);

ImageGalleryItem.defaultProps = {
//    Array: []
 };

 ImageGalleryItem.propTypes = {
    // Array: PropTypes.array,
    onClick: PropTypes.func,
};

export default ImageGalleryItem;