import FusePageSimple from '@fuse/core/FusePageSimple';
import { Link } from 'react-router-dom'


import {Typography,Icon,AppBar,Card,CardHeader,CardActions,CardContent,CardMedia,CssBaseline,Grid,Container} from '@material-ui/core';
import { styled,createTheme, ThemeProvider  } from '@mui/material/styles';
import {makeStyles} from  '@material-ui/core/styles';
import Stack from '@mui/material/Stack';

import { useState } from 'react';

import { Paper,Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';




import IconButton from '@mui/material/IconButton';

import AVTR1 from "../../../urbanhive-assets/brain.jpg" ;
import AVTR2 from "../../../urbanhive-assets/brain.jpg" ;

//import TNAIL1 from  "../../../urbanhive-assets/urbanhive-thumbnails/blank.png";
//import TNAIL2 from  "../../../urbanhive-assets/urbanhive-thumbnails/blank.png";
//import TNAIL3 from  "../../../urbanhive-assets/urbanhive-thumbnails/blank.png";
//import TNAIL4 from  "../../../urbanhive-assets/urbanhive-thumbnails/blank.png";
//import TNAIL5 from  "../../../urbanhive-assets/urbanhive-thumbnails/flutter-thumbnail.png";
//import TNAIL6 from  "../../../urbanhive-assets/urbanhive-thumbnails/flutter-thumbnail.png";
//import TNAIL7 from  "../../../urbanhive-assets/urbanhive-thumbnails/blank.png";
//import TNAIL8 from  "../../../urbanhive-assets/urbanhive-thumbnails/blank.png";
//import TNAIL9 from  "../../../urbanhive-assets/urbanhive-thumbnails/blank.png";


/*import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TheatersIcon from '@mui/icons-material/Theaters';*/


function SessionsCard() {

 

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#000000',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    }
     
  },
});

 /*page regulation states */
 const [page1,setPage1] = useState(true)
 const [page2,setPage2] = useState(false)
 const [page3,setPage3] = useState(false)
 const [page4,setPage4] = useState(false)
 const [page5,setPage5] = useState(false)
 
 /*page regulation states ending */

  /* PAGE HANDLER BUTTON SECTION */

  const page1Handler = () => {
    setPage1(true)
    setPage2(false)
    setPage3(false)
    setPage4(false)
    setPage5(false)
    
  } 

  const page2Handler = () => {
    setPage1(false)
    setPage2(true)
    setPage3(false)
    setPage4(false)
    setPage5(false)
    
  } 

  const page3Handler = () => {
    setPage1(false)
    setPage2(false)
    setPage3(true)
    setPage4(false)
    setPage5(false)
    
    
  } 


  const page4Handler = () => {
    setPage1(false)
    setPage2(false)
    setPage3(false)
    setPage4(true)
    setPage5(false)
    
    
    
  } 


  const page5Handler = () => {
    setPage1(false)
    setPage2(false)
    setPage3(false)
    setPage4(false)
    setPage5(true)
    
     
  } 
 /* PAGE HANDLER BUTTON SECTION CLOSING */




  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));



  return (
    <>
     <Container>
     <ThemeProvider theme={theme}>
      <CssBaseline/> 
        <Typography variant='h4' align="center" color="textPrimary" gutterBottom paragraph style={{marginTop:"4rem"}}> 
         Our Video Sessions
        </Typography>
        <hr style={{width:"1400px"}}/>
    {page1 &&
       <div className="space-x-10" >
        <Grid    style={{minWidth:"1000px"}}     
 className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full items-center justify-center m-10 space-x-4" >
       
       
        <Grid className="w-full" >
        <Card className='w-full'>
      <CardHeader
        avatar={
          <Avatar sx={{  }} aria-label="recipe">
            <img src={AVTR1}/>
          </Avatar>
        }
       
        title="BY: AKIN ADEYEMI"
        subheader="May 12, 2022"
      />
      <CardMedia
        component="img"
        height="170"
        image={AVTR1}
        alt="Paella dish"
      />
      <CardContent >
        <Typography variant="body2" color="text.secondary">
       <b>Mastering Basics in Swahili</b><br/>  (1 Hour Long).
        </Typography>
      </CardContent>
      
    </Card>

        </Grid>
       

        <Grid item xs={12} style={{marginLeft:"4rem",marginRight:"4rem"}} >
        <Typography variant='h5' align="center" color="textPrimary" gutterBottom paragraph> 
         <b>Mastering Basics in Swahili</b> 
        </Typography>
        <p style={{fontSize: '15px'}}>
        Designed to introduce students to the Swahili language. Learn essential vocabulary, greetings,
         and common phrases while exploring cultural insights. Perfect for beginners, this interactive
          course builds foundational skills in speaking, listening, and writing, helping you confidently 
          communicate in everyday Swahili situations.
        </p>
        </Grid>
        <Grid item xs={6} direction-xs-column>
         
          <Stack  spacing={6} >
          
          <Button variant="contained" color="primary" style={{height:"40px",fontSize:"13px",padding:"1rem" }}>
          
          <Icon className="text-20" >
             videocam
           </Icon>
             &nbsp;
             <a href="https://youtu.be/N3KLE4I3rNQ"  target="_blank" rel="noopener noreferrer" > <b>Watch</b>  </a>
            
          </Button>
          
         
          <Button variant="contained" color="primary" style={{height:"40px",fontSize:"13px",padding:"1rem"}}>
          <Icon className="text-20" >
            event
           </Icon>
             &nbsp;
            <Link to={'/apps/bookdev'} style={{textDecoration:'none',color:"white"}}> <b>Book Tutor</b>  </Link>
          </Button>
          
          <Stack className="flex items-center justify-center" spacing={1} direction="row"  style={{color:"#f2db05"}}>
             <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
          </Stack>
          
          
          </Stack>

         
        </Grid>
       
      </Grid>

      <hr style={{width:"1400px"}}/>
     
   
   
   <Grid style={{minWidth:"1000px"}}     
   className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full items-center justify-center m-10 space-x-4" >
       
         
   <Grid className="w-full" >
   <Card className='w-full'>
         <CardHeader
          avatar={
            <Avatar sx={{  }} aria-label="recipe">
              <img src={AVTR1}/>
            </Avatar>
          }
       
          title="BY: AKIN ADEYEMI"
          subheader="May 12, 2022"
         />
        <CardMedia
          component="img"
          height="170"
          image={AVTR1}
          alt="Paella dish"
        />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        <b>Numbers 1-100 in Yoruba</b><br/> Full Day Session (48 mins long).
        </Typography>
      </CardContent>
      
    </Card>

        </Grid>
      

        <Grid xs={12} style={{marginLeft:"4rem",marginRight:"4rem"}}>
        <Typography variant='h5' align="center" color="textPrimary" gutterBottom paragraph> 
         <b>Numbers 1-100 in Yoruba</b> 
        </Typography>
        <p style={{fontSize: '15px'}}>
        An entry-level class introducing students to counting in Yoruba. Learn to recognize,
         pronounce, and use numbers in daily contexts. This interactive course combines repetition,
          games, and practical examples to help you master Yoruba numerals while gaining cultural
           insights into their significance. Perfect for beginners!


        </p>
        </Grid>
        <Grid item xs={6} direction-xs-column>
         
          <Stack  spacing={6} >
         
          
          <Button variant="contained" color="primary" style={{height:"40px",fontSize:"13px",padding:"1rem" }}>
          <Icon className="text-20" >
             videocam
           </Icon>
             &nbsp;
             <a href="https://youtu.be/qP_dXkHoZ4M" target="_blank" rel="noopener noreferrer" >    <b>Watch</b> </a>
             
          </Button>
          
         
          <Button variant="contained" color="primary" style={{height:"40px",fontSize:"13px",padding:"1rem"}}>
          <Icon className="text-20" >
            event
           </Icon>
             &nbsp;
             <Link to={'/apps/bookdev'} style={{textDecoration:'none',color:"white"}}> <b>Book Tutor</b>  </Link>
          </Button>
          
          <Stack className="flex items-center justify-center" spacing={1} direction="row"  style={{color:"#f2db05"}}>
             <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
          </Stack>
          
          
          </Stack>

         
        </Grid>
       
      </Grid> 
    </div>
   }

{page2 &&
<>
      <div className="space-x-10" >
      <Grid  style={{minWidth:"1000px"}}         
className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full items-center justify-center m-10 space-x-4" >
     
     
      <Grid className="w-full" >
      <Card className='w-full'>
      <CardHeader
        avatar={
          <Avatar sx={{  }} aria-label="recipe">
            <img src={AVTR1}/>
          </Avatar>
        }
       
        title="BY: AKIN ADEYEMI"
        subheader="May 12, 2022"
      />
      <CardMedia
        component="img"
        height="170"
        image={AVTR1}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        <b>Zulu for Beginners

</b><br/>(35 mins long).
        </Typography>
      </CardContent>
      
    </Card>

        </Grid>
       

        <Grid xs={12} style={{marginLeft:"4rem",marginRight:"4rem"}} >
        <Typography variant='h5' align="center" color="textPrimary" gutterBottom paragraph> 
         <b>Zulu for Beginners

</b> 
        </Typography>
        <p style={{fontSize: '15px'}}>
        Dive into the basics of Zulu and build confidence in everyday conversations. This course covers 
        essential vocabulary, greetings, and simple sentence structures while exploring the cultural 
        richness of the Zulu language. Perfect for beginners eager to communicate effectively and appreciate
         South African heritage.
        </p>
        </Grid>
        <Grid item xs={6}  direction-xs-column>
         
          <Stack  spacing={6} >
         
          
          <Button variant="contained" color="primary" style={{height:"40px",fontSize:"13px",padding:"1rem" }}>
          <Icon className="text-20" >
             videocam
           </Icon>
             &nbsp;
             <a href="https://youtu.be/0_KwEWSCDqE" target="_blank" rel="noopener noreferrer">   <b>Watch</b> </a>
             
          </Button>
          

          <Button variant="contained" color="primary" style={{height:"40px",fontSize:"13px",padding:"1rem"}}>
          <Icon className="text-20" >
            event
           </Icon>
             &nbsp;
             <Link to={'/apps/bookdev'} style={{textDecoration:'none',color:"white"}}> <b>Book Tutor</b>  </Link>
          </Button>
          
          <Stack className="flex items-center justify-center"  spacing={1} direction="row"  style={{color:"#f2db05"}}>
             <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
          </Stack>
          
          
          </Stack>

         
        </Grid>
       
      </Grid>

      <hr style={{width:"1400px"}}/>
     
   
   
      <Grid   style={{minWidth:"1000px"}}         
className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full items-center justify-center m-10 space-x-4" >
     
     
      <Grid className="w-full" >
      <Card className='w-full'>
         <CardHeader
          avatar={
            <Avatar sx={{  }} aria-label="recipe">
              <img src={AVTR2}/>
            </Avatar>
          }
       
          title="BY: FAROUK AMOO"
          subheader="May 12, 2022"
         />
        <CardMedia
          component="img"
          height="170"
          image={AVTR1}
          alt="Paella dish"
        />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
       <b>Hausa Pronunciation Tips</b> <br/> (4 hours long)
        </Typography>
      </CardContent>
      
    </Card>

        </Grid>
      

        <Grid xs={12} style={{marginLeft:"4rem",marginRight:"4rem"}} >
        <Typography variant='h5' align="center" color="textPrimary" gutterBottom paragraph> 
         <b>Hausa Pronunciation Tips</b>
        </Typography>
        <p style={{fontSize: '15px'}}>
        Improve your Hausa speaking skills by mastering pronunciation. This course focuses on vowel
         harmony, tones, and difficult consonants, helping you speak clearly and confidently.
          With practical exercises and real-life examples, it’s designed for language enthusiasts aiming to sound natural in
        </p>
        </Grid>
        <Grid item xs={6}  direction-xs-column>
         
          <Stack  spacing={6} >
         
          
          <Button variant="contained" color="primary" style={{height:"40px",fontSize:"13px",padding:"1rem" }}>
          <Icon className="text-20" >
             videocam
           </Icon>
             &nbsp;
             <a href="https://www.youtube.com/watch?v=1Q7SKmZdnV4" target="_blank" rel="noopener noreferrer">   <b>Watch</b> </a>
             
          </Button>
         

          <Button variant="contained" color="primary" style={{height:"40px",fontSize:"13px",padding:"1rem"}}>
          <Icon className="text-20" >
            event
           </Icon>
             &nbsp;
             <Link to={'/apps/bookdev'} style={{textDecoration:'none',color:"white"}}> <b>Book Tutor</b>  </Link>
          </Button>
          
          <Stack className="flex items-center justify-center"  spacing={1} direction="row"  style={{color:"#f2db05"}}>
             <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
          </Stack>
          
          
          </Stack>

         
        </Grid>
       
      </Grid> 
      </div>
    </>
  
   }



{page3 &&
       <>
        {/* <div className="space-x-10" > */}
      <Grid     style={{minWidth:"1000px"}}     
className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full items-center justify-center m-10 space-x-4" >
     
     
      <Grid className="w-full" >
      <Card className='w-full'>
      <CardHeader
        avatar={
          <Avatar sx={{  }} aria-label="recipe">
            <img src={AVTR1}/>
          </Avatar>
        }
       
        title="BY: AKIN ADEYEMI"
        subheader="April 23rd, 2022"
      />
      <CardMedia
        component="img"
        height="170"
        image={AVTR1}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        <b>Tonal Differences in Igbo</b><br/>(25 mins long)
        </Typography>
      </CardContent>
      
    </Card>

        </Grid>
       

        <Grid xs={12} style={{marginLeft:"4rem",marginRight:"4rem"}}>
        <Typography variant='h5' align="center" color="textPrimary" gutterBottom paragraph> 
         <b>Tonal Differences in Igbo</b> 
        </Typography>
        <p style={{fontSize: '15px'}}>
        Understanding tones is key to mastering Igbo. This class delves into tonal variations and their impact
         on meaning, helping you identify and practice high, mid, and low tones. Strengthen your communication 
         skills with exercises that ensure clarity and accuracy in speaking and comprehension.
        </p>
        </Grid>
        <Grid item xs={6} direction-xs-column>
         
          <Stack  spacing={6} >
         
          
          <Button variant="contained" color="primary" style={{height:"40px",fontSize:"13px",padding:"1rem" }}>
          <Icon className="text-20" >
             videocam
           </Icon>
             &nbsp;
             <a href="https://youtu.be/75sQS5r1GPY" target="_blank" rel="noopener noreferrer">   <b>Watch</b> </a>
             
          </Button>
          
         
          <Button variant="contained" color="primary" style={{height:"40px",fontSize:"13px",padding:"1rem"}}>
          <Icon className="text-20" >
            event
           </Icon>
             &nbsp;
             <Link to={'/apps/bookdev'} style={{textDecoration:'none',color:"white"}}> <b>Book Tutor</b>  </Link>
          </Button>
          
          <Stack  className="flex items-center justify-center"  spacing={1} direction="row"  style={{color:"#f2db05"}}>
             <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
          </Stack>
          
          
          </Stack>

         
        </Grid>
       
      </Grid>

      <hr style={{width:"1400px"}}/>
     
   
   
      <Grid  style={{minWidth:"1000px"}}           
className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full items-center justify-center m-10 space-x-4" >
     
     
      <Grid className="w-full" >
      <Card className='w-full'>
         <CardHeader
          avatar={
            <Avatar sx={{  }} aria-label="recipe">
              <img src={AVTR1}/>
            </Avatar>
          }
       
          title="BY: AKIN ADEYEMI"
          subheader="April 19th, 2022"
         />
        <CardMedia
          component="img"
          height="170"
          image={AVTR1}
          alt="Paella dish"
        />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        <b>Expressing Respect in Twi</b><br/>(18 mins long)
        </Typography>
      </CardContent>
      
    </Card>

        </Grid>
      

        <Grid xs={12} style={{marginLeft:"4rem",marginRight:"4rem"}}>
        <Typography variant='h5' align="center" color="textPrimary" gutterBottom paragraph> 
         <b>Expressing Respect in Twi</b> 
        </Typography>
        <p style={{fontSize: '15px'}}>
        Learn how to show respect in Twi through language and cultural practices. This course explores honorifics,
         polite expressions, and appropriate intonations, offering insights into Ghanaian traditions. Ideal for
          those wanting to communicate respectfully and build meaningful connections in Twi-speaking communities.
        </p>
        </Grid>
        <Grid item xs={6} direction-xs-column>
         
          <Stack  spacing={6} >
         
          
          <Button variant="contained" color="primary" style={{height:"40px",fontSize:"13px",padding:"1rem" }}>
          <Icon className="text-20" >
             videocam
           </Icon>
             &nbsp;
             <a href="https://youtu.be/akid1fziH_8" target="_blank" rel="noopener noreferrer"> <b>Watch</b> </a>
             
          </Button>
         

          <Button variant="contained" color="primary" style={{height:"40px",fontSize:"13px",padding:"1rem"}}>
          <Icon className="text-20" >
            event
           </Icon>
             &nbsp;
             <Link to={'/apps/bookdev'} style={{textDecoration:'none',color:"white"}}> <b>Book Tutor</b>  </Link>
          </Button>
          
          <Stack className='flex justify-center items-center' spacing={1} direction="row"  style={{color:"#f2db05"}}>
             <Icon fontSize="medium" >
                star
              </Icon> 
              <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
          </Stack>
          
          
          </Stack>

         
        </Grid>
       
      </Grid> 
    </>
   }


{page4 &&
       <>
       <Grid   style={{minWidth:"1000px"}}       
className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full items-center justify-center m-10 space-x-4" >
     
     
      <Grid className="w-full" >
      <Card className='w-full'>
      <CardHeader
        avatar={
          <Avatar sx={{  }} aria-label="recipe">
            <img src={AVTR1}/>
          </Avatar>
        }
       
        title="BY: AKIN ADEYEMI"
        subheader="April 19th, 2022"
      />
      <CardMedia
        component="img"
        height="170"
        image={AVTR1}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        <b>Expressions in Shona</b><br/> (32 mins long).
        </Typography>
      </CardContent>
      
    </Card>

        </Grid>
       

        <Grid xs={12} style={{marginLeft:"4rem",marginRight:"4rem"}}>
        <Typography variant='h5' align="center" color="textPrimary" gutterBottom paragraph> 
         <b>Expressions in Shona</b>
        </Typography>
        <p style={{fontSize: '15px'}}>
        Discover key phrases and expressions in Shona to enhance your conversational skills. This class 
        introduces idiomatic expressions, greetings, and commonly used sayings while providing cultural
         context. A great starting point for anyone eager to engage with Zimbabwean culture and connect with Shona speakers.
        </p>
        </Grid>
        <Grid item xs={6} direction-xs-column>
         
          <Stack  spacing={6} >
         
          
          <Button variant="contained" color="primary" style={{height:"40px",fontSize:"13px",padding:"1rem" }}>
          <Icon className="text-20" >
             videocam
           </Icon>
             &nbsp;
             <a href="https://youtu.be/aa-cQp5wKU0" target="_blank" rel="noopener noreferrer">  <b>Watch</b> </a>
             
          </Button>
          

          <Button variant="contained" color="primary" style={{height:"40px",fontSize:"13px",padding:"1rem"}}>
          <Icon className="text-20" >
            event
           </Icon>
             &nbsp;
             <Link to={'/apps/bookdev'} style={{textDecoration:'none',color:"white"}}> <b>Book Tutor</b>  </Link>
          </Button>
          
          <Stack className="flex items-center justify-center" spacing={1} direction="row"  style={{color:"#f2db05"}}>
             <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
          </Stack>
          
          
          </Stack>

        </Grid>      
      </Grid> 
      <hr style={{width:"1400px"}}></hr>
      <Grid  style={{minWidth:"1000px"}}      
className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full items-center justify-center m-10 space-x-4 " >
     
     
      <Grid className="w-full" >
      <Card className='w-full'>
      <CardHeader
        avatar={
          <Avatar sx={{  }} aria-label="recipe">
            <img src={AVTR1}/>
          </Avatar>
        }
       
        title="BY: AKIN ADEYEMI"
        subheader="April 19th, 2022"
      />
      <CardMedia
        component="img"
        height="170"
        image={AVTR1}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        <b>Common Proverbs in Amharic</b><br/> (32 mins long).
        </Typography>
      </CardContent>
      
    </Card>

        </Grid>
       

        <Grid xs={12} style={{marginLeft:"4rem",marginRight:"4rem"}}>
        <Typography variant='h5' align="center" color="textPrimary" gutterBottom paragraph> 
         <b>Common Proverbs in Amharic</b>
        </Typography>
        <p style={{fontSize: '15px'}}>
        Unlock the wisdom of Amharic proverbs and their cultural significance. This course introduces commonly
         used sayings, their meanings, and applications in daily life. Enrich your understanding
          of Ethiopian culture while enhancing your conversational and interpretative skills in the Amharic language.
        </p>
        </Grid>
        <Grid item xs={6} direction-xs-column>
         
          <Stack  spacing={6} >
         
          
          <Button variant="contained" color="primary" style={{height:"40px",fontSize:"13px",padding:"1rem" }}>
          <Icon className="text-20" >
             videocam
           </Icon>
             &nbsp;
             <a href="https://youtu.be/aa-cQp5wKU0" target="_blank" rel="noopener noreferrer">  <b>Watch</b> </a>
             
          </Button>
          

          <Button variant="contained" color="primary" style={{height:"40px",fontSize:"13px",padding:"1rem"}}>
          <Icon className="text-20" >
            event
           </Icon>
             &nbsp;
             <Link to={'/apps/bookdev'} style={{textDecoration:'none',color:"white"}}> <b>Book Tutor</b>  </Link>
          </Button>
          
          <Stack className="flex items-center justify-center" spacing={1} direction="row"  style={{color:"#f2db05"}}>
             <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
              <Icon fontSize="medium" >
                star
              </Icon>
          </Stack>
          
          
          </Stack>

         
        </Grid>
       
      
     
   
   
  
       
      </Grid> 

      
    </>
    
   }
      <hr style={{width:"1400px"}}/>
      
      {/* BUTTON NAVIGATION FOR MULTIPLE PAGES */}
      
      <Grid container justifyContent="center" columnSpacing={1} style={{marginTop:"1rem",marginBottom:"1rem"}} >
      <Button variant="contained" color="primary" onClick={page1Handler} style={{height:"40px",fontSize:"13px",padding:"1rem",marginLeft:"1rem",marginRight:"1rem"}}>
         
             &nbsp;
             <b>1</b>
          </Button>

          <Button variant="contained" color="primary" onClick={page2Handler}  style={{height:"40px",fontSize:"13px",padding:"1rem",marginLeft:"1rem",marginRight:"1rem"}}>
          
             &nbsp;
             <b>2</b>
          </Button>

          <Button variant="contained" color="primary" onClick={page3Handler}  style={{height:"40px",fontSize:"13px",padding:"1rem",marginLeft:"1rem",marginRight:"1rem"}}>
          
             &nbsp;
             <b>3</b>
          </Button>

          <Button variant="contained" color="primary" onClick={page4Handler}  style={{height:"40px",fontSize:"13px",padding:"1rem",marginLeft:"1rem",marginRight:"1rem"}}>
          
          &nbsp;
          <b>4</b>
       </Button>
      {/* <Button variant="contained" color="primary" onClick={page5Handler}  style={{height:"40px",fontSize:"13px",padding:"1rem",marginLeft:"1rem",marginRight:"1rem"}}>
          
          &nbsp;
          <b>5</b>
       </Button>
           */ }
     
     </Grid>
     </ThemeProvider>
     </Container>
    </>
  );




}

export default SessionsCard;
