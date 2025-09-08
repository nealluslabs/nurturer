import React from 'react'
import './nav.css'
import {AiOutlineHome} from "react-icons/ai"
import {AiOutlineUser} from "react-icons/ai"
import {BiBook} from "react-icons/bi"
import {RiServiceLine} from "react-icons/ri"
import {BiMessageSquareDetail} from "react-icons/bi"
import {useState} from 'react'
//import navIcon from 'src/images/navicon.svg'
import navIcon from 'src/images/Group-2.png'
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa";

import HamburgerMenu from './HamburgerMenu'
//import { useNavigate } from 'react-router-dom'


const Nav = () => {
 
  const [activeNav,setActiveNav] = useState('#')
 //const navigate = useNavigate()
 
  return (

    <nav className='nav-pm'>
  
     <div className='navContainer' >
      <div style={{ display:"flex",width:"100%",justifyContent:"flex-start",alignItems:"center",paddingRight:"2rem",fontSize:"2rem",color:"white",fontWeight:"900"/*color:"#E88B1E"*/,marginLeft:"0rem"}}>
     
        <img src={navIcon} style={{width:"80px"}} alt="nurturer  logo"/>
        {/*<div style={{position:"relative",top:"2rem",left:"2rem"}}>
        Nurturer
        </div>*/}
        {/*<FaWpforms onClick={()=>{navigate('/create-job')}} style={{fontSize:"2.5rem",color:"white",cursor:"pointer"}} />*/}
      </div>
    
    
      {/*<div className='navLinks desktopDisp' >    
         <a href="/register" style={{width:"7rem"}} onClick={()=>{setActiveNav('#')}} className={activeNav === 'projects'? 'active':''} >Register</a>
         <a href="/login" style={{width:"7rem"}} onClick={()=>{setActiveNav('projects')}}className={activeNav === '#'? 'active':''}  >Login</a>
       
      </div> */} 

      <HamburgerMenu className="mobileDisp"/>

    </div>
    </nav>
  )
}

export default Nav