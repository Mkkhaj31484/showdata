import React, { useState, useEffect,useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/Summary.css'

const Summary = () => {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [data,setData] = useState([])
    const [user,setUser] = useState([])


    const onChange =(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
         }

    const handleOnClick=(e)=>{
        e.preventDefault();
        closeRef.current.click();
        localStorage.setItem('user',JSON.stringify(user));
        
       }

       const ref = useRef(null);
const closeRef = useRef(null);

const modal = ()=>{
    ref.current.click('toggle');
}
    useEffect(() => {
        axios.get('https://api.tvmaze.com/search/shows?q=all')
            .then(response => {
                // Set the fetched data to the state
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); 

    useEffect(() => {
        const matchedShow = data.find(item => item.show.id.toString() === id);// matched show with id
        setShow(matchedShow);
    }, [id, data]); 


    return (<>

<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

{/* button for useref */}

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Book Tickets for this show</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
    <div className="mb-3">
      <label htmlFor="title" className="form-label">Name  of Show : </label>
      <input type="text" className="form-control" id="title"  name='title' aria-describedby="emailHelp" onChange={onChange}/>
      
    </div>
    <div className="mb-3">
      <label htmlFor="description" className="form-label">Number of Tickets</label>
      <input type="text" className="form-control" id="description"  name='numtickets' onChange={onChange}/>
    </div>
    <div className="mb-3">
      <label htmlFor="tag" className="form-label">Location For</label>
      <input type="text" className="form-control" id="tag"  name='location' onChange={onChange}/>
    </div>
   
  </form>
      </div>
      <div className="modal-footer">
        <button  ref = {closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button  type="button" className="btn btn-primary" onClick={handleOnClick}>Submit</button>
      </div>
    </div>
  </div>
</div>
        <div className=''>
            <div className='summary-parent'>
                <div className='Summary-item'>
                    <h2 className='Summary-item h2'>Summary of the show</h2>
                    {show && (
                        <div>
                            <img className='Summary-item img' style={{width:520, height:500}} src={show.show.image.medium} alt={show.show.name} />
                            <div className='Summary-item p'>
                            {show.show.summary}
                            </div>
                        </div>
                    )}

                    <div className='btn'>
                        <button className='btn-o' onClick={modal}>Book Tickets</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Summary;
