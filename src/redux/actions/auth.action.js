// import axios from '../../helpers/axios';
import {loginPending,loginSuccess,loginFailed,signupSuccess,signupPending,signupFailed,logoutPending,logoutSuccess} from '../reducers/auth.slice';
import { db, fb, auth, static_img } from '../../config/firebase';
import { fetchProfile } from './profile.action';
import { clearProfile } from 'src/redux/reducers/profile.slice';
import { clearUser } from 'src/redux/reducers/user.slice';
import { clearChat } from 'src/redux/reducers/chat.slice';
// import { clearSlice } from '../reducers/transaction.slice';
// import { clearBank } from '../reducers/bank.slice';
// import { createBankAcc } from './bank.action';

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";





// export const signup = (user, history) => async (dispatch) => {
//   //console.log(user);
//    dispatch(signupPending());
//    const res = db.collection('users').add({
//         name: user.name,
//         email: user.email,
//         password: user.password,
//     })
//     .then((docRef) => {
//         //console.log("Document written with ID: ", docRef.id);
//         //console.log('Response is: ', res);
//         dispatch(signupSuccess());
//         history.push("/login");
//     })
//     .catch((err) => {
//         console.error("Error adding document: ", err);
//         dispatch(signupFailed({err, msg}));
//     });
//   }



export const signup = (user, history,notifySkip) => async (dispatch) => {
      //console.log(user);
       dispatch(signupPending());


const sesClient = new SESClient({
  region: "eu-north-1", // e.g. "us-east-1" - come and remove these environemt variables before pushing o !
  credentials: {
    accessKeyId:process.env.REACT_APP_ACCESSKEYID_NURTURER,
    secretAccessKey:process.env.REACT_APP_SECRETACCESSKEY_NURTURER,
  },
});

   

       db.collection('companies')
            .get()
            .then((snapshot) => {
              
          
              const  validCompanyIds = snapshot.docs.map((doc) => (doc.data().companyID));

    
              //console.log("WHAT IS VALID COMPANY IDS--->",validCompanyIds)
              //console.log("WHAT IS COMPANY ID SUBMITTED FOR USER--->",user.companyID)
              
       if(validCompanyIds.includes(user.companyID)){  
        fb.auth().createUserWithEmailAndPassword(
          user.email,
          user.password
      ).then(async(res)=>{

      /**TRY TO SEND THE EMAIL HERE - START */

       db.collection('users').doc(res.user.uid).set({
        uid: res.user.uid,
        name: user.name,
        email: user.email,
        companyID:user.companyID,
        phone: user.phone,
        password: user.password,
        photoUrl: static_img,
        lastActive: new Date().getTime(),
       queryMsg:[
         {
          firstParagraph:"I hope you're doing well and navigating this season with clarity. It’s been about three months since we last connected, and I’ve been thinking about your role at Code Forge Labs—especially given how fast backend technologies and infrastructure tools are evolving. With performance optimization and scalable architecture top of mind for so many teams, your work is likely more impactful than ever.",
           secondParagraph:"While reading through some recent industry updates, I came across a couple of articles that I thought you might enjoy. They touch on themes related to backend efficiency, database design, and evolving best practices in engineering teams",
          thirdParagraph:"We had some great conversations previously, and I really appreciated hearing how you approach clean architecture and performance at scale. Let me know if you’re up for a quick catch-up sometime soon—I’d love to hear what you’ve been building (and maybe even what your latest keyboard mod looks like). Wishing you continued momentum",
          messageType:"Touches",
          bulletPoints:[
            {          
          bulletPointBold:"Deloitte Global's 2025 Airline CEO Survey",
          bulletPointRest:"Deloitte, May 30, 2025 Deloitte Link",
          id:"7",
          link:" "
            },
            {
              bulletPointBold:"A breath of fresh air for the national aviation industry",
              bulletPointRest:"PwC, June 3, 2025 PwC Link",
               id:"8",
               link:""
            }
          ]
         },
         {
          firstParagraph:"Wishing you a very happy birthday and a great year ahead!",
           secondParagraph:"Hope today brings some well-deserved time to relax and enjoy yourself.",
          thirdParagraph:"Here’s to continued success and many great moments ahead!",
          messageType:"Birthday",
          bulletPoints:[
            {          
          bulletPointBold:"Deloitte Global's 2025 Airline CEO Survey",
          bulletPointRest:"Deloitte, May 30, 2025 Deloitte Link",
          id:"7",
          link:" "
            },
            {
              bulletPointBold:"A breath of fresh air for the national aviation industry",
              bulletPointRest:"PwC, June 3, 2025 PwC Link",
               id:"8",
               link:""
            }
          ]
         },
         {
          firstParagraph:"Hope you’re enjoying your New Year's holiday and getting some time to recharge.",
           secondParagraph:"Wishing you a joyful day filled with good moments and great company.",
          thirdParagraph:"All the best to you this holiday season!",
          messageType:"Holiday",
          bulletPoints:[
            {          
          bulletPointBold:"",
          bulletPointRest:" ",
          id:"7",
          link:" "
            },
            {
              bulletPointBold:" ",
              bulletPointRest:" ",
               id:"8",
               link:""
            }
          ]
         }
         

       ],
        registeredOn:new Date()
      })
      
      try {
        const params = {
          Destination: {
            ToAddresses: [user.email], // recipient email
          },
          Message: {
            Body: {
              Text: {
                Data: "Welcome to Nurturer – Your Account is Ready.",
              },
              Html: {
                Data: ` <h2>Welcome to Nurturer!</h2>
                       <p>Dear <strong>${user.name &&user.name||user.name &&user.name}</strong>,</p>
                       <br/>
                       <br/>

                       
                       <p>Welcome aboard! Your registration on Nurturer is now complete, and you’re all set to begin using the platform.</p>
                       <br/>


                        <p>With Nurturer, you’ll have the tools to stay connected with your leads, nurture stronger relationships, and remain top of mind in a simple, effective way. Your access has already been set up, so you can dive right in and start making the most of the platform.</p>
                        <br/>
                        <p>We’re excited to have you join the Nurturer community and look forward to supporting your success.</p>
                        <br/>
    
                       
    
                        <p>Warm Regards</p>,
                        <p>– The Nurturer Team</p>`
              },
            },
            Subject: {
              Data: "Welcome to Nurturer – Your Account is Ready",
            },
          }, 
          Source: 'info@nurturer.ai'//process.env.SES_FROM_EMAIL, // must be a verified SES sender
        };
    
        const command = new SendEmailCommand(params);
        const response = await sesClient.send(command);
    
        //console.log("✅ Email sent successfully:", response.MessageId);
        return response;
      } catch (error) {
        console.error("❌ Error sending email:", error);
        throw error;
      }



     /**TRY TO SEND THE EMAIL HERE - END */

      }).then(() => {
        dispatch(signupSuccess());




        history.push("/login");
      }).catch((err) => {
        console.error("Error signiing up: ", err);
        var errorMessage = err.message;
        dispatch(signupFailed({ errorMessage }));
      })

      }else{
        notifySkip("The company ID you entered is invalid, please verify your company ID and try again!")
      }




      })    



  }

  export const signin = (user,history) => async (dispatch) => {
    dispatch(loginPending());
    fb.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      //console.log('Signed In user is: ', user.email);
      const currentUserProfile = db.collection("users").doc(user.uid);
  
      currentUserProfile.get()
      .then((doc) => {
          const user = doc.data();
          var uid = userCredential.user.uid;
          //console.log(user)
          dispatch(loginSuccess({ user, uid }));
          dispatch(fetchProfile());
          dispatch(updateLastActive(uid));
          history.push('/apps/dashboard');
          // history.push('/apps/sessions');
          // window.location.href = '/candidates';
      })
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      //console.log('Error Code is: ', errorCode, + ' Msg is: ', errorMessage);

      //console.log('Error Msg is:---> ', errorMessage);
     
     if(errorMessage){
      dispatch(loginFailed({errorMessage:"Invalid Login Credentials"} ));
     }
    });


 
  }


export const logout = (history) => async (dispatch) => {
  dispatch(updateLastActive(fb.auth().currentUser.uid));
  fb.auth().signOut().then(() => {
    //console.log('logout successful!');
    dispatch(clearProfile());
    dispatch(clearUser());
    dispatch(clearChat());
    dispatch(logoutSuccess());
    history.push('/login');
  }).catch((error) => {
    // An error happened.
    //console.log('logout failed response: ', error.message);
  });
  
}


export const fetchUserData = (uid) => async (dispatch) => {
  const currentUserProfile = db.collection("users").doc(uid);
  
      currentUserProfile.get()
      .then((doc) => {
          const user = doc.data();
          //console.log(user)
          dispatch(loginSuccess({ user }));
      })
}


export const updateLastActive = (uid) => async (dispatch) => {
  const currentTimeStamp = new Date().getTime();
  var userRef = db.collection("users").doc(uid);
   userRef.update({
      lastActive: currentTimeStamp,
  })
  .then(() => {
    //console.log('Timestamp updated');
  })
  .catch((error) => {
    var errorMessage = error.message;
    //console.log('Error updating timestamp:', errorMessage);
  });
}
