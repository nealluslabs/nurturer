import React from 'react'
import './about3.css'
//import mobileAndWeb from 'src/assets/images/mobile&web.png'
import officeresearch from 'src/images/5(2).png'
import {AiOutlineArrowRight} from 'react-icons/ai'
//import { useNavigate } from 'react-router-dom'

const DummyAbout3 = () => {


//const navigate= useNavigate()


  return (

    <div style={{marginBottom:"2rem"}}>


    <section id='about'>

    {/* <p style={{fontWeight:"700",fontSize:"3.5rem",color:"#40255F",paddingBottom:"1rem",paddingLeft:"0.8rem",paddingRight:"0.8rem",borderBottom:"1px solid #40255F",width:"max-content",margin:"0 auto",marginBottom:"2rem",marginTop:"3rem"}}> The Solution<span className="text-accent">  get the Job! </span></p> */}
    <div className="container-hp about__container" style ={{marginTop:"0rem"}}>
       


    {<div className='aboutCTA1'>
    
 
    <img  className='CTAboximg1' src={officeresearch} alt="search image"/>
    
       
        
        </div>}
       

      <div className="aboutExplainer">
      <h1 style={{fontWeight:"700",color:"#000",fontSize:"2.8rem"}}> Strike When the Timing’s Right{/*<span className="text-accent">  get the Job! </span>*/}</h1>

         <p style={{fontSize:"1.8rem"}}>
         Be seen as precise and not noise. Our system helps you identify the best moments to re-engage, making every ask feel natural, not random—like following up after a trigger event or before a key decision window.
        </p>

       {/*<div className = "about-btn-placement" >
        <button   onClick={()=>{navigate('/login')}} className="btn ">
           Get Started 
         </button>

         <p  onClick={()=>{navigate('/dashboard/home')}} className="btn-invisible" >See How It Works</p>
     </div>*/}


      </div>
     
     {/*<div className='aboutCTA'>
    
       <img  className='CTAbox' src={countPennies} alt="counting coins"/>
     

     <div className='clip-path-bottom-right'></div>
     <div className='clip-path-bottom-left'></div>
     <div className='clip-path-top-left'></div>
</div>*/}  



      

   
   
</div>

    </section>


</div>
  )
}

export default DummyAbout3