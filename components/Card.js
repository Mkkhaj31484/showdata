import React, { useState, useEffect } from 'react';
import '../styles/Card.css'; 
import axios from 'axios'; // Import Axios for making HTTP requests


const Card = () => {
  const [shows, setShows] = useState([]); // State to store fetched shows data

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://api.tvmaze.com/search/shows?q=all')
      .then(response => {
        // Set the fetched data to the state
        setShows(response.data);
       
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to run the effect only once on component mount
  console.log(shows)

  return (
    <>
      <div className='text-center my-4'>Get Detailed Info about my show</div>
      <div className='flex card-grid'>
        {shows.map((show, index) => (
          <div key={index} className='card-container'>
            <div className='card'>
              <div className='card-element'>
                <label>Name</label>
                <input type='text' value={show.show.name} readOnly />
              </div>
              <div className='card-element'>
                <label>Status</label>
                <input type='text' value={show.show.status} readOnly />
              </div>
              <div className='card-element'>
                <label>Schedule</label>
                <input type='text' value={show.show.schedule?.days.join(', ')} readOnly />
              </div>
              <div className='card-element'>
                <label>Country</label>
                <input type='text' value={show.show.network?.country.name} readOnly />
              </div>
               <div className='summary-div'>
              <a  className='summary-botton' href={`/summary/${show.show.id}`}>Summary</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
