import React, { useState } from 'react'
import './footer.css'
import {BsLinkedin} from 'react-icons/bs'
import {FaInstagram, FaLinkedin} from 'react-icons/fa'



import { FaSquareFacebook } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

import { IconButton, InputAdornment, TextField } from '@mui/material'
//import Button from 'src/theme/overrides/Button'
import { useNavigate } from 'react-router-dom';
//import navIcon from '../../assets/navicon.svg'
import oneRecruiter from 'src/images/Cooler.png'




const Footer = () => {

  const [email,setEmail]  = useState('')
 /*const navigate = useNavigate()*/

  return (
    <footer>
      {/*< img src={navIcon} href="#" className='footer__logo'/>*/}

      <div className='permalinks'>
      
      <div className="footer-first" style={{position:"relative",top:"0.5rem"}}>
         
      <div /*onClick ={()=>{navigate('/home')}}*/ style={{fontSize:"1.6rem",color:"white",fontWeight:"900",/*color:"#E88B1E",*/cursor:"pointer"}}>
        {/*Snapplicant*/}
        {/* < img src={oneRecruiter}  style={{marginBottom:"0rem", height:"7rem",width:"10rem"}}  href="#" className='footer__logo'/>*/}
     Nurturer
      </div>
       <ul>
        <li>
          <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:"0.6rem",fontSize:"1.4rem"}}>
           hello@nurturer.ai

          </div>
          
          </li>
        
       
      </ul>
      </div>



      {/* <div className="footer-second">
     
      <ul >
      <li><a href="#">Products</a></li>
        <li><a href="#">Business</a></li>
        <li><a href="#">Recruiter</a></li>
        {/*<li><a href="#">AI interview Prep</a></li>*/}
       
      {/* </ul> */}
      {/* </div> */} 

      <div className="footer-third">
     
      <ul >
      <li><a href="#">Support</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">FAQ</a></li>
      
      </ul>
      </div>

      <div className="footer-last">
        
      <li style={{marginBottom:"1rem"}}>Get notified about news & offers</li>
      <ul>
        
        <li>

        <TextField style={{width:"22rem",borderRadius:"0%"}}
                      name="email footer"
                      required
                      placeholder={"Enter Email Address"}
                      type={ 'text'}
                      onChange={(e) => setEmail(e.target.value)}
                      
                      InputProps={{
                        
                        sx: { height: '2.5rem',
                        input: {
                          color: 'white', // actual input text
                          '::placeholder': {
                            color: 'white',
                            opacity: 1,
                          }
                        }
                        
                         },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton  style={{color:"#5146D4",backgroundColor:"white",width:"max-content",fontSize:"16px",borderRadius:"0%",paddingTop:"10px",paddingBottom:"10px",paddingLeft:"10px",paddingRight:"10px",marginRight:"1px",height:"1.5rem"}} edge="end">
                              Subscribe
                            </IconButton>
                          </InputAdornment>


                        ),
                      }}

                    
                     
                    />
        </li>
         
        
      </ul>
      </div>

      </div>

      <div className= "footer_divider"></div>


      <div className="footer__copyright">
       <p>
        &copy; 2025 All rights Reserved.
       </p>

       <div style={{display:"flex",justifyContent:"center",gap:"2rem"}}>
       <p>Terms and Conditions</p>
       <p>Privacy Policy</p>
       </div>

      </div>


    </footer>
  )
}

export default Footer