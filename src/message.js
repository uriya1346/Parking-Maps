import React from 'react';
import "./message.css";
import {FaMap} from 'react-icons/fa'

function Message(props){
    return(
        <div className='message' >
            <h1><span style={{fontSize:"3vh", padding:"8px"}}><FaMap/></span>Welcome to Parking App<span style={{fontSize:"3vh", padding:"8px"}}><FaMap/></span></h1>
            <h4>here you can see all information about parking places in Tel-Aviv</h4>
            <button onClick={ () => {
                let message = document.querySelector(".message")
                message.style.display ="none"
            }} className='btn'>GO!</button>
        </div> 
    )
}

export default Message