import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ Array, onClick }) => (
    Array.map(
        ({id , webformatURL , type}) => {
            return(
            <li key={id} className="ImageGalleryItem">
                    <img src={webformatURL} alt={type} className="ImageGalleryItem-image" onClick={() => onClick(id)}/>
            </li>)
        }
    )
);

ImageGalleryItem.defaultProps = {
   Array: []
 };

 ImageGalleryItem.propTypes = {
    Array: PropTypes.array,
    onClick: PropTypes.func,
};

export default ImageGalleryItem;