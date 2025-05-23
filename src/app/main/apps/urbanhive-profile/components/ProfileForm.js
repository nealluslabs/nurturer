import React, { useState, useEffect, useRef } from 'react'
import Controls from "./controls/Controls";
import { useForm, Form } from './useForm';
import { TextField,InputLabel, MenuItem, Select, Grid, Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {Avatar, Badge, Chip, Divider, Stack, Alert, IconButton } from '@mui/material';
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
    const [photoURL, setPhotoURL] = useState(profileData.photoUrl != '' ? profileData.photoUrl : user.photoUrl);
    // const [photoURL, setPhotoURL] = useState(null);
    const [openCrop, setOpenCrop] = useState(false);
  

    const initialFValues = {
      id: user.uid,
      intro: profileData.intro == '' ? '' : profileData.intro,
      skills_needed: profileData.skills_needed == '' ? '' : profileData.skills_needed,
      isTechnical: profileData.isTechnical == '' ? 'nil' : profileData.isTechnical,
      lookingFor: profileData.lookingFor == '' ? 'nil' : profileData.lookingFor,
      city: profileData.city == '' ? '' : profileData.city,
      skillset: profileData.skillset == '' ? '' : profileData.skillset,
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
        if ('intro' in fieldValues)
            temp.intro = fieldValues.intro ? "" : "This field is required."
       if ('skillset' in fieldValues)
            temp.skillset = fieldValues.skillset.length != 0 ? "" : "This field is required."
       if ('city' in fieldValues)
            temp.city = fieldValues.city.length != 0 ? "" : "This field is required."
       if ('skills_needed' in fieldValues)
            temp.skills_needed = fieldValues.skills_needed.length != 0 ? "" : "This field is required."
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
           const intro = values.intro;
           const skillset = values.skillset;
           const city = values.city;
           const skills_needed = values.skills_needed;
           const isTechnical = values.isTechnical;
           const lookingFor = values.lookingFor;

          const profile = { intro, skillset, city, skills_needed, isTechnical, lookingFor, githubUrl};
          console.log('Logged User: ', fb.auth().currentUser.uid);
          if(photoURL == static_img){
          dispatch(createProfile(profile, user, file, resetForm, photoURL));
          }else{
            dispatch(uploadImage(profile, user, file, resetForm));
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
            <p>Make sure your profile is completed to attract more connections.</p><br/>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                <Controls.Input
                        name="intro"
                        label="Write an Intro about yourself!"
                        value={/*values.intro*/"I’m a native Swahili speaker passionate about helping others learn and improve their skills. I’m also learning Yoruba, so I understand the challenges of language learning. Let’s connect to practice conversation, share cultural insights, and support each other’s language goals!"}
                        onChange={handleInputChange}
                        error={errors.intro}
                        rows={2}
                        maxRows={4}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Controls.Select
                        name="skillset"
                        label="What language are you most fluent in ?"
                        value={values.skillset}
                        onChange={handleInputChange}
                        options={skillSetService.getSkillset()}
                        error={errors.skillset}
                    />
                </Grid>
              
                <Grid item xs={12} sm={6}>
                <Controls.Input
                        label="City, Country"
                        name="city"
                        value={values.city}
                        onChange={handleInputChange}
                        error={errors.city}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                      <Controls.Select
                        name="skills_needed"
                        label="What other languages are you fluent in?"
                        value={values.skills_needed}
                        onChange={handleInputChange}
                        options={skillSetService.getSkillset()}
                        error={errors.skills_needed}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                <Controls.RadioGroup
                        name="isTechnical"
                        label="Are you fluent?"
                        value={values.isTechnical}
                        onChange={handleInputChange}
                        items={isTechnical}
                    />
                    {showError ? <p style={{color: 'red'}}>This field is required.</p> : ''}
                </Grid>
                <Grid item xs={12} sm={6}>
                <Controls.RadioGroup
                        name="lookingFor"
                        label="What are you looking for?"
                        value={values.lookingFor}
                        onChange={handleInputChange}
                        items={type}
                    />
                    {showError2 ? <p style={{color: 'red'}}>This field is required.</p> : ''}
                </Grid>

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

         <Grid item xs={12} sm={6}>
                <Controls.Input
                        label="Other Info (Optional)"
                        name="city"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        error={errors.city}
                    />
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
