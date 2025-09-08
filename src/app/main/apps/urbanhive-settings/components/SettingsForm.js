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
import { createNewProfile, duplicateToContacts, uploadNewImage,updateUserPassword } from 'redux/actions/profile.action';
import { ToastContainer } from 'react-toastify';



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



export default function SettingsForm() {
    const nodeRef = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const { user } = useSelector((state) => state.login);
    const { profileData, isLoading, error, message } = useSelector((state) => state.profile);
    const [showError, setshowError] = useState(false);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const [showError2, setshowError2] = useState(false);
    const [file, setFile] = useState(null);
    const [githubUrl, setGithubUrl] = useState(profileData.githubUrl);
    const [photoURL, setPhotoURL] = useState(profileData.photoUrl != '' ? profileData.photoUrl : user.photoUrl);
    // const [photoURL, setPhotoURL] = useState(null);
    const [openCrop, setOpenCrop] = useState(false);
  

    const initialFValues = {
      //id: user.uid,
      intro: profileData.intro == '' ? '' : profileData.intro,
     
      city: profileData.city == '' ? '' : profileData.city,
      state: profileData.state == '' ? '' : profileData.state,
      frequency: profileData.frequency == '' ? '' : profileData.frequency,
      jobTitle:profileData && profileData.jobTitle && profileData.jobTitle == '' ? '' : profileData.jobTitle,
      interests: profileData.interests == '' ? '' : profileData.interests,
      industry: profileData.industry == '' ? '' : profileData.industry,
      companyName: profileData.companyName == '' ? '' : profileData.companyName,
      name: profileData.name == '' ? '' : profileData.name,
      email: profileData.email == '' ? '' : profileData.email,
      birthday: profileData.birthday == '' ? '' : profileData.birthday,
      workAnniversary: profileData.workAnniversary == '' ? '' : profileData.workAnniversary,
      password: profileData.password == '' ? '' : profileData.password,


      
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
        if ('password' in fieldValues)
          temp.password = fieldValues.password ? "" : "This field is required."
        if ('resetPassword' in fieldValues)
          temp.resetPassword = fieldValues.resetPassword ? "" : "This field is required."
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
        console.log("UPDATE SETINGS HAS BEEN TRIGGERED BUT NOTHING IS HAPPENING JUST YET")
        dispatch(updateUserPassword({password,confirmPassword},user.uid))
       //console.log('Photo URL: ', photoURL);
       //console.log('File URL: ', file);
       // e.preventDefault()
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
       // if (validate()){
       //   const name = values.name;
       //   const email = values.email;
       //    const intro = values.intro;
       //    const city = values.city;
       //    const companyName = values.companyName;
       //    const jobTitle = values.jobTitle;
       //    const state = values.state;
       //    const interests = values.interests;
       //    const industry = values.industry;
       //    const frequency = values.frequency;
       //    const birthday = values.birthday;
       //    const workAnniversary = values.workAnniversary;
       //    
       //   const profile = { intro, frequency, city, jobTitle,state, interests, companyName,industry,name,email,birthday,workAnniversary};
       //   //console.log('Logged User: ', fb.auth().currentUser.uid);
       //   console.log("profile ABOUT TO BE SENT IN -->",profile)
       //   if(photoURL == static_img){
       //   dispatch(createNewProfile(profile, user, file, resetForm, photoURL));
       //   }else{
       //     dispatch(uploadNewImage(profile, user, file, resetForm));
       //     //dispatch(createNewProfile(profile, user, file, resetForm, photoURL));
       //   } 
       // }

        
    }

    return !openCrop ? (
      <>
      <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
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
            <h2>Reset Password</h2><br/>

           

            <Grid container spacing={4} style={{position:"relative",marginTop:"2rem"}}>

            
           {/* <Grid item xs={12} sm={6} style={{marginTop:"1rem"}}>
                <Controls.Input
                        label="Name"
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                </Grid>
              */}
               

                <Grid item xs={12} sm={6} style={{marginTop:"1rem"}}>
                <Controls.Input
                        label="Password"
                        name="password"
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        //error={errors.email}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                <Controls.Input
                        name="resetPassword"
                        label="Reset Password"
                        value={confirmPassword}
                        onChange={(e)=>{setConfirmPassword(e.target.value)}}
                        //error={errors.intro}
                        rows={1}
                        //maxRows={4}
                    />
                </Grid>
               {/* <Grid item xs={12} sm={6}>
                <Controls.Select
                        name="city"
                        label="City"
                        value={values.city}
                        onChange={handleInputChange}
                        options={skillSetService.getCities()}
                        error={errors.city}
                    />
                </Grid> */}
              
                {/*<Grid item xs={12} sm={6}>
                <Controls.Input
                        label="Job Title"
                        name="jobTitle"
                        value={values.jobTitle}
                        onChange={handleInputChange}
                        error={errors.jobTitle}
                    />
              </Grid>*/}

                {/*<Grid item xs={12} sm={6}>
                      <Controls.Select
                        name="state"
                        label="State"
                        value={values.state}
                        onChange={handleInputChange}
                        options={skillSetService.getStates()}
                        error={errors.state}
                    />
                </Grid>*/}


                {/*<Grid item xs={12} sm={6}>
                <Controls.Input
                        label="Company Name"
                        name="companyName"
                        value={values.companyName}
                        onChange={handleInputChange}
                        error={errors.companyName}
                    />
                </Grid>*/}



                {/*<Grid item xs={12} sm={6}>
                <Controls.Input
                        label="Industry"
                        name="industry"
                        value={values.industry}
                        onChange={handleInputChange}
                       error={errors.industry}
                    />
              </Grid>*/}

                {/*Grid item xs={12} sm={6}>
                      <Controls.Select
                        name="frequency"
                        label="Frequency"
                        value={values.frequency}
                        onChange={handleInputChange}
                        options={skillSetService.getFrequency()}
                        error={errors.frequency}
                    />
                </Grid>*/}

              


                {/*<Grid item xs={12} sm={6}>
                <Controls.Input
                        label="Interests"
                        name="interests"
                        value={values.interests}
                        onChange={handleInputChange}
                        //error={errors.city}
                    />
                </Grid>*/}




                {/*<Grid item xs={12} sm={6}>
                <Controls.Input
                        label="Birthday"
                        name="birthday"
                        value={values.birthday}
                        onChange={handleInputChange}
                        //error={errors.city}
                    />
                </Grid>*/}




                {/*<Grid item xs={12} sm={6}>
                <Controls.Input
                        label="Work Anniversary"
                        name="workAnniversary"
                        value={values.workAnniversary}
                        onChange={handleInputChange}
                        //error={errors.city}
                    />
              </Grid>*/}

              





      {/*
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
        */}


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
                    style={{ backgroundColor: "#20dbe4" }}
                    text={isLoading ? 'Loading...' : 'Submit'} />
               {/* <Controls.Button
                    text="Reset"
                    color="default"
                    onClick={resetForm} />
            */}
                </div>
                </Box>
        </Form>
        </>
     ) : (
        <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile }} />
      );
}
