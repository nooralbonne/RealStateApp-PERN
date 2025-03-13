import React, { useState, useEffect } from "react";
import axios from "axios";
import millify from 'millify';
import "./FavPro.css";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function stripHtmlTags(html) {
    let tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

function truncateText(text, wordLimit) {
    const words = text.split(' ');
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
}

function Description({ text }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const strippedText = stripHtmlTags(text);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`favpro__description ${isExpanded ? 'expanded' : ''}`}>
            <p>
                {isExpanded ? strippedText : truncateText(strippedText, 20)}
            </p>
            <button onClick={toggleExpansion} className="favpro__toggle-btn">
                {isExpanded ? "See Less" : "See More"}
            </button>
        </div>
    );
}

function FavPro() {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const res = await axios.get(`${serverUrl}/getProperty`);
            setProperties(res.data);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`${serverUrl}/deleteProperty/${id}`);
            setProperties((prev) => prev.filter(prop => prop.id !== id));
        } catch (error) {
            console.error("Error deleting property:", error);
        }
    }

    return (

        <section className="favpro__section popular section container grid" id="Buypopular">
            <div className="favpro__container popular__container">
                <article className="favpro__card Bp__card">
                    <span className="favpro__subtitle section__subtitle">Your Choice</span>
                    <h2 className="favpro__title section__title">Favorite Properties<span>.</span></h2>
                    <div className="properties-list">
                        {properties.map(property => (
                            <div key={property.id} className="favpro__property property">
                                <div className="favpro__property-content property-content">
                                    <img src={property.image} alt={property.name} className="favpro__img Bp__img" />
                                    <h2 className="favpro__property-title popular__title">{property.name}</h2>
                                    <h2 className="favpro__property-price popular__price">
                                        <span>$</span>Price: ${millify(property.price)}
                                    </h2>
                                    <Description text={property.details} />
                                </div>
                                <button onClick={() => deleteItem(property.id)} className='favpro__delete-button favpro__card-button'>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </article>
            </div>
        </section>
    
    );
}

export default FavPro;
