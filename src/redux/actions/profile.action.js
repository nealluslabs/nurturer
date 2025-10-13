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
import { fetchAllUsers } from './user.action';
import { S3 } from "aws-sdk";

const s3 = new S3({
  accessKeyId:process.env.REACT_APP_ACCESSKEYID,
  secretAccessKey:process.env.REACT_APP_SECRETACCESSKEY,
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



export const uploadNewImageforUpdate = (profile, user, file, resetForm) => async (dispatch) => {
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
          dispatch(updateProfile(profile, user, file, resetForm, url));
        });
    
 
}




  export const uploadNewImage = (profile, user, file, resetForm) => async (dispatch) => {
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
            dispatch(createNewProfile(profile, user, file, resetForm, url));
          });
      
   
  }



  export const updateProfileWithImage = (profile, user, file, resetForm) => async (dispatch) => {
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
            dispatch(updateProfile(profile, user, file, resetForm, url));
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
      skillset: profile.skillset,
      city: profile.city,
      skills_needed: profile.skills_needed,
      isTechnical: profile.isTechnical,
      lookingFor: profile.lookingFor,
      githubUrl: profile.githubUrl,
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


export const createNewProfile = (profile, user, file, resetForm, url) => async (dispatch) => {
  //console.log('All data: ',{profile, user, url});
  dispatch(createProfilePending());

  function changeFrequencyToDays(profileFrequency) {
    // If undefined, return "30" as default
    if (!profileFrequency) return "30";


  
    if (profileFrequency === "None") return "None";
    // Use regex to extract the number from the string (e.g. "2 months")
    const match = profileFrequency.match(/\d+/);
  
    if (match) {
      const numberOfUnits = parseInt(match[0], 10);
      const days = numberOfUnits * 30;
      return days.toString();
    }
  
    // If no number found, default to "30"
    return "None";
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
  
 
  const userRef = db.collection("contacts");
 
   userRef.add({
   name: profile.name,
   email: profile.email,
   phone: profile.phone,
    notes: profile.notes,
   companyName: profile.companyName,
   industry: profile.industry,
    jobTitle: profile.jobTitle,
    birthday:profile.birthday,
    workAnniversary:profile.workAnniversary,
    city: profile.city,
    triggers:profile.triggers,
    state: profile.state,
    frequency: profile.frequency,
    sendDate:changeFrequencyToDays(profile.frequency),
    frequencyInDays:changeFrequencyToDays(profile.frequency),
    birthdaySendDate:changeBirthdayToSendDate(profile.birthday),
    birthdayFrequencyInDays:365,
    queryMsg:[],
    messageQueue:[],
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
  .then(() => {
    const msg = 'Profile successfully created!';
    //console.log(msg);
     dispatch(createProfileSuccessOnly({ msg }));
     dispatch(fetchAllUsers(user.uid));
    // dispatch(fetchProfile());
    // dispatch(fetchUserData(fb.auth().currentUser.uid));
    // resetForm();
  })
  .catch((error) => {
    var errorMessage = error.message;
    //console.log('Error creating profile', errorMessage);
    dispatch(createProfileFailed({ errorMessage }));
  });

}



export const batchUploadContacts = (contactsArray, user, url,setOpen,notifyInvite) => async(dispatch)=> {
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(user.uid);
  const contactsRef = db.collection("contacts");

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
      birthday: profile.birthday || "",
      workAnniversary: profile.workAnniversary || "",
      city: profile.city || "",
      triggers: profile.triggers? profile.triggers.split(',').map(trigger => trigger.trim()) : [],
      sendDate:changeFrequencyToDays(profile.frequency|| "1 month"),
      frequencyInDays:changeFrequencyToDays(profile.frequency || "1 month"),
      queryMsg:[],
      state: profile.state || "",
      frequency: profile.frequency || "1 month",
      interests: profile.interests?profile.interests.split(',').map(interest => interest.trim()) : [],

      // extra fields
      password: "12345678",
      usedConnection: 0,
      lastActive: Date.now(),
      contacterId: user.uid,
      message: user.message ? user.message : "",
      skillset: "",
      skills_needed: "",
      isTechnical: "no",
      lookingFor: "",
      githubUrl: "",
      photoUrl: url || "https://nurturer.s3.eu-west-3.amazonaws.com/no-pic.png",

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

export const updateNewProfile = (profile, user, file, resetForm, url) => async (dispatch) => {
  //console.log('All data: ',{profile, user, url});
  dispatch(createProfilePending());

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
 
  const userRef = db.collection("contacts");
 
   userRef.add({
   name: profile.name,
   email: profile.email,
   phone: profile.phone,
    intro: profile.notes,
    notes: profile.notes,
   companyName: profile.companyName,
   industry: profile.industry,
    jobTitle: profile.jobTitle,
    birthday:profile.birthday,
    workAnniversary:profile.workAnniversary,
    city: profile.city,
    triggers:profile.triggers,
    sendDate:changeFrequencyToDays(profile.frequency),
   frequencyInDays:changeFrequencyToDays(profile.frequency),
     messageQueue:[],
    state: profile.state,
    frequency: profile.frequency,
    interests: profile.interests,
    password:'12345678',
    usedConnection:0,
    lastActive:1663862737170,
    contacterId:user.uid,
    message:user.message? user.message:{
      firstParagraph:"I hope you're doing well and navigating this season with clarity. I saw the recent news about the leadership restructuring at Boeing and immediately thought of you. I can only imagine how much is being navigated at your level—balancing strategic realignment while keeping day-to-day momentum. It must be a challenging but transformative time for your team.",
      secondParagrpah:"While reading through some industry updates, I came across a couple of articles that I thought you might enjoy. They touch on themes that are relevant to leadership transition, innovation under pressure, and shifting talent strategies in large organizations:",
      thirdParagraph:"We had some great conversations previously, and I really valued the opportunity to understand what you were working toward. Let me know if you have time for a brief catch-up in the coming weeks. Either way, wishing you continued momentum.",
      bulletPoints:[
        {bulletPointBold:"Deloitte Global's 2025 Airline CEO Survey",
        bulletPointRest:"Deloitte, May 30, 2025 Deloitte Link",
        id:"7",
        link:""

      },
      {bulletPointBold:"A breath of fresh air for the national aviation industry"
      ,
      bulletPointRest: "PwC, June 3, 2025 PwC Link",
      id:"8",
      link:""

    },
    {bulletPointBold:"Navigating Headwinds: KPMG’s 2025 Global Aviation Outlook"
    ,
    bulletPointRest:"– KPMG, June 10, 2025",
    id:"9",
    link:"https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/tech-forward/cloud-20-serverless-architecture-and-the-next-wave-of-enterprise-offerings"

  },
      ]


    
    },

  
    skillset: '',
   
    skills_needed: '',
    isTechnical: 'no',
    lookingFor:'',
    githubUrl: '',
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
    // dispatch(fetchProfile());
    // dispatch(fetchUserData(fb.auth().currentUser.uid));
    // resetForm();
  })
  .catch((error) => {
    var errorMessage = error.message;
    //console.log('Error creating profile', errorMessage);
    dispatch(createProfileFailed({ errorMessage }));
  });

}


export const updateProfile = (profile, user, file, resetForm, url) => async (dispatch) => {
  //console.log('All data: ',{profile, user, url});
  dispatch(createProfilePending());
 
  const userRef = db.collection("contacts").doc(profile.uid)
 
   userRef.update({
   name: profile.name,
   email: profile.email,
   phone: profile.phone,
    notes: profile.notes,
    intro: profile.notes,
   companyName: profile.companyName,
   industry: profile.industry,
    jobTitle: profile.jobTitle,
    birthday:profile.birthday,
    workAnniversary:profile.workAnniversary,
    city: profile.city,
    state: profile.state,
    frequency: profile.frequency,
    interests: profile.interests,
  
    usedConnection:0,
    lastActive:1663862737170,
    
  
    skillset: '',
   
    skills_needed: '',
    isTechnical: 'no',
    lookingFor:'',
    githubUrl: '',
    photoUrl: url,
  })
 
  .then(() => {
    const msg = 'Profile successfully updated!';
    //console.log(msg);
     dispatch(createProfileSuccessOnly({ msg }));
     dispatch(fetchAllUsers(user.uid));
    // dispatch(fetchProfile());
    // dispatch(fetchUserData(fb.auth().currentUser.uid));
    // resetForm();
  })
  .catch((error) => {
    var errorMessage = error.message;
    //console.log('Error updating profile', errorMessage);
    dispatch(createProfileFailed({ errorMessage }));
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

