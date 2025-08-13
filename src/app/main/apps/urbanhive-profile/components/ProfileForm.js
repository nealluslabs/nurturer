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
import { createNewProfile, duplicateToContacts, uploadNewImage } from 'redux/actions/profile.action';



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
    const [photoURL, setPhotoURL] = useState(profileData.photoUrl != '' ? profileData.photoUrl : user.photoUrl);
    // const [photoURL, setPhotoURL] = useState(null);
    const [openCrop, setOpenCrop] = useState(false);

    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e) => {
      if (e.key === "Enter" && inputValue.trim() !== "") {
        e.preventDefault(); // prevent form submission
        if (triggers && !triggers.includes(inputValue.trim())) {
          setTriggers([...triggers, inputValue.trim()]);
        }
        setInputValue(""); // clear field
      }
    };
  
    const handleDelete = (triggerToDelete) => {
      setTriggers((prev) => prev.filter((t) => t !== triggerToDelete));
    };
  

    const initialFValues = {
      //id: user.uid,
      intro: profileData.intro == '' ? '' : profileData.intro,
     // skills_needed: profileData.skills_needed == '' ? '' : profileData.skills_needed,
     // isTechnical: profileData.isTechnical == '' ? 'nil' : profileData.isTechnical,
     // lookingFor: profileData.lookingFor == '' ? 'nil' : profileData.lookingFor,
      city: profileData.city == '' ? '' : profileData.city,
      state: profileData.state == '' ? '' : profileData.state,
      //triggers: profileData.triggers && profileData.triggers.length ===0   ? [] : profileData.triggers,
      frequency: profileData.frequency == '' ? '' : profileData.frequency,
      jobTitle:profileData && profileData.jobTitle && profileData.jobTitle == '' ? '' : profileData.jobTitle,
      interests: profileData.interests == '' ? '' : profileData.interests,
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
      
        if ('intro' in fieldValues)
            temp.intro = fieldValues.intro ? "" : "This field is required."
      // if ('skillset' in fieldValues)
      //      temp.skillset = fieldValues.skillset.length != 0 ? "" : "This field is required."
       if ('city' in fieldValues)
            temp.city = fieldValues.city.length != 0 ? "" : "This field is required."
       if ('jobTitle' in fieldValues)
        temp.jobTitle = fieldValues.jobTitle &&  fieldValues.jobTitle.length != 0 ? "" : "This field is required."
       if ('state' in fieldValues)
        temp.state = fieldValues.state.length != 0 ? "" : "This field is required."
      
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
           const intro = values.intro;
           const city = values.city;
           const companyName = values.companyName;
           const jobTitle = values.jobTitle;
           const state = values.state;
           //const triggers = values.triggers;
           const interests = values.interests;
           const industry = values.industry;
           const frequency = values.frequency;
           const birthday = values.birthday;
           const workAnniversary = values.workAnniversary;
           
          const profile = { intro, frequency, city, jobTitle,state,triggers, interests, companyName,industry,name,email,birthday,workAnniversary};
          //console.log('Logged User: ', fb.auth().currentUser.uid);
          console.log("profile ABOUT TO BE SENT IN -->",profile)
          if(photoURL == static_img){
          dispatch(createNewProfile({...profile,triggers}, user, file, resetForm, photoURL));
          }else{
            dispatch(uploadNewImage({...profile,triggers}, user, file, resetForm));
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
            <p>Fill out profile details.</p><br/>

           

            <Grid container spacing={4} style={{position:"relative",marginTop:"2rem"}}>

            <Grid container spacing={0} style={{ display: "flex", justifyContent: "space-between" ,position:"absolute",top:"-8rem",right:"0.5rem",width:"23rem",flexDirection:"row",marginBottom:"1.5rem"}}>
               <Grid item>
                 <Button /*onClick={()=>{dispatch(duplicateToContacts())} }*/
                   sx={{
                     backgroundColor: "black",
                     color: "white",
                     height:"4.5rem",
                     width:"11rem",
                     fontSize:"1.6rem",
                     padding: "0.5rem 0.8rem",
                     borderRadius: "0.3rem",
                     textTransform: "none", // Optional: keeps text as "CSV" without uppercase
                     "&:hover": {
                       backgroundColor: "#333"
                     }
                   }}
                 >
                   CSV
                 </Button>
               </Grid>
               <Grid item>
                 <Button
                   sx={{
                     backgroundColor: "black",
                     color: "white",
                      height:"4.5rem",
                     width:"11rem",
                     fontSize:"1.8rem",
                     padding: "0.5rem 0.8rem",
                     borderRadius: "0.3rem",
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
                        name="intro"
                        label="Notes"
                        value={values.intro/*"I’m a native Swahili speaker passionate about helping others learn and improve their skills. I’m also learning Yoruba, so I understand the challenges of language learning. Let’s connect to practice conversation, share cultural insights, and support each other’s language goals!"*/}
                        onChange={handleInputChange}
                        error={errors.intro}
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
                         style={{width:"max-content",zIndex:"1000",color:"black"}}
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

              


                <Grid item xs={12} sm={6}>
                <Controls.Input
                        label="Interests"
                        name="interests"
                        value={values.interests}
                        onChange={handleInputChange}
                        //error={errors.city}
                    />
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
                <Controls.Input
                        label="Work Anniversary"
                        name="workAnniversary"
                        value={values.workAnniversary}
                        onChange={handleInputChange}
                        //error={errors.city}
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
