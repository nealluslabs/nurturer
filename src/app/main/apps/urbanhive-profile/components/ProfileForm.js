import React, { useState, useEffect, useRef } from 'react'
import Controls from "./controls/Controls";
import { useForm, Form } from './useForm';
import { TextField,InputLabel, MenuItem, Select, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {Avatar, Badge, Chip, Divider, Stack, Alert, IconButton,Button } from '@mui/material';
import { Crop } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import * as skillSetService from "./skillSetService";
import CropEasy from './crop/CropEasy';
import '../../app.css';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { createProfile, fetchProfile, uploadImage } from 'src/redux/actions/profile.action';
import { resetMsg } from 'src/redux/reducers/profile.slice';
import { fb, static_img } from 'config/firebase';
import { createNewProfile, duplicateToContacts, uploadNewImage,batchUploadContacts } from 'redux/actions/profile.action';
import Papa from "papaparse";

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
    const [photoURL, setPhotoURL] = useState(profileData.photoUrl != '' ? profileData.photoUrl : user.photoUrl);
    // const [photoURL, setPhotoURL] = useState(null);
    const [openCrop, setOpenCrop] = useState(false);

    const [inputValue, setInputValue] = useState("");
    const [inputValue2, setInputValue2] = useState("");



      /*CSV FUNCTIONALITY  AND IT'S HELPERS*/


      const [parsedData, setParsedData] = useState([]); // store rows from CSV
      const [open, setOpen] = useState(false); // dialog open state

      const isValidOption = (options, value) =>{
        console.log("INSIDE VALID OPTIONS NOW, WHAT IS THE CSV FILE SAYING?-->",value)
        options.some((opt) => opt.title.toLowerCase() === value.toLowerCase());
      }

      const handleClose = () => setOpen(false);
  

   
    
      
      const handleCSVUploadOld = (event) => {
        const file = event.target.files[0];
        if (!file) return;
      
        Papa.parse(file, {
          header: true, // assumes first row is header (name,email,etc)
          skipEmptyLines: true,
          complete: (results) => {
            const row = results.data[0]; // take first row for simplicity, or loop over multiple
      
            // list of simple text fields
            const textFields = [
              "name",
              "email",
              "notes",
              "jobTitle",
              "industry",
              "interests",
               "triggers",
              "companyName",
              "workAnniversary",
              "birthday",
            ];
      
            // update simple text fields
            textFields.forEach((field) => {
              if (row[field]) {
                if (field === "triggers") {
                  // split by commas, trim each trigger
                  const triggerArray = row[field]
                    .split(",")
                    .map((t) => t.trim())
                    .filter((t) => t.length > 0);
      
                  setTriggers(triggerArray);
                }
                if (field === "interests") {
                  // split by commas, trim each trigger
                  const interestArray = row[field]
                    .split(",")
                    .map((t) => t.trim())
                    .filter((t) => t.length > 0);
      
                  setInterests(interestArray);
                }
                
                
                else {
                handleInputChange({
                  target: { name: field, value: row[field] },
                });
              }
               }
            });
      
            // check select fields (frequency, city, state)
            const selectMappings = {
              frequency:skillSetService.getCities ? skillSetService.getFrequency() : [],
              city: skillSetService.getCities ? skillSetService.getCities() : [],
              state: skillSetService.getStates ? skillSetService.getStates() : [],
            };

            console.log('WHAT IS OBJECT FIELDS SELECT MAPPINGS SEF--->',Object.keys(selectMappings))
      
            Object.keys(selectMappings).forEach((field) => {
              
              if (row[field] && isValidOption(selectMappings[field], row[field])) {
                
                handleInputChange({
                  target: { name: field, value:row[field] },
                });
              }
            });
          },
        });
      };



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
             // "frequency",
             // "city",
              //"state",
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
      
            if (missingHeaders.length > 0) {
              alert(`Missing required headers in CSV: ${missingHeaders.join(", ")}`);
              return;
            }
      
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
      
            // ✅ process all rows
            const processedData = results.data.map((row) => {
              const cleanedRow = {};
              textFields.forEach((field) => {
                if (row[field]) {
                  if (field === "triggers") {
                    cleanedRow[field] = row[field]
                      .split(",")
                      .map((t) => t.trim())
                      .filter((t) => t.length > 0);
                  } else if (field === "frequency") {
                    cleanedRow[field] = validateFrequency(row[field].trim());
                  } else {
                    cleanedRow[field] = row[field];
                  }
                } else {
                  // default values
                  cleanedRow[field] = field === "frequency" ? "1 month" : "";
                }
              });
              return cleanedRow;
            });
      
            console.log("Processed CSV rows:", processedData);
            setParsedData(processedData); // store all rows in state
      
            // ✅ open dialog after parsing
            setOpen(true);
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
      }
    };

    const handleKeyDown2 = (e) => {
      if (e.key === "Enter" && inputValue2.trim() !== "") {
        e.preventDefault(); // prevent form submission
        if (interests && !interests.includes(inputValue2.trim())) {
          setInterests([...interests, inputValue2.trim()]);
        }
        setInputValue2(""); // clear field
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
      birthday: profileData.birthday == '' ? '' : profileData.birthday,
      workAnniversary: profileData.workAnniversary == '' ? '' : profileData.workAnniversary,
      //skillset: profileData.skillset == '' ? '' : profileData.skillset,
      // hireDate: new Date(),
      // isPermanent: false,
  }



    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setFile(file);
          setPhotoURL(URL.createObjectURL(file));
          setOpenCrop(true);
        }
      };
    
    function handleChangeNew(){
        console.log('changed');
    }

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
          temp.name = fieldValues.name ? "" : "This field is required."
        if ('email' in fieldValues)
          temp.email = fieldValues.email ? "" : "This field is required."
        if ('companyName' in fieldValues)
          temp.companyName = fieldValues.companyName ? "" : "This field is required."
      
        if ('notes' in fieldValues)
            temp.notes = fieldValues.notes ? "" : "This field is required."
      // if ('skillset' in fieldValues)
      //      temp.skillset = fieldValues.skillset.length != 0 ? "" : "This field is required."
       if ('city' in fieldValues)
            temp.city = fieldValues.city.length != 0 ? "" : "This field is required."
       if ('jobTitle' in fieldValues)
        temp.jobTitle = fieldValues.jobTitle &&  fieldValues.jobTitle.length != 0 ? "" : "This field is required."
       if ('state' in fieldValues)
        temp.state = fieldValues.state && fieldValues.state.length != 0 ? "" : "This field is required."
      
       if ('frequency' in fieldValues)
        temp.frequency = fieldValues.frequency && fieldValues.frequency.length != 0 ? "" : "This field is required."
       if ('birthday' in fieldValues)
        temp.birthday = fieldValues.birthday && fieldValues.birthday.length != 0 ? "" : "This field is required."
       if ('workAnnniversary' in fieldValues)
        temp.workAnnniversary = fieldValues.workAnnniversary && fieldValues.workAnnniversary.length != 0 ? "" : "This field is required."
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
       console.log('Photo URL: ', photoURL);
       console.log('File URL: ', file);
        e.preventDefault()
        if(values.isTechnical == 'nil'){
          setshowError(true);
        }else{
          setshowError(false);
        }
        if(values.lookingFor == 'nil'){
          setshowError2(true);
        }else{
          setshowError2(false);
        }
        if (validate()){
          const name = values.name;
          const email = values.email;
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
           
          const profile = { notes, frequency, city, jobTitle,state,triggers, /*interests,*/ companyName,industry,name,email,birthday,workAnniversary};
          //console.log('Logged User: ', fb.auth().currentUser.uid);
          console.log("profile ABOUT TO BE SENT IN -->",profile)
          if(photoURL == static_img){
          dispatch(createNewProfile({...profile,triggers,interests}, user, file, resetForm, photoURL));
          }else{
            dispatch(uploadNewImage({...profile,triggers,interests}, user, file, resetForm));
            //dispatch(createNewProfile(profile, user, file, resetForm, photoURL));
          } 
        }
    }

    return !openCrop ? (
        <Form onSubmit={handleSubmit}>
      {error && <div><Alert
        severity="error" color="error"
        action={
          <Button color="inherit" size="small" style={{ fontSize: '15px' }} onClick={() => {dispatch(resetMsg())}}>
            <b>X</b>
          </Button>
        }
      >
        <p style={{ fontSize: '11px' }}><b>{error}</b></p>
      </Alert><br/></div>}

      {message && <div><Alert
        severity="success" color="success"
        action={
          <Button color="inherit" size="small" style={{ fontSize: '15px' }} onClick={() => {dispatch(resetMsg())}}>
            <b>X</b>
          </Button>
        }
      >
        <p style={{ fontSize: '11px' }}><b>{message}</b></p>
      </Alert><br/></div>}
            <p>Fill out contact details.</p><br/>


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
              backgroundColor: "#20dbe4",
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
              backgroundColor: "#20dbe4",
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
            onClick={()=>{dispatch(batchUploadContacts(parsedData && parsedData,user,"https://nurturer.s3.eu-west-3.amazonaws.com/no-pic.png"))  }}
            >
              UPLOAD
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

           

            <Grid container spacing={4} style={{position:"relative",marginTop:"2rem"}}>

            <Grid container spacing={0} style={{ display: "flex", justifyContent: "space-between" ,position:"absolute",top:"-8rem",right:"0.5rem",width:"23rem",flexDirection:"row",marginBottom:"1.5rem"}}>
               <Grid item>
                 <Button  onClick={() => document.getElementById("csvInput").click()}
                   sx={{
                     backgroundColor: "#20dbe4",
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
                     backgroundColor: "#20dbe4",
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

            <Grid item xs={12} sm={6} style={{marginTop:"1rem"}}>
                <Controls.Input
                        label="Name"
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                </Grid>

               

                <Grid item xs={12} sm={6} style={{marginTop:"1rem"}}>
                <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
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
                <Controls.Select
                        name="city"
                        label="City"
                        value={values.city}
                        onChange={handleInputChange}
                        options={skillSetService.getCities()}
                        error={errors.city}
                    />
                </Grid>
              
                <Grid item xs={12} sm={6}>
                <Controls.Input
                        label="Job Title"
                        name="jobTitle"
                        value={values.jobTitle}
                        onChange={handleInputChange}
                        error={errors.jobTitle}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                      <Controls.Select
                        name="state"
                        label="State"
                        value={values.state}
                        onChange={handleInputChange}
                        options={skillSetService.getStates()}
                        error={errors.state}
                    />
                </Grid>


                <Grid item xs={6} sm={6} style={{display:"flex",flexDirection:"column"}}>
                     {/* Text input */}
                   <TextField
                     label="Add Trigger"
                     variant="outlined"
                    style={{width:"53%"}}
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     onKeyDown={handleKeyDown}
                   />
             
                   {/* Chips for triggers */}
                   <Box sx={{ mt: 1, display:triggers &&triggers.length?"flex": "none", gap: 1, flexWrap: "wrap",border:triggers &&!triggers.length?"0px":"0.5px solid gray",width:"55%",height:"max-content" }}>
                     {triggers && triggers.map((trigger, index) => (
                      
                       <Chip
                         style={{width:"max-content",zIndex:"1000",color:"#20dbe4"}}
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
                        label="Company Name"
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



                <Grid item xs={6} sm={6} style={{display:"flex",flexDirection:"column"}}>
                     {/* Text input */}
                   <TextField
                     label="Add Interest"
                     variant="outlined"
                    style={{width:"53%"}}
                     value={inputValue2}
                     onChange={(e) => setInputValue2(e.target.value)}
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
                <Controls.Input
                        label="Birthday"
                        name="birthday"
                        value={values.birthday}
                        onChange={handleInputChange}
                        //error={errors.city}
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
                         style={{
                          width: '53%',
                          //border:"1px solid #F5F5F5",
                          //padding:"10px",
                          borderRadius:"5px"
                        }}
                       
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
          </label>
          {file && (
            <IconButton
              aria-label="Crop"
              color="primary"
              onClick={() => setOpenCrop(true)}
            >
              <Crop />
            </IconButton>
          )}
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
