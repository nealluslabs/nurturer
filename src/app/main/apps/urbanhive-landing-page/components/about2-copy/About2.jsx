import React from 'react'
import './about2.css'
import about2graphic from 'src/images/AI-agent-2.jpg'
import about2decor from 'src/images/about2decor.png'
import {AiOutlineArrowRight} from 'react-icons/ai'
//import { useNavigate } from 'react-router-dom'

const DummyAbout2 = () => {


//const navigate= useNavigate()


  return (

    <>


    <section id='about2'>
    <div className="container-hp about2__container" style ={{marginTop:"5rem"}}>
       


  
       

      <div className="about2Explainer">
      <h1 style={{fontWeight:"700",color:"#000",fontSize:"2.8rem"}}> Set It and Stay Top of Mind{/*<span className="text-accent">  get the Job! </span>*/}</h1>

         <p style={{fontSize:"1.8rem"}}>
         Effortless nurturing. Once set up, the system works for you—sending on your behalf with your sign-off. No writing, automatic scheduling, just nurturing made easy.
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


   {<div className='about2CTA'>
    
 
    <img  className='CTAboximg2' src={about2graphic} alt="search image"/>
    
       
        
  </div>}
      

        {/*<img style={{position:"absolute",bottom:"-3rem",left:"5rem",height:"300px"}}  className='about2__decor'  src={about2decor} />*/}
   
   
</div>



    </section>


</>
  )
}

export default DummyAbout2