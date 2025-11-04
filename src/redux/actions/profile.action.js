import {createProfilePending, createProfileSuccess,createProfileSuccessOnly, createProfileFailed, 
  fetchProfilePending, fetchProfileSuccess, fetchProfileFailed} from 'src/redux/reducers/profile.slice';
import { v4 as uuidv4 } from 'uuid';
import { db, fb, auth, storage } from '../../config/firebase';
import firebase from 'firebase/app';
import "firebase/auth";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import uploadFile from 'config/uploadFile';
import { fetchUserData } from './auth.action';
import { fetchAllContactForOneUser, fetchAllUsers } from './user.action';
import { S3 } from "aws-sdk";
import { saveFilteredContacts } from 'redux/reducers/user.slice';

const s3 = new S3({
  accessKeyId:process.env.REACT_APP_ACCESSKEYID_NURTURER,
  secretAccessKey:process.env.REACT_APP_SECRETACCESSKEY_NURTURER,
  region:process.env.REACT_APP_REGION,
});



export const uploadImage = (profile, user, file, resetForm) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  //console.log('File Name: ', imageName);
  dispatch(createProfilePending());
  const uploadTask = storage.ref(`profile_images/${imageName}`).put(file);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // setProgress(progress);
    },
    error => {
      //console.log(error);
    },
    () => {
      storage
        .ref("profile_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          //console.log('Image URL: ', url);
          dispatch(createNewProfile(profile, user, file, resetForm, url));
        });
    }
  );
}

// /export const uploadNewImageOld = (profile, user, file, resetForm) => async (dispatch) => {
// /  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
// /  //console.log('File Name: ', imageName);
// /  dispatch(createProfilePending());
// /  const uploadTask = storage.ref(`profile_images/${imageName}`).put(file);
// /  uploadTask.on(
// /    "state_changed",
// /    snapshot => {
// /      const progress = Math.round(
// /        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
// /      );
// /      // setProgress(progress);
// /    },
// /    error => {
// /      //console.log(error);
// /    },
// /    () => {
// /      storage
// /        .ref("profile_images")
// /        .child(imageName)
// /        .getDownloadURL()
// /        .then(url => {
// /          //console.log('Image URL: ', url);
// /          dispatch(createNewProfile(profile, user, file, resetForm, url));
// /        });
// /    }
// /  );
// /}



export const uploadNewImageforUpdate = (profile, user, file, resetForm,notifyInvite,notifySkip,history,filteredContacts) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  const uploadToS3 = async (file) => {

    //console.log("PABOUT TO SEND TO S3--->",file)
  
  
    const params = {
      Body: file, // Blob
      Bucket:process.env.REACT_APP_S3_BUCKET,
      Key: file.name, // Unique filename
      ContentType: 'image/png', // Ensure correct MIME type
    };
  
  
  
     
    
    const data = await s3.upload({
      Body: file, // Blob
      Bucket:process.env.REACT_APP_S3_BUCKET,
      Key: file.name, // Unique filename
      ContentType: 'image/png', // Ensure correct MIME type
    }).promise();
    return data.Location; // S3 file URL 
  };
  
  
  
  uploadToS3(file)
  .then( async(url) => {
          //console.log('Image URL: ', url);
          dispatch(updateProfile(profile, user, file, resetForm, url,notifyInvite,notifySkip,history,filteredContacts));
        });
    
 
}




  export const uploadNewImage = (profile, user, file, resetForm,uploadNewImage,notifyInvite,notifySkip,setValues,initialFValues,setInterests,setTriggers,setNewState,) => async (dispatch) => {
    const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
    const uploadToS3 = async (file) => {

      //console.log("PABOUT TO SEND TO S3--->",file)
    
    
      const params = {
        Body: file, // Blob
        Bucket:process.env.REACT_APP_S3_BUCKET,
        Key: file.name, // Unique filename
        ContentType: 'image/png', // Ensure correct MIME type
      };
    
    
    
       
      
      const data = await s3.upload({
        Body: file, // Blob
        Bucket:process.env.REACT_APP_S3_BUCKET,
        Key: file.name, // Unique filename
        ContentType: 'image/png', // Ensure correct MIME type
      }).promise();
      return data.Location; // S3 file URL 
    };
    
    
    
    uploadToS3(file)
    .then( async(url) => {
            //console.log('Image URL: ', url);
            dispatch(createNewProfile(profile, user, file, resetForm, url,notifyInvite,notifySkip,setValues,initialFValues,setInterests,setTriggers,setNewState));
          });
      
   
  }



  export const updateProfileWithImage = (profile, user, file, resetForm,notifyInvite,notifySkip,history,filteredContacts) => async (dispatch) => {
    const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
    const uploadToS3 = async (file) => {

      //console.log("PABOUT TO SEND TO S3--->",file)
    
    
      const params = {
        Body: file, // Blob
        Bucket:process.env.REACT_APP_S3_BUCKET,
        Key: file.name, // Unique filename
        ContentType: 'image/png', // Ensure correct MIME type
      };
    
    
    
       
      
      const data = await s3.upload({
        Body: file, // Blob
        Bucket:process.env.REACT_APP_S3_BUCKET,
        Key: file.name, // Unique filename
        ContentType: 'image/png', // Ensure correct MIME type
      }).promise();
      return data.Location; // S3 file URL 
    };
    
    
    
    uploadToS3(file)
    .then( async(url) => {
            //console.log('Image URL: ', url);
            dispatch(updateProfile(profile, user, file, resetForm, url,notifyInvite,notifySkip,history,filteredContacts));
          });
      
   
  }
  
//DONT USE THIS FOR NURTURER!
export const createProfile = (profile, user, file, resetForm, url) => async (dispatch) => {
  //console.log('All data: ',{profile, user, url});
  dispatch(createProfilePending());
  var userRef = db.collection("users").doc(fb.auth().currentUser.uid);
  const profileData = userRef.update({
      uid: fb.auth().currentUser.uid,
      notes: profile.notes,
      
      city: profile.city,
      
      photoUrl: url,
  })
  .then(() => {
    const msg = 'Profile successfully updated!';
    dispatch(createProfileSuccess( { profileData, msg }));
    dispatch(fetchProfile());
    // dispatch(fetchUserData(fb.auth().currentUser.uid));
      //console.log("Profile successfully updated!");
      // resetForm();
  })
  .catch((error) => {
    var errorMessage = error.message;
    //console.log('Error creating profile', errorMessage);
    dispatch(createProfileFailed({ errorMessage }));
  });

}


export const createNewProfile = (profile, user, file, resetForm, url,notifyInvite,notifySkip,setValues,initialFValues,setInterests,setTriggers,setNewState) => async (dispatch) => {
  //console.log('All data: ',{profile, user, url});
  dispatch(createProfilePending());

 


  function changeFrequencyToDays(profileFrequency) {
    // If undefined, return "30" as default
    if (!profileFrequency||profileFrequency === "None"||profileFrequency === "none" ) return "0";
    // Use regex to extract the number from the string (e.g. "2 months")
    const match = profileFrequency.match(/\d+/);
    if (match) {
    const numberOfUnits = parseInt(match[0], 10);
    const days = numberOfUnits * 30;
    return days.toString();
    }
    // If no number found, default to "30"
    return "0";
    }



  function changeBirthdayToSendDate(birthday) {
    // If undefined or empty, return "365" as default
    if (!birthday) return "365";
  
    // Parse the input date string (dd/mm/yyyy)
    const [dayStr, monthStr, yearStr] = birthday.split('/');
    if (!dayStr || !monthStr || !yearStr) return "365";
  
    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10) - 1; // JS months are 0-based
    const year = parseInt(yearStr, 10);
  
    if (isNaN(day) || isNaN(month) || isNaN(year)) return "365";
  
    const targetDate = new Date(year, month, day);
    const today = new Date();
  
    // Clear time part for accurate day difference
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);
  
    let diffTime = targetDate - today;
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    // If target date is in the past, return 0 days
    if (diffDays < 0) diffDays = 0;
  
    return diffDays.toString();
  }





  function transformDate(dateStr) {
    // If the string is empty, null, or doesn't contain '-', just return it as-is
    if (!dateStr || !dateStr.includes('-')) {
      return dateStr;
    }
  
    // Split the input string into year, month, and day
    const [year, month, day] = dateStr.split('-');
  
    // Convert month and day to numbers to remove any leading zeros
    const m = Number(month);
    const d = Number(day);
  
    // Format month and day to always have two digits (leading zero if needed)
    const formattedMonth = m < 10 ? `0${m}` : m;
    const formattedDay = d < 10 ? `0${d}` : d;
  
    // Return the formatted date
    return `${formattedDay}/${formattedMonth}/${year}`;
  }
  
 
  const userRef = db.collection("contacts");
 
   userRef.add({
   name: profile.name||" ",
   email: profile.email||" ",
   phone: profile.phone||" ",
    notes: profile.notes||" ",
   companyName: profile.companyName||" ",
   industry: profile.industry||" ",
    jobTitle: profile.jobTitle||" ",
    birthday:transformDate(profile.birthday)||"1/1/1980",
    workAnniversary:transformDate(profile.workAnniversary)||"1/1/2020",
    city: profile.city||" ",
    triggers:profile.triggers||" ",
    state: profile.state||" ",
    frequency: profile.frequency||"None",
    sendDate:changeFrequencyToDays(profile.frequency)||" ",
    frequencyInDays:changeFrequencyToDays(profile.frequency)||" ",
    birthdaySendDate:changeBirthdayToSendDate(profile.birthday)||" ",
    birthdayFrequencyInDays:365||" ",
    queryMsg:[]||" ",
    messageQueue:[]||" ",
    interests: profile.interests,
    password:'12345678',
    usedConnection:0,
    lastActive:1663862737170,
    contacterId:user.uid,
    message:user.message?user.message:'',
    skillset: '',
  
    skills_needed: '',
    isTechnical: 'no',
    lookingFor:'',
    githubUrl: '',
    photoUrl: url?url:'https://nurturer.s3.eu-west-3.amazonaws.com/no-pic.png',
  })
  .then((docRef) => {
    // Update the newly created document with its own ID

  
    db.collection("users").doc(user.uid).update({
      contacts: firebase.firestore.FieldValue.arrayUnion(docRef.id)
    });

    return userRef.doc(docRef.id).update({ uid: docRef.id,contacteeId:docRef.id });
  })
  .then(async() => {
    const msg = 'Profile successfully created!';
   
     dispatch(createProfileSuccessOnly({ msg }));
     dispatch(fetchAllUsers(user.uid));
     notifyInvite('Profile Created Successfully!')

     setValues(initialFValues)
     setInterests([])
     setTriggers([])
     setNewState(  {
      "id": " ",
      "title": " "
    },)

    await dispatch(fetchAllContactForOneUser(user.uid))
     
    // dispatch(fetchProfile());
    // dispatch(fetchUserData(fb.auth().currentUser.uid));
    // resetForm();
  })
  .catch((error) => {
    var errorMessage = error.message;
    //console.log('Error creating profile', errorMessage);
    notifySkip('Problem creating profile,please try again!')
    dispatch(createProfileFailed({ errorMessage }));
  });

}



export const batchUploadContacts = (contactsArray, user, url,setOpen,notifyInvite) => async(dispatch)=> {
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(user.uid);
  const contactsRef = db.collection("contacts");



  function transformDate(dateStr) {
    // Create a new Date object from the input string
    const date = new Date(dateStr);
  
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.error("Invalid date format");
      return null;
    }
  
    // Extract day, month, and year
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-indexed, so add 1
    const year = date.getFullYear();
  
    // Format day and month to always have two digits (leading zero if needed)
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    // Return the formatted date as dd/mm/yyyy
    return `${formattedDay}/${formattedMonth}/${year}`;
  }
  

  const batch = db.batch();
  const newContactIds = [];

  function changeFrequencyToDays(profileFrequency) {
    // If undefined, return "30" as default
    if (!profileFrequency) return "30";
    // Use regex to extract the number from the string (e.g. "2 months")
    const match = profileFrequency.match(/\d+/);
    if (match) {
    const numberOfUnits = parseInt(match[0], 10);
    const days = numberOfUnits * 30;
    return days.toString();
    }
    // If no number found, default to "30"
    return "30";
    }

  contactsArray.forEach((profile) => {
    // Generate a new doc ref with an ID
    const newDocRef = contactsRef.doc();
    const newId = newDocRef.id;
    newContactIds.push(newId);

    const contactData = {
      name: profile.name || "",
      email: profile.email || "",
      phone: profile.phone || "",
      notes: profile.notes || "",
      companyName: profile.companyName || "",
      industry: profile.industry || "",
      jobTitle: profile.jobTitle || "",
      birthday: transformDate(profile.birthday) || "1/1/1980",
      workAnniversary: transformDate(profile.workAnniversary) || "",
      city: profile.city || "",
      triggers: profile.triggers? profile.triggers.split(',').map(trigger => trigger.trim()) : [],
      sendDate:changeFrequencyToDays(profile.frequency|| "0 month"),
      frequencyInDays:changeFrequencyToDays(profile.frequency || "0"),
      messageQueue:[],
      state: profile.state || "",
      frequency: profile.frequency || "None",
      interests: profile.interests?profile.interests.split(',').map(interest => interest.trim()) : [],
      // extra fields
      password: "12345678",
      
      lastActive: Date.now(),
      contacterId: user.uid,
     
      photoUrl: url || "https://nurturer-2.s3.eu-west-3.amazonaws.com/no-pic.png",

      // Add IDs
      uid: newId,
      id: newId,
      contacteeId: newId,
      contacterId: user.uid,
    };

    batch.set(newDocRef, contactData);
  });

  try {
    // Commit all writes at once
    await batch.commit();

    // ✅ After batch, update user's contacts array
    await userRef.update({
      contacts: firebase.firestore.FieldValue.arrayUnion(...newContactIds),
    });

    //console.log("Batch upload successful!");
    setOpen(false)
    //alert("All contacts uploaded Successfully!")
    notifyInvite("All contacts uploaded successfully!")
  } catch (error) {
    console.error("Error batch uploading contacts:", error);
  }
};



export const updateUserPassword = (profileData,userID) => async (dispatch) => {
  //console.log("UPDATE USER PASSWORD HAS STARTED--->",profileData)

  const notifySuccessFxn = (successMessage) => toast.success(successMessage, {
position: "bottom-right",
autoClose: 1000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});

const notifyErrorFxn = (errorMessage) => toast.error(errorMessage, {
position: "bottom-right",
autoClose: 1000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
 
      //update password start
      const user = fb.auth().currentUser;
      //console.log('FB CURRENT USER IS --->',user)
      user.updatePassword(profileData.password && profileData.password)
        .then(() => {
         
         //console.log('USER PASSWORD HAS BEEN UPDATED I THINK!')
         dispatch(fetchProfile())
        }).then(()=>{

          var user = db.collection("users").doc(userID);
          user.get(
            
          ).then((doc) => {
          if (doc.exists) {
           
            //dispatch(storeUserData(doc.data() ));
            user.update({
              password:profileData.password
            })
           
            notifySuccessFxn("Password updated successfully!");
            
          } else {
             
              notifyErrorFxn("Error updating password, please try again!")
              ////console.log("No such document!");
          }
        })

        })
        .catch((error) => {
          
          console.error("Error updating password: ", error);
          notifyErrorFxn(error.message);
        });
     //update password end
     

}

export const duplicateToContacts = () => async (dispatch) => {

async function duplicateCollection(sourceCollection, targetCollection) {
  const snapshot = await db.collection(sourceCollection).get();

  const batch = db.batch();

  snapshot.forEach((doc) => {
    const sourceData = doc.data();
    const targetDocRef = db.collection(targetCollection).doc(doc.id); // Keep same ID, or use db.collection(...).doc() for new ID
    batch.set(targetDocRef, sourceData);
  });
  await batch.commit();
  //console.log(`✅ Duplicated '${sourceCollection}' to '${targetCollection}'`);
}


duplicateCollection("users","contacts")

}

export const updateNewProfile = (profile, user, file, resetForm, url,notifyInvite,notifySkip) => async (dispatch) => {
  //console.log('All data: ',{profile, user, url});
  //dispatch(createProfilePending());

  function changeFrequencyToDays(profileFrequency) {
    // If undefined, return "30" as default
    if (!profileFrequency||profileFrequency === "None"||profileFrequency === "none" ) return "0";
    // Use regex to extract the number from the string (e.g. "2 months")
    const match = profileFrequency.match(/\d+/);
    if (match) {
    const numberOfUnits = parseInt(match[0], 10);
    const days = numberOfUnits * 30;
    return days.toString();
    }
    // If no number found, default to "30"
    return "0";
    }
 
  const userRef = db.collection("contacts").doc(profile.uid);
 
   userRef.update({
   name: profile.name,
   email: profile.email,
   phone: profile.phone,
    intro: profile.notes,
    notes: profile.notes,
   companyName: profile.companyName,
   industry: profile.industry,
    jobTitle: profile.jobTitle,
    birthday:profile.birthday||"1/1/1980",
    workAnniversary:profile.workAnniversary,
    city: profile.city,
    triggers:profile.triggers,
    sendDate:changeFrequencyToDays(profile.frequency),
   frequencyInDays:changeFrequencyToDays(profile.frequency),
     
    state: profile.state,
    frequency: profile.frequency,
    interests: profile.interests,
    password:'12345678',
   
    lastActive:1663862737170,
    contacterId:user.uid,
   
  
    photoUrl: url,
  })
  .then((docRef) => {
    // Update the newly created document with its own ID

  
    db.collection("users").doc(user.uid).update({
      contacts: firebase.firestore.FieldValue.arrayUnion(docRef.id)
    });

    return userRef.doc(docRef.id).update({ uid: docRef.id,contacteeId:docRef.id });
  })
  .then(() => {
    const msg = 'Profile successfully updated!';
    //console.log(msg);
     dispatch(createProfileSuccessOnly({ msg }));
     dispatch(fetchAllUsers(user.uid));
     notifyInvite('Profile Updated Successfully!')
    // dispatch(fetchProfile());
    // dispatch(fetchUserData(fb.auth().currentUser.uid));
    // resetForm();
  })
  .catch((error) => {
    var errorMessage = error.message;
    notifySkip('Problem Updating Profile, please try again!')
    console.log('Error creating profile', errorMessage);
    dispatch(createProfileFailed({ errorMessage }));
  });

}


export const updateProfile = (profile, user, file, resetForm, url,notifyInvite,notifySkip,history,filteredContacts) => async (dispatch) => {
  //console.log('All data: ',{profile, user, url});
  dispatch(createProfilePending());

  console.log("PROFILE BEFORE UPDATING TO DB, WHAT IS BIRTHDAY --->",profile.birthday)

  function transformDate(dateStr) {
    // If the string is empty, null, or doesn't contain '-', just return it as-is
    if (!dateStr || !dateStr.includes('-')) {
      return dateStr;
    }
  
    // Split the input string into year, month, and day
    const [year, month, day] = dateStr.split('-');
  
    // Convert month and day to numbers to remove any leading zeros
    const m = Number(month);
    const d = Number(day);
  
    // Format month and day to always have two digits (leading zero if needed)
    const formattedMonth = m < 10 ? `0${m}` : m;
    const formattedDay = d < 10 ? `0${d}` : d;
  
    // Return the formatted date
    return `${formattedDay}/${formattedMonth}/${year}`;
  }
  const userRef = db.collection("contacts").doc(profile.uid)
 
   userRef.update({
   name: profile.name,
   email: profile.email,
   phone: profile.phone,
    notes: profile.notes,
    
   companyName: profile.companyName,
   industry: profile.industry,
    jobTitle: profile.jobTitle,
    birthday:profile.birthday?transformDate(profile.birthday): '1/1/1980',
    workAnniversary:profile.workAnniversary?  transformDate(profile.workAnniversary) :'1/1/2007',
    city: profile.city,
    state: profile.state,
    frequency: profile.frequency,
    interests: profile.interests,
  
    lastActive:1663862737170,
  
    photoUrl: url,
  })
 
  .then(async() => {
    const msg = 'Profile successfully updated!';
    //console.log(msg);
     dispatch(createProfileSuccessOnly({ msg }));
    notifyInvite(msg)
     dispatch(fetchAllUsers(user.uid));
   await dispatch(fetchAllContactForOneUser(user.uid))
     .then(()=>{

        
     //preparing to push to candidates page
     const replica = [...filteredContacts]
   
     const index = replica.findIndex(user => user.uid === profile.uid);
   
     if (index > -1) {
       const [matchedUser] = replica.splice(index, 1);
       replica.unshift({...matchedUser,...profile,photoUrl:url});
     }
   
     
    dispatch(saveFilteredContacts(replica))
   
   setTimeout(()=>{
     history.push('/candidates')
      },300)

  //preparing to push to candidates page end

     })
    
  })
  .catch((error) => {
    var errorMessage = error.message;
    console.log('Error updating profile', errorMessage);
    dispatch(createProfileFailed({ errorMessage }));
    notifySkip('Error updating profile, please try again!')
  });

}



  export const fetchProfile = () => async (dispatch) => {
    var docRef = db.collection("users").doc(fb.auth().currentUser.uid);
    // dispatch(fetchProfilePending());
    docRef.get().then((doc) => {
        if (doc.exists) {
            //console.log("Document data:", doc.data());
            const profileData = doc.data();
            //console.log('Profile Data ', profileData.intro);
            if(profileData.intro != undefined){
            dispatch(fetchProfileSuccess({ profileData }));
             }
        } else {
            // doc.data() will be undefined in this case
            //console.log("No such document!");
        }
    }).catch((error) => {
      var errorMessage = error.message;
      //console.log('Error creating profile', errorMessage);
      // dispatch(fetchProfileFailed({ errorMessage }));
    });
      };

