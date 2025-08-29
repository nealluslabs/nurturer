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
  console.log('File Name: ', imageName);
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
      console.log(error);
    },
    () => {
      storage
        .ref("profile_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          console.log('Image URL: ', url);
          dispatch(createNewProfile(profile, user, file, resetForm, url));
        });
    }
  );
}

export const uploadNewImageOld = (profile, user, file, resetForm) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  console.log('File Name: ', imageName);
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
      console.log(error);
    },
    () => {
      storage
        .ref("profile_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          console.log('Image URL: ', url);
          dispatch(createNewProfile(profile, user, file, resetForm, url));
        });
    }
  );
}



export const uploadNewImageforUpdate = (profile, user, file, resetForm) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  const uploadToS3 = async (file) => {

    console.log("PABOUT TO SEND TO S3--->",file)
  
  
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
          console.log('Image URL: ', url);
          dispatch(updateNewProfile(profile, user, file, resetForm, url));
        });
    
 
}




  export const uploadNewImage = (profile, user, file, resetForm) => async (dispatch) => {
    const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
    const uploadToS3 = async (file) => {

      console.log("PABOUT TO SEND TO S3--->",file)
    
    
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
            console.log('Image URL: ', url);
            dispatch(createNewProfile(profile, user, file, resetForm, url));
          });
      
   
  }



  export const updateProfileWithImage = (profile, user, file, resetForm) => async (dispatch) => {
    const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
    const uploadToS3 = async (file) => {

      console.log("PABOUT TO SEND TO S3--->",file)
    
    
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
            console.log('Image URL: ', url);
            dispatch(updateProfile(profile, user, file, resetForm, url));
          });
      
   
  }
  

export const createProfile = (profile, user, file, resetForm, url) => async (dispatch) => {
  console.log('All data: ',{profile, user, url});
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
      console.log("Profile successfully updated!");
      // resetForm();
  })
  .catch((error) => {
    var errorMessage = error.message;
    console.log('Error creating profile', errorMessage);
    dispatch(createProfileFailed({ errorMessage }));
  });

}


export const createNewProfile = (profile, user, file, resetForm, url) => async (dispatch) => {
  console.log('All data: ',{profile, user, url});
  dispatch(createProfilePending());
 
  const userRef = db.collection("contacts");
 
   userRef.add({
   name: profile.name,
   email: profile.email,
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
    const msg = 'Profile successfully created!';
    console.log(msg);
     dispatch(createProfileSuccessOnly({ msg }));
     dispatch(fetchAllUsers(user.uid));
    // dispatch(fetchProfile());
    // dispatch(fetchUserData(fb.auth().currentUser.uid));
    // resetForm();
  })
  .catch((error) => {
    var errorMessage = error.message;
    console.log('Error creating profile', errorMessage);
    dispatch(createProfileFailed({ errorMessage }));
  });

}



export const batchUploadContacts = async (contactsArray, user, url) => {
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(user.uid);
  const contactsRef = db.collection("contacts");

  const batch = db.batch();
  const newContactIds = [];

  contactsArray.forEach((profile) => {
    // Generate a new doc ref with an ID
    const newDocRef = contactsRef.doc();
    const newId = newDocRef.id;
    newContactIds.push(newId);

    const contactData = {
      name: profile.name || "",
      email: profile.email || "",
      notes: profile.notes || "",
      companyName: profile.companyName || "",
      industry: profile.industry || "",
      jobTitle: profile.jobTitle || "",
      birthday: profile.birthday || "",
      workAnniversary: profile.workAnniversary || "",
      city: profile.city || "",
      triggers: profile.triggers || [],
      state: profile.state || "",
      frequency: profile.frequency || "1 month",
      interests: profile.interests || "",

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
      photoUrl: url || "",

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

    console.log("Batch upload successful!");
  } catch (error) {
    console.error("Error batch uploading contacts:", error);
  }
};



export const updateUserPassword = (profileData,userID) => async (dispatch) => {
  console.log("UPDATE USER PASSWORD HAS STARTED--->",profileData)

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
      console.log('FB CURRENT USER IS --->',user)
      user.updatePassword(profileData.password && profileData.password)
        .then(() => {
         
         console.log('USER PASSWORD HAS BEEN UPDATED I THINK!')
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
              //console.log("No such document!");
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
  console.log(`✅ Duplicated '${sourceCollection}' to '${targetCollection}'`);
}


duplicateCollection("users","contacts")

}

export const updateNewProfile = (profile, user, file, resetForm, url) => async (dispatch) => {
  console.log('All data: ',{profile, user, url});
  dispatch(createProfilePending());
 
  const userRef = db.collection("contacts");
 
   userRef.add({
   name: profile.name,
   email: profile.email,
    intro: profile.intro,
   companyName: profile.companyName,
   industry: profile.industry,
    jobTitle: profile.jobTitle,
    birthday:profile.birthday,
    workAnniversary:profile.workAnniversary,
    city: profile.city,
    triggers:profile.triggers,
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
    const msg = 'Profile successfully created!';
    console.log(msg);
     dispatch(createProfileSuccessOnly({ msg }));
     dispatch(fetchAllUsers(user.uid));
    // dispatch(fetchProfile());
    // dispatch(fetchUserData(fb.auth().currentUser.uid));
    // resetForm();
  })
  .catch((error) => {
    var errorMessage = error.message;
    console.log('Error creating profile', errorMessage);
    dispatch(createProfileFailed({ errorMessage }));
  });

}


export const updateProfile = (profile, user, file, resetForm, url) => async (dispatch) => {
  console.log('All data: ',{profile, user, url});
  dispatch(createProfilePending());
 
  const userRef = db.collection("users").doc(profile.uid)
 
   userRef.update({
   name: profile.name,
   email: profile.email,
    intro: profile.intro,
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
    console.log(msg);
     dispatch(createProfileSuccessOnly({ msg }));
     dispatch(fetchAllUsers(user.uid));
    // dispatch(fetchProfile());
    // dispatch(fetchUserData(fb.auth().currentUser.uid));
    // resetForm();
  })
  .catch((error) => {
    var errorMessage = error.message;
    console.log('Error updating profile', errorMessage);
    dispatch(createProfileFailed({ errorMessage }));
  });

}



  export const fetchProfile = () => async (dispatch) => {
    var docRef = db.collection("users").doc(fb.auth().currentUser.uid);
    // dispatch(fetchProfilePending());
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            const profileData = doc.data();
            console.log('Profile Data ', profileData.intro);
            if(profileData.intro != undefined){
            dispatch(fetchProfileSuccess({ profileData }));
             }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
      var errorMessage = error.message;
      console.log('Error creating profile', errorMessage);
      // dispatch(fetchProfileFailed({ errorMessage }));
    });
      };

