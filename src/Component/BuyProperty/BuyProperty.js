import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import BProperty from './BProp/BProp.js';
import '../RentProperty/RentProperty.css'

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';

const serverUrl = process.env.REACT_APP_SERVER_URL;

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const PopularSection = ({ properties }) => {
  const groupedProperties = chunkArray(properties, 3);

  const swiperRef = useRef(null); // Create a ref to hold the swiper instance
  // Function to handle the next slide
  const goToNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  // Function to handle the previous slide
  const goToPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <section className="popular section" id="Rentpopular">
      <div className="container">
        <span className="section__subtitle">Best Choice</span>
        <h2 className="section__title">Properties for Rent<span>.</span></h2>

        {/* Swiper container with a ref to access swiper instance */}
        <Swiper
          ref={swiperRef} // Pass the ref here to access the swiper instance
          spaceBetween={32} // Space between slides
          grabCursor={true} // Enable grab cursor (useful for dragging)
          centeredSlides={true} // Center slides in the view
          slidesPerView="auto" // Automatically adjust the number of slides visible based on content size
          loop={true} // Infinite loop of slides
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {/* Swiper Slide with grouped properties */}
          {groupedProperties.map((group, index) => (
            <SwiperSlide key={index}>
              <div className="popular__container">
                {group.map((property) => (
                  <BProperty key={property.externalID} property={property} />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom navigation buttons */}
        <div
          className="swiper-button-next"
          onClick={goToNext} // Call the goToNext function on click
        >
          <i className="bx bx-chevron-right"></i>
        </div>
        <div
          className="swiper-button-prev"
          onClick={goToPrev} // Call the goToPrev function on click
        >
          <i className="bx bx-chevron-left"></i>
        </div>
      </div>
    </section>
  );
};

function BuyProperty() {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${serverUrl}/properties/list`, {
          params: {
            locationExternalIDs: '5002',
            purpose: 'for-sale',
            hitsPerPage: 6,
          },
        });
        setProperties(response.data.hits);
      } catch (err) {
        console.error('Error fetching property data:', err);
        setError('An error occurred while fetching property data');
      }
    };
    fetchProperties();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return <PopularSection properties={properties} />;
}

export default BuyProperty;
