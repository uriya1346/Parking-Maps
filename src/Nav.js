import React, { useState } from 'react';
import {AiOutlineHome} from 'react-icons/ai'
import {AiOutlineUser} from 'react-icons/ai'
import {BiBook} from 'react-icons/bi'
import {RiServiceLine} from 'react-icons/ri'
import './nav.css'

function Nav(props){
    let setStyle = props.setStyle
    const [activeNav, setActiveNav] = useState('#')
    return(
        <nav>
        <button onClick={ () => {
          setActiveNav('#')
          setStyle("mapbox://styles/mapbox/streets-v11")
        }
        } className={activeNav === '#' ? 'active' : ''}><AiOutlineHome/></button>
        <button onClick={() => {
            setActiveNav('#satellite')
            setStyle("mapbox://styles/gurgen8/cl02lbqvb000p14lakcg8t0s6")
        }
        } className={activeNav === '#satellite' ? 'active' : ''}><AiOutlineUser/></button>
        <button onClick={() => {
            setActiveNav('#dark')
            setStyle("mapbox://styles/mapbox/dark-v10")
        }
        } className={activeNav === '#dark' ? 'active' : ''}><BiBook/></button>
        <button 
    onClick={() => {
        setActiveNav('#light')
        setStyle("mapbox://styles/mapbox/light-v10")
    }
    } className={activeNav === '#light' ? 'active' : ''}><RiServiceLine/></button>
    </nav>
    )
}

export default Nav