import React from 'react'
import './about.css'
import mobileAndWeb from 'src/images/3(1).png'
import {AiOutlineArrowRight} from 'react-icons/ai'
//import { useNavigate } from 'react-router-dom'

const DummyAbout = () => {


//const navigate= useNavigate()


  return (

    <>


    <section id='about' >

    <p style={{fontWeight:"700",fontSize:"3.5rem",color:"#000",paddingBottom:"1rem",paddingLeft:"0.8rem",paddingRight:"0.8rem",borderBottom:"1px solid #40255F",width:"max-content",margin:"0 auto",marginBottom:"2rem",marginTop:"3rem"}}> The Solution{/*<span className="text-accent">  get the Job! </span>*/}</p>
    <div className="container-hp about__container" style ={{marginTop:"2rem",}}>
       


    {<div className='aboutCTA1'>
    
 
    <img  className='CTAboximg1' src={mobileAndWeb} alt="search image"/>
    
       
        
        </div>}
       

      <div className="aboutExplainer">
      <h1 style={{fontWeight:"700",color:"#000",fontSize:"2.8rem"}}> Every Touchpoint is Personal{/*<span className="text-accent">  get the Job! </span>*/}</h1>

         <p style={{fontSize:"1.8rem"}}>
         Be different by showing you care. Every touchpoint is about the prospect—not your product. Share helpful and AI-powered relevant articles, 
         timely insights, holiday cards, and meaningful notes that build trust.
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


</>
  )
}

export default DummyAbout