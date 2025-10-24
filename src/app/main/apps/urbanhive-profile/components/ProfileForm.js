import React, { useState, useEffect, useRef } from 'react'
import Controls from "./controls/Controls";
import { useForm, Form } from './useForm';
import { TextField,InputLabel, MenuItem, Select,Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {Avatar, Badge, Chip, Divider, Stack, Alert, IconButton,Button, CardMedia} from '@mui/material';
import { Crop } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import * as skillSetService from "./skillSetService";
import CropEasy from './crop/CropEasy';
import '../../app.css';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { resetMsg } from 'src/redux/reducers/profile.slice';
import { fb, static_img } from 'config/firebase';
import { createNewProfile, duplicateToContacts, uploadNewImage,batchUploadContacts } from 'redux/actions/profile.action';
import Papa from "papaparse";
import { ToastContainer, toast } from 'react-toastify';
import './profile.css'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
 
} from "@mui/material";


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  
  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));
  


const isTechnical = [
    { id: 'yes', title: 'Yes' },
    { id: 'no', title: 'No' },
]

const type = [
    { id: 'Beginner', title: 'Beginner' },
    { id: 'Expert', title: 'Expert' },
]



export default function ProfileForm() {
    const nodeRef = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const { user } = useSelector((state) => state.login);
    const { profileData, isLoading, error, message } = useSelector((state) => state.profile);
    const [showError, setshowError] = useState(false);
    const [showError2, setshowError2] = useState(false);
    const [file, setFile] = useState(null);
    const [githubUrl, setGithubUrl] = useState(profileData.githubUrl);
    const [triggers, setTriggers] = useState(profileData.triggers||[]);
    const [interests, setInterests] = useState(profileData.interests||[]);
    const [justSubmitted, setJustSubmitted] = useState(false);
  const [hasTypedSinceSubmit, setHasTypedSinceSubmit] = useState(false);

  const [justSubmitted2, setJustSubmitted2] = useState(false);
  const [hasTypedSinceSubmit2, setHasTypedSinceSubmit2] = useState(false);

    const [photoURL, setPhotoURL] = useState(profileData.photoUrl !== '' ? profileData.photoUrl : '');
    // const [photoURL, setPhotoURL] = useState(null);
    const [openCrop, setOpenCrop] = useState(false);


    const [selectedFile, setSelectedFile] = useState({selectedFile: [], selectedFileName: []});
 

  const handleselectedFile = event => {
    setSelectedFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
    setFile(event.target.files[0]);
    setPhotoURL(URL.createObjectURL(event.target.files[0]));
};



    const [inputValue, setInputValue] = useState("");
    const [inputValue2, setInputValue2] = useState("");

    const [newState,setNewState]=useState(null)
const [newCities,setNewCities]=useState([])
const [oldStates,setOldStates]=useState([])

useEffect(()=>{

skillSetService.getCities(newState)

setNewCities(skillSetService.getCities(newState))

//console.log("what is cities NOW ??",skillSetService.getCities(newState && newState))

},[newState])




const notifySkip = (message) => toast.error(message, {
  position: "bottom-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  });

  const notifyInvite = (message) => toast.success(message, {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

      /*CSV FUNCTIONALITY  AND IT'S HELPERS*/


      const [parsedData, setParsedData] = useState([]); // store rows from CSV
      const [open, setOpen] = useState(false); // dialog open state

      const isValidOption = (options, value) =>{
        //console.log("INSIDE VALID OPTIONS NOW, WHAT IS THE CSV FILE SAYING?-->",value)
        options.some((opt) => opt.title.toLowerCase() === value.toLowerCase());
      }

      const handleClose = () => setOpen(false);
  

   
    
      



      const handleCSVUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
      
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (!results || !results.data || results.data.length === 0) {
              alert("CSV file is empty or invalid");
              return;
            }
      
            // list of required text fields
            const textFields = [
              "name",
              "email",
              "notes",
              "jobTitle",
              "industry",
              "frequency",
              "city",
              "phone",
              "state",
              "interests", // uncomment later
              "triggers",
              "companyName",
              "workAnniversary",
              "birthday",
            ];
      
            // ✅ validate headers
            const csvHeaders = results.meta.fields || [];
            const missingHeaders = textFields.filter(
              (field) => !csvHeaders.includes(field)
            );
      
           // if (missingHeaders.length > 0) {
           //   alert(`Missing required headers in CSV: ${missingHeaders.join(", ")}`);
           //   return;
           // }
      
            // helper function to validate frequency
            const validateFrequency = (value) => {
              if (!value) return "1 month"; // default if missing
              const regex = /^(\d{1,2})\s*months?$/i; // e.g. "3 month" or "3 months"
              const match = value.match(regex);
      
              if (match) {
                const num = parseInt(match[1], 10);
                if (num >= 1 && num <= 12) {
                  // normalize to singular/plural properly
                  return num === 1 ? "1 month" : `${num} months`;
                }
              }
              // fallback
              return "1 month";
            };

            //TRYING TO PROCESS FIELDS NOW
        try{
            // ✅ process all rows
            const requiredFields = ["name", "city", "state", "email", "companyName", "jobTitle"];
           
            const processedData = results.data.map((row, index) => {
              // Check all required fields before doing anything else
              const missingField = requiredFields.find(field => !row[field] || row[field].trim() === "");
            
              if (missingField) {
                alert(`Error in row ${index + 1}: "${missingField}" is missing.\nPlease make sure all rows have a value.`);
                throw new Error(`Row ${index + 1} missing ${missingField}`);
              }
            
              const cleanedRow = {};
            
              textFields.forEach((field) => {
                if (field === "frequency" && row[field]) {
                  cleanedRow[field] = validateFrequency(row[field].trim());
                } else {
                  cleanedRow[field] = row[field];
                }
              });
            
              return cleanedRow;
            });
      
            //console.log("Processed CSV rows:", processedData);
            setParsedData(processedData); // store all rows in state
      
            // ✅ open dialog after parsing
            setOpen(true);

           }
            catch (err) {
              console.error(err.message);
              return; // stop further processing
            }


          },
        });
      };
      ;
      
      
  
  
      /**CSV FUNCTIONALITY END AND ITS HELPERS END */

    const handleKeyDown = (e) => {
      if (e.key === "Enter" && inputValue.trim() !== "") {
        e.preventDefault(); // prevent form submission
        if (triggers && !triggers.includes(inputValue.trim())) {
          setTriggers([...triggers, inputValue.trim()]);
        }
        setInputValue(""); // clear field
        setJustSubmitted(true);
      setHasTypedSinceSubmit(false);
      }
    };

    const handleKeyDown2 = (e) => {
      if (e.key === "Enter" && inputValue2.trim() !== "") {
        e.preventDefault(); // prevent form submission
        if (interests && !interests.includes(inputValue2.trim())) {
          setInterests([...interests, inputValue2.trim()]);
        }
        setInputValue2(""); // clear field
        setJustSubmitted2(true);
        setHasTypedSinceSubmit2(false);
      }
    };
  
    const handleDelete = (triggerToDelete) => {
      setTriggers((prev) => prev.filter((t) => t !== triggerToDelete));
    };

    const handleDelete2 = (interestToDelete) => {
      setInterests((prev) => prev.filter((t) => t !== interestToDelete));
    };
  
  

    const initialFValues = {
      //id: user.uid,
      notes: profileData.notes == '' ? '' : profileData.notes,
     // skills_needed: profileData.skills_needed == '' ? '' : profileData.skills_needed,
     // isTechnical: profileData.isTechnical == '' ? 'nil' : profileData.isTechnical,
     // lookingFor: profileData.lookingFor == '' ? 'nil' : profileData.lookingFor,
      city: profileData.city == '' ? '' : profileData.city,
      state: profileData.state == '' ? '' : profileData.state,
      //triggers: profileData.triggers && profileData.triggers.length ===0   ? [] : profileData.triggers,
      frequency: profileData.frequency == '' ? '' : profileData.frequency,
      jobTitle:profileData && profileData.jobTitle && profileData.jobTitle == '' ? '' : profileData.jobTitle,
      //interests: profileData.interests == '' ? '' : profileData.interests,
      industry: profileData.industry == '' ? '' : profileData.industry,
      companyName: profileData.companyName == '' ? '' : profileData.companyName,
      name: profileData.name == '' ? '' : profileData.name,
      email: profileData.email == '' ? '' : profileData.email,
      phone: profileData.phone  ? profileData.phone :'' ,
      birthday: profileData.birthday == '' ? '' : profileData.birthday,
      workAnniversary: profileData.workAnniversary == '' ? '' : profileData.workAnniversary,
      //skillset: profileData.skillset == '' ? '' : profileData.skillset,
      // hireDate: new Date(),
      // isPermanent: false,
  }


  const clearingValues = {
    //id: user.uid,
    notes: '',
   // skills_needed: profileData.skills_needed == '' ? '' : profileData.skills_needed,
   // isTechnical: profileData.isTechnical == '' ? 'nil' : profileData.isTechnical,
   // lookingFor: profileData.lookingFor == '' ? 'nil' : profileData.lookingFor,
    city: '',
    state: null,
    //triggers: profileData.triggers && profileData.triggers.length ===0   ? [] : profileData.triggers,
    frequency: '',
    jobTitle:'',
    //interests: profileData.interests == '' ? '' : profileData.interests,
    industry: '',
    companyName: '',
    name: '',
    email:'',
    phone: '' ,
    birthday: '',
    workAnniversary: '',
    //skillset: profileData.skillset == '' ? '' : profileData.skillset,
    // hireDate: new Date(),
    // isPermanent: false,
}



    const handleChange = (e) => {
        const fileNew = e.target.files[0];

        if (fileNew) {

          if (!/\.(jpg|jpeg|png|gif|webp)$/i.test(fileNew.name)) {
            alert("Unsupported image format");
            return;
          }
  
          setFile(fileNew);
          setPhotoURL(URL.createObjectURL(fileNew));
          setOpenCrop(true);
        }
      };


      // cleanup - this is important apparently
useEffect(() => {
  return () => {
    if (photoURL) URL.revokeObjectURL(photoURL);
  };
}, [photoURL]);


      const handleTriggerChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
    
        // Case 1: Empty triggers, first time typing
        if (triggers.length === 0) {
          setTriggers([value]);
          return;
        }
    
        // Case 2: Just submitted with Enter, this is first keypress
        if (justSubmitted && !hasTypedSinceSubmit) {
          setTriggers([...triggers, value]);
          setHasTypedSinceSubmit(true);
          return;
        }
    
        // Case 3: Normal typing, update last item
        const updated = [...triggers];
        updated[updated.length - 1] = value;
        setTriggers(updated);
      };


      const handleInterestChange = (e) => {
        const value = e.target.value;
        setInputValue2(value);
    
        // Case 1: Empty interests, first time typing
        if (interests.length === 0) {
          setInterests([value]);
          return;
        }
    
        // Case 2: Just submitted with Enter, this is first keypress
        if (justSubmitted2 && !hasTypedSinceSubmit2) {
          setInterests([...interests, value]);
          setHasTypedSinceSubmit2(true);
          return;
        }
    
        // Case 3: Normal typing, update last item
        const updated = [...interests];
        updated[updated.length - 1] = value;
        setInterests(updated);
      };
    
  
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
          temp.name = fieldValues.name ? "" : "This field is required."
        if ('email' in fieldValues)
          temp.email = fieldValues.email ? "" : "This field is required."
        if ('companyName' in fieldValues)
          temp.companyName = fieldValues.companyName ? "" : "This field is required."
      
     //   if ('notes' in fieldValues)
     //       temp.notes = fieldValues.notes ? "" : "This field is required."
      // if ('skillset' in fieldValues)
      //      temp.skillset = fieldValues.skillset.length != 0 ? "" : "This field is required."
       if ('city' in fieldValues)
            temp.city = fieldValues.city.length != 0 ? "" : "This field is required."
       if ('jobTitle' in fieldValues)
        temp.jobTitle = fieldValues.jobTitle &&  fieldValues.jobTitle.length != 0 ? "" : "This field is required."
       if ('state' in fieldValues)
        temp.state = fieldValues.state && fieldValues.state.length != 0 ? "" : "This field is required."
      
      // if ('frequency' in fieldValues)
      //  temp.frequency = fieldValues.frequency && fieldValues.frequency.length != 0 ? "" : "This field is required."
     //  if ('birthday' in fieldValues)
     //   temp.birthday = fieldValues.birthday && fieldValues.birthday.length != 0 ? "" : "This field is required."
     //  if ('workAnniversary' in fieldValues)
     //   temp.workAnniversary = fieldValues.workAnniversary && fieldValues.workAnniversary.length != 0 ? "" : "This field is required."
    //   if ('industry' in fieldValues)
    //    temp.industry = fieldValues.industry &&  fieldValues.industry.length != 0 ? "" : "This field is required."
    //   if ('interests' in fieldValues)
    //    temp.interests =fieldValues.interests &&   fieldValues.interests.length != 0 ? "" : "This field is required."
      // if ('skills_needed' in fieldValues)
      //      temp.skills_needed = fieldValues.skills_needed.length != 0 ? "" : "This field is required."
        // if ('email' in fieldValues)
        //     temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        // if ('mobile' in fieldValues)
        //     temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault();
       //console.log('Photo URL: ', photoURL);
       //console.log('File URL: ', file);

       
      

        e.preventDefault()
       // if(values.isTechnical == 'nil'){
       //   setshowError(true);
       // }else{
       //   setshowError(false);
       // }
       // if(values.lookingFor == 'nil'){
       //   setshowError2(true);
       // }else{
       //   setshowError2(false);
       // }


        
    if (validate() /*&& triggers.length > 0 && interests.length > 0*/){
          const name = values.name;
          const email = values.email;
          const phone = values.phone;
           const notes = values.notes;
           const city = values.city;
           const companyName = values.companyName;
           const jobTitle = values.jobTitle;
           const state = values.state;
           //const triggers = values.triggers;
           //const interests = values.interests;
           const industry = values.industry;
           const frequency = values.frequency;
           const birthday = values.birthday;
           const workAnniversary = values.workAnniversary;
           
          const profile = { notes, frequency, city, jobTitle,state,triggers, /*interests,*/ companyName,industry,name,email,phone,birthday,workAnniversary};
          ////console.log('Logged User: ', fb.auth().currentUser.uid);
          //console.log("profile ABOUT TO BE SENT IN -->",profile)

          if(!file){
          dispatch(createNewProfile({...profile,triggers,interests}, user, file, resetForm, photoURL,notifyInvite,notifySkip,setValues,clearingValues,setInterests,setTriggers,setNewState));
          }else{
            dispatch(uploadNewImage({...profile,triggers,interests}, user, file, resetForm,notifyInvite,notifySkip,setValues,clearingValues,setInterests,setTriggers,setNewState));
            //dispatch(createNewProfile(profile, user, file, resetForm, photoURL));
          } 
        }/*else if(interests.length === 0 ||triggers.length === 0 ){
          if(interests.length === 0){
          
            notifySkip("Please make sure you have added interests before submitting!")
            return
          }
  
  
  
           if(triggers.length === 0){
            
            notifySkip("Please make sure you have added triggers before submitting!")
            return
          }

          
        }*/else {
          notifySkip("Please make sure you have filled in all fields!")
        }
    }

    return !openCrop ? (
        <Form onSubmit={handleSubmit}>
           <ToastContainer
              position="bottom-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
      {/*error && <div><Alert
        severity="error" color="error"
        action={
          <Button color="inherit" size="small" style={{ fontSize: '15px' }} onClick={() => {dispatch(resetMsg())}}>
            <b>X</b>
          </Button>
        }
      >
        <p style={{ fontSize: '11px' }}><b>{error}</b></p>
      </Alert><br/></div>
      /*}

      {/*message && <div><Alert
        severity="success" color="success"
        action={
          <Button color="inherit" size="small" style={{ fontSize: '15px' }} onClick={() => {dispatch(resetMsg())}}>
            <b>X</b>
          </Button>
        }
      >
        <p style={{ fontSize: '11px' }}><b>{message}</b></p>
      </Alert><br/></div>
      */}
            


             {/* Material UI Dialog */}
      <Dialog open={open} onClose={handleClose}  maxWidth="md" fullWidth>
        <DialogTitle  style={{fontSize:"1.6rem"}}>CSV Data Preview</DialogTitle>
        <DialogContent>
          <Typography  style={{fontSize:"1.4rem"}} variant="subtitle1" gutterBottom>
            Are you satisfied with these values?
          </Typography>

          {parsedData.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  {/* Render headers dynamically */}
                  {Object.keys(parsedData[0]).map((header) => (
                    <TableCell key={header}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {parsedData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {Object.values(row).map((value, i) => (
                      <TableCell style={{fontSize:"1.1rem"}} key={i}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography>No data found</Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Button variant="outlined" onClick={handleClose}
            

            sx={{
              backgroundColor: "#21C9CF",
              color: "white",
              height:"4.5rem",
              width:"11rem",
              fontSize:"1.6rem",
              padding: "0.5rem 0.8rem",
              borderRadius: "0.3rem",

              
              padding: '10px 20px',
              borderRadius: '8px',

              
              textTransform: "none", // Optional: keeps text as "CSV" without uppercase
              "&:hover": {
                backgroundColor: "#333"
              }
            }}
            
            >
              CANCEL
            </Button>
            <Button variant="contained"
            
            sx={{
              backgroundColor: "#21C9CF",
              color: "white",
              height:"4.5rem",
              width:"11rem",
              fontSize:"1.6rem",
              padding: "0.5rem 0.8rem",
              borderRadius: "0.3rem",

              
              padding: '10px 20px',
              borderRadius: '8px',

              
              textTransform: "none", // Optional: keeps text as "CSV" without uppercase
              "&:hover": {
                backgroundColor: "#333"
              }
            }}
            onClick={()=>{dispatch(batchUploadContacts(parsedData && parsedData,user,"https://nurturer.s3.eu-west-3.amazonaws.com/no-pic.png",setOpen,notifyInvite))  }}
            >
              UPLOAD
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

           
      <Grid container spacing={0} 
      className="csvapigrid"
            style={{display: "flex", alignItems:"center",position:"relative",top:{xs:"-3rem",sm:"0rem"},right:"0.5rem",marginBottom:"1.5rem",gap:{xs:"3rem",sm:"0rem"}}}>
           
            <Grid xs={5} item> 
            <p>Fill out contact details.</p><br/>
            </Grid>
              
            <Grid
            className="csvapiarea"
            xs={12} sm={5} container spacing={1} >
               <Grid item>
                 <Button  onClick={() => document.getElementById("csvInput").click()}
                   sx={{
                     backgroundColor: "#21C9CF",
                     color: "white",
                     height:"4.5rem",
                     width:"11rem",
                     fontSize:"1.6rem",
                     padding: "0.5rem 0.8rem",
                     borderRadius: "0.3rem",

                     
                     padding: '10px 20px',
                     borderRadius: '8px',
      
                     
                     textTransform: "none", // Optional: keeps text as "CSV" without uppercase
                     "&:hover": {
                       backgroundColor: "#333"
                     }
                   }}
                 >
                   CSV
                 </Button>
               </Grid>


                      <input
                     type="file"
                     id="csvInput"
                     accept=".csv"
                     style={{ opacity:"0",position:"absolute",height:"4.6rem",width:"11rem",backgroundColor:"pink" }}
                     onChange={handleCSVUpload}
                      />





               <Grid item>
                 <Button
                   sx={{
                     backgroundColor: "#21C9CF",
                     color: "white",
                      height:"4.5rem",
                     width:"11rem",
                     fontSize:"1.8rem",
                     padding: "0.5rem 0.8rem",
                     borderRadius: "0.3rem",

                     padding: '10px 20px',
                     borderRadius: '8px',
                     
                     textTransform: "none",
                     "&:hover": {
                       backgroundColor: "#333"
                     }
                   }}
                 >
                   API
                 </Button>
               </Grid>

            </Grid>

             </Grid>



            <Grid container spacing={4} sx={{display:"flex",justifyContent:"flex-start",flexDirection:"column",position:"relative",marginTop:"2rem",background:"pink"}}>
           
            
              <Grid item xs={12} sm={6} style={{marginTop:"1rem"}}>
                <Controls.Input
                
                        label="Name (Required)"
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                </Grid>

               

                <Grid item xs={12} sm={6} style={{marginTop:"1rem"}}>
                <Controls.Input
                        label="Email (Required)"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                </Grid>

            



                <Grid item xs={12} sm={6} style={{marginTop:"1rem"}}>
                <Controls.Input
                        label="Phone Number"
                        name="phone"
                        value={values.phone}
                        onChange={handleInputChange}
                        error={errors.phone}
                    />
                </Grid>


                <Grid item xs={12} sm={6}>
                <Controls.Input
                sx={{width:"53%"}}
                        name="notes"
                        label="Notes"
                        value={values.notes/*"I’m a native Swahili speaker passionate about helping others learn and improve their skills. I’m also learning Yoruba, so I understand the challenges of language learning. Let’s connect to practice conversation, share cultural insights, and support each other’s language goals!"*/}
                        onChange={handleInputChange}
                        error={errors.notes}
                        rows={2}
                        maxRows={4}
                    />
                </Grid>


                <Grid item xs={12} sm={6}>
                <Controls.Input
                        label="Job Title (Required)"
                        name="jobTitle"
                        value={values.jobTitle}
                        onChange={handleInputChange}
                        error={errors.jobTitle}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                <Controls.Select
                name="state"
                label="State (Required)"
                value={values.state||''}
                onChange={(e)=>{handleInputChange(e);setNewState(e.target.value);
                  //console.log("JUST SELECTED A STATE --->",e.target.value) 
                }}
                options={skillSetService.getStates()}
                error={errors.state}
                />

                </Grid>

             

                <Grid item xs={12} sm={6}>
                <Controls.Select
                 name="city"
                 label="City (Required)"
                 value={values.city}
                 onChange={handleInputChange}
                 options={newCities/*skillSetService.getCities(values.state && values.state.id)*/}
                 error={errors.city}
                 />
                </Grid>
              

                <Grid item xs={11} sm={6} style={{display:"flex",flexDirection:"column"}}>
                     {/* Text input */}
                   <TextField
                     label="Add Trigger (press 'Enter' to add)"
                     variant="outlined"
                     sx={{width:{sm:"80%",xs:"53%"}}}
                     style={{maxWidth:"27rem"}} //dont delete
                     value={inputValue}
                     onChange={handleTriggerChange}
                     onKeyDown={handleKeyDown}
                   />
             
                   {/* Chips for triggers */}
                   <Box sx={{ mt: 1, display:triggers &&triggers.length?"flex": "none", gap: 1, flexWrap: "wrap",border:triggers &&!triggers.length?"0px":"0.5px solid gray",width:"55%",height:"max-content" }}>
                     {triggers && triggers.map((trigger, index) => (
                      
                       <Chip
                         style={{width:"max-content",zIndex:"1000",color:"#21C9CF"}}
                         key={index}
                         label={trigger}
                         onDelete={() => handleDelete(trigger)}
                        
                         variant="outlined"
                         
                       />
                     
                     ))}
                   </Box>
                </Grid>


                <Grid item xs={12} sm={6}>
                <Controls.Input
                        label="Company Name (Required)"
                        name="companyName"
                        value={values.companyName}
                        onChange={handleInputChange}
                        error={errors.companyName}
                    />
                </Grid>



                <Grid item xs={12} sm={6}>
                <Controls.Input
                        label="Industry"
                        name="industry"
                        value={values.industry}
                        onChange={handleInputChange}
                       error={errors.industry}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                      <Controls.Select
                        name="frequency"
                        label="Frequency"
                        value={values.frequency}
                        onChange={handleInputChange}
                        options={skillSetService.getFrequency()}
                        error={errors.frequency}
                    />
                </Grid>

              


                {/*<Grid item xs={12} sm={6}>
                <Controls.Input
                        label="Interests"
                        name="interests"
                        value={values.interests}
                        onChange={handleInputChange}
                       
                    />
                    </Grid>*/}



                <Grid item xs={11} sm={6} style={{display:"flex",flexDirection:"column"}}>
                     {/* Text input */}
                   <TextField
                     label="Add Interest (press 'Enter' to add)"
                     variant="outlined"
                     sx={{width:{sm:"80%",xs:"53%",}
                    }}
                    style={{maxWidth:"27rem"}} //dont delete
                     value={inputValue2}
                     onChange={handleInterestChange}
                     onKeyDown={handleKeyDown2}
                   />
             
                   {/* Chips for interests */}
                   <Box sx={{ mt: 1, display:interests &&interests.length?"flex": "none", gap: 1, flexWrap: "wrap",border:interests &&!interests.length?"0px":"0.5px solid gray",width:"55%",height:"max-content" }}>
                     {interests && interests.map((interest, index) => (
                      
                       <Chip
                         style={{width:"max-content",zIndex:"1000",color:"black"}}
                         key={index}
                         label={interest}
                         onDelete={() => handleDelete2(interest)}
                        
                         variant="outlined"
                         
                       />
                     
                     ))}
                   </Box>
                </Grid>




                <Grid item xs={12} sm={6}>
                <TextField
                        label="Birthday"
                        name="birthday"
                        type="date"
                        value={values.birthday}
                        onChange={handleInputChange}
                         sx={{
                          width:{ xs:"80%",sm:'53%'},
                          //border:"1px solid #F5F5F5",
                          //padding:"10px",
                          borderRadius:"5px"
                        }}
                        style={{minWidth:"25rem"}}
                        InputProps={{
                          sx: { fontSize: '1.3rem' },
                        }}
                        InputLabelProps={{
                          sx: { fontSize: '1.3rem' },
                          shrink: true,
                        }}
                      />
                </Grid>




                <Grid item xs={12} sm={6}>
                {/*<Controls.Input
                        label="Work Anniversary"
                        name="workAnniversary"
                        value={values.workAnniversary}
                        onChange={handleInputChange}
                        
                    />*/}

                    <TextField
                        label="Work Anniversary"
                        name="workAnniversary"
                        type="date"
                        value={values.workAnniversary}
                        onChange={handleInputChange}
                         sx={{
                          width:{ xs:"80%",sm:'53%'},
                          //border:"1px solid #F5F5F5",
                          //padding:"10px",
                          borderRadius:"5px"
                        }}
                        style={{minWidth:"25rem"}}
                        InputProps={{
                          sx: { fontSize: '1.3rem' },
                        }}
                        InputLabelProps={{
                          sx: { fontSize: '1.3rem' },
                          shrink: true,
                        }}
                      />
                </Grid>

               {/* <Grid item xs={12} sm={6}>
                <Controls.RadioGroup
                        name="lookingFor"
                        label="What are you looking for?"
                        value={values.lookingFor}
                        onChange={handleInputChange}
                        items={type}
                    />
                    {showError2 ? <p style={{color: 'red'}}>This field is required.</p> : ''}
             </Grid>*/}






        <Grid item xs={12} sm={6}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor="profilePhoto">
          <p>Upload your profile pic</p><br/>
            <input
              accept="image/*"
              id="profilePhoto"
              type="file"
              style={{ display: 'none' }}
              onChange={handleChange}
            />

        {/*
         <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <SmallAvatar alt="Remy Sharp" className='wave' src="/assets/icons/camera.png" />
        }
      >
        <Avatar
              src={photoURL == null ? 'assets/images/avatars/profile.jpg' : photoURL}
              sx={{ width: 75, height: 75, cursor: 'pointer' }}
            />
      </Badge>
      */}

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
          <CardMedia
            style={{ border: '0.2px solid black', backgroundColor: '#fff', width: '200px' }}
            component="img"
            height="100"
            width="150"
            image={ photoURL !== "" ? photoURL : 'assets/images/avatars/profile.jpg'}
            alt="IMG"
          />
          <Button component="label" variant="contained" 
           sx={{
            backgroundColor: "#21C9CF",
            color: "white",
             height:"4.5rem",
            width:"11rem",
            fontSize:"1.8rem",
            padding: "0.5rem 0.8rem",
            borderRadius: "0.3rem",
             marginTop:"1.5rem",
            padding: '10px 20px',
            borderRadius: '8px',
            
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#333"
            }
          }}
          >
            UPLOAD
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={handleselectedFile}
            />
          </Button>


          
        </div>
          </label>
          {/*file && (
            <IconButton
              aria-label="Crop"
              color="primary"
              onClick={() => setOpenCrop(true)}
            >
              <Crop />
            </IconButton>
          )*/}
        </Box>
         </Grid>


                </Grid>
                <br/>
        <Divider>
            <Chip label="😉 | 🔃" />
        </Divider>
            <Box 
                display="flex" 
                alignItems="center"
                justifyContent="center"
            >
                <div>
                <Controls.Button
                    type="submit"
                    disabled={isLoading}
                    text={isLoading ? 'Loading...' : 'Submit'} />
                <Controls.Button
                    text="Reset"
                    color="default"
                    onClick={resetForm} />
                </div>
                </Box>
        </Form>
     ) : (
        <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile }} />
      );
}
