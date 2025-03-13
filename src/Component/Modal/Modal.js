import React from 'react';
import axios from 'axios';
import millify from 'millify';
import './Modal.css';

const serverUrl = process.env.REACT_APP_SERVER_URL;

function Modal({ show, onClose, property }) {
  if (!show) return null; // Don't render if modal is closed

  const handleSaveToFavorites = async () => {
    console.log("🔵 Button Clicked");
    console.log('Server URL:', serverUrl); // This should log the correct value

    if (!property || !property.title || !property.coverPhoto?.url || !property.price || !property.description) {
        alert('Invalid property data.');
        console.error('❌ Property is missing:', property);
        return;
    }


    try {
        const propertyId = property.externalID;

        if (!propertyId) {
            console.error("❌ Property ID is missing!", property);
            alert("Error: Missing property ID!");
            return;
        }

        // Save propertyId to localStorage
        localStorage.setItem('propertyId', propertyId);
        console.log("🔒 Property ID saved to localStorage:", propertyId);

        // Check if serverUrl is available
        if (!serverUrl) {
            console.error("❌ Server URL is not defined. Please check your environment variables.");
            alert("Error: Server URL is not defined!");
            return;
        }

        // Construct URL and check before making the request
        const url = `${serverUrl}/addProperty`;
        console.log("🛠️ Sending request to URL:", url);

        const response = await axios.post(url, {
            name: property.title,
            image: property.coverPhoto?.url,
            price: property.price,
            details: property.description
        });


        console.log("📝 Request Body:", {
          name: property.title,
          image: property.coverPhoto?.url,
          price: property.price,
          details: property.description
        });

        
        console.log("✅ Property saved successfully:", response.data);
        alert("🎉 Property added to favorites!");
        onClose(); // Close modal after saving
    } catch (error) {
        console.error('❌ Error adding property:', error.response ? error.response.data : error.message);
        alert('Failed to add property to favorites. Please try again.');
    }
};



  return (
    <div className="custom-modal-overlay" onClick={onClose}>
      <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
        {property && (
          <div>
            <img src={property.coverPhoto?.url} alt={property.title} className="Bp__img1" />
            <h2 className="popular__price"><span>$</span>Price: {millify(property.price)}</h2>
            <h2 className="popular__title1">{property.title}</h2>
            <p className="Bp__description">{property.description}</p>
          </div>
        )}
        <div className="modal-footer">
          <button onClick={handleSaveToFavorites} className="favoriteModal__card-button">
            Add to Favorite
          </button>
          <button onClick={onClose} className="Modal__card-button">Close</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
