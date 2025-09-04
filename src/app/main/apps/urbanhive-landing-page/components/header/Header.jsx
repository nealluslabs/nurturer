import React ,{useState}from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './header.css'
import Nav from '../nav/Nav'
import { setRecruiter,setDemo } from 'src/redux/reducers/auth.slice'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
/*import laptop from 'src/assets/images/laptop.svg'

import LoanSlider from './LoanSlider'*/



const DummyHeader = () => {

   const [input,setInput] = useState(1000)
   //const navigate= useNavigate()
   const history = useHistory()
  // const dispatch = useDispatch()

   const handleChange = (e) => {
    setInput(e.target.value);
   // console.log("this is coming from header,we are in header")
  };

  return (
    
   
    <header className="header-pm">
    <Nav/>
    <div className="container-pm header__container-1">
      

      <div className="headerExplainer">
         <h1 className="text-light" style={{marginBottom:"0rem",color:"white",fontWeight:"700",fontSize:"2.8rem"}}> Thoughtful Touches Without The Thinking</h1>
   
         
            <p className="text-light" style={{maxWidth:"50%",margin:"0 auto",marginBottom:"2rem",marginTop:"2rem",fontSize:"1.5rem",color:"white"}}>
              AI-powered nurturing that delivers timely,
              personal touchpoints—automatically. Stay top
              of mind with content your prospects actually
              care about, without the manual work
           </p>
        
   
           <div className="header-btn-placement" >
           
           
   
             {/* <button className="welcome-btn"
              
              style={{width:"180px",
              height:"50px",
              display:"inline-block",
              //backgroundColor: "#000000",
              backgroundColor: "#fff6bd",
              color:"black",
              padding:"0.75rem 1.2rem", 
              cursor:"pointer",
              borderRadius: "5px",
             
              textAlign: "center",
              marginTop: "3rem",
              fontSize: "1.4rem"}}
              
              onClick ={()=>{history.push('/login')}} >
                Login
              </button>*/}

              <button 
              onClick ={()=>{/*dispatch(setRecruiter(false));dispatch(setDemo(true));*/history.push('/login')}}
          style={{ 
            backgroundColor: "#fff6bd",
            color: 'black',
            padding: '10px 20px',
            borderRadius: '8px',
            textTransform: 'none', 
            '&:hover': {
              background: 'linear-gradient(to right, #5c0fb8, #a734ff)',
            },
          }}
        >
            
            Login
           </button>
     
              {/*<a href={'https://onerecruiter-recruiter.netlify.app/login'}>
              <button onClick ={()=>{/navigate('/login')}} className="btn">
                Recruiter
              </button>
     
              </a>*/}
            </div>

      </div>
     
    

    </div>
    </header>
    
  )
}

export default DummyHeader