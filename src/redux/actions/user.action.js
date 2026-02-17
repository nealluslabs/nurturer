import {fetchUsersPending, fetchUsersSuccess, fetchUsersFailed, fetchContactsSuccess, fetchContactsFailed, fetchRealTimeUsersSuccess, fetchConnectedUserSuccess,
    initiatePending, initiateSuccess, initiateSuccess2, initiateFailed, clearUser, resetConnects} from 'src/redux/reducers/user.slice';
 import { updateUsedConnection } from 'src/redux/reducers/auth.slice';
    import { db, fb, auth, storage } from '../../config/firebase';
import { sendChat } from './chat.action';
import { result } from 'lodash';
import { clearChat } from 'src/redux/reducers/chat.slice';
import { setCurrentChat } from 'redux/reducers/chat.slice';
import { saveChatGptAnswer, saveEditedParagraphs,saveAiTrigger, saveCandidateInFocus,subjectChangeTriggerAfterEmailSent, saveSubjectChangeTriggerAfterEmailIsSent } from 'redux/reducers/user.slice';
import axios from 'axios';

import firebase from "firebase/app";
import "firebase/firestore";

import FormData from "form-data"; // form-data v4.0.1  
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0  



import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { fetchProfileSuccess } from 'redux/reducers/profile.slice';
import { loginSuccess } from 'redux/reducers/auth.slice';

const sesClient = new SESClient({
  region: "eu-north-1", // e.g. "us-east-1" - come and remove these environemt variables before pushing o !
credentials: {
  accessKeyId:process.env.REACT_APP_ACCESSKEYID_NURTURER,
  secretAccessKey:process.env.REACT_APP_SECRETACCESSKEY_NURTURER,
},
});
  

export const fetchAllUsers = (uid) => async (dispatch) => {
    dispatch(fetchUsersPending());
    // db.collection('users').where("uid", "!=", fb.auth().currentUser.uid)
    var fetchUsers = db.collection('users')
    // fetchUsers = fetchUsers.where("uid", "!=", uid)
    //console.log("This should show all the users", fetchUsers);
    fetchUsers = fetchUsers.where("intro", "!=", null)
    fetchUsers.get()
    .then((snapshot) => {
        const users = snapshot.docs.map((doc) => ({ ...doc.data() }));
        const filteredUser = users.filter(user => user.uid != uid);
        //console.log('Filtered User\'s', filteredUser );
        // }
        // dispatch(fetchUsersSuccess(users));
        dispatch(fetchUsersSuccess(filteredUser));
}).catch((error) => {
        var errorMessage = error.message;
        //console.log('Error fetching profile', errorMessage);
        dispatch(fetchUsersFailed({ errorMessage }));
});

};

export const fetchAllContactForOneUser = (uid) => async (dispatch) => {
    dispatch(fetchUsersPending());
    
    try {
        //console.log("Fetching contacts for user:", uid);
        
        // Query contacts collection where contacterId matches the user's uid
        const contactsSnapshot = await db.collection('contacts')
            .where("contacterId", "==", uid)
            .get();
        
        if (contactsSnapshot.empty) {
            //console.log("No contacts found for user:", uid);
            dispatch(fetchContactsSuccess([]));
            return;
        }
        
        // Map the documents to extract data
        const contacts = contactsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        
        //console.log("Successfully fetched contacts:", contacts);
        //console.log("Total contacts found:", contacts.length);
        
        // Dispatch the contacts data to Redux store
        dispatch(fetchContactsSuccess(contacts));
        
    } catch (error) {
        const errorMessage = error.message;
        //console.log('Error fetching contacts:', errorMessage);
        dispatch(fetchContactsFailed({ errorMessage }));
    }
};


export const updateCandidateNotes = (contactId,notes,notifyInvite,userId) => async (dispatch) => {
  

   
       
    const contactDoc = db.collection('contacts').doc(contactId && contactId)

     contactDoc.get().then(async(doc)=>{ 

      if (doc.exists) {

        //console.log("RAW MESSAGE IS -->", updatedParagraphs)
        let updatedMessage =  {...doc.data().message}


         //console.log("UPDATED UPDATED MESSAGE IS -->", updatedMessage)
         contactDoc.update({
          notes:notes,
          
        }).then(() => contactDoc.get())
        .then(async(doc) => {
          if (doc.exists) {
            notifyInvite(`Notes have been updated for this contact`)
            saveCandidateInFocus(doc.data())
            await dispatch(fetchAllContactForOneUser(userId))
          }
        })

        


         
      }
     
    }) 


  
}


export const updateCandidateEventsAlert = (contactId) => async (dispatch) => {
  
       
  const contactDoc = db.collection('contacts').doc(contactId && contactId)

   contactDoc.get().then(async(doc)=>{ 

    if (doc.exists) {

      //console.log("RAW MESSAGE IS -->", updatedParagraphs)
      let updatedMessage =  {...doc.data().message}


       //console.log("UPDATED UPDATED MESSAGE IS -->", updatedMessage)

       contactDoc.update({
        eventsAlert:doc.data() &&  doc.data().eventsAlert?!(doc.data().eventsAlert):true,
        
      }).then(()=>{
        const newContactDoc = db.collection('contacts').doc(contactId && contactId)
        newContactDoc.get().then(async(doc)=>{ 

          if (doc.exists) {
      
        dispatch(saveCandidateInFocus(doc.data()))
          }
        })

      })
      

    }
   
  }) 



}

export const updateAllContactsDefaultCard = (userId, cardType,cardType2, link,link2,notifyInvite,notifySkip) => async (dispatch) => {
  try {
    // Query contacts that have the userId (fixed the "contacterId" issue)
    const snapshot = await db.collection("users").where("uid", "==", userId).get();

    if (snapshot.empty) {
      console.log("No users with this  user id,hence this user does not exist");
      return;
    }

    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      const docRef = db.collection("users").doc(doc.id);
      
      // Prepare the updated card data by copying the existing cards and updating the specific card type
      const updatedCards = {
        ...doc.data().cards, // Spread the existing cards object
        [cardType]: link, // Dynamically update the specific cardType with the new link
        [cardType2]: link2 // card type 2 and link 2 are essentially me putting the old link into the non default cards space
      };

      // Add the update operation to the batch
      batch.update(docRef, { cards: updatedCards });
    });

    // Commit the batch update
    await batch.commit();
    console.log("All users updated successfully.");
    notifyInvite("Default Card Updated for this user");


//refetch the user, so we can see which one is default and which is not
    var docRef = db.collection("users").doc(userId);
    // dispatch(fetchProfilePending());
    docRef.get().then((doc) => {
        if (doc.exists) {
            
            const profileData = doc.data();
           
            dispatch(loginSuccess({ user:profileData, uid:userId }));
            
        } else {
            // doc.data() will be undefined in this case
            //console.log("No such document!");
        }
    }).catch((error) => {
      var errorMessage = error.message;
      
    });


  } catch (error) {
    console.error("Error updating contacts: ", error);
    notifySkip("Error updating default Card, please try again");
  }
};



export const updateCandidateTouchesAlert = (contactId) => async (dispatch) => {
  
       
  const contactDoc = db.collection('contacts').doc(contactId && contactId)

   contactDoc.get().then(async(doc)=>{ 

    if (doc.exists) {

      //console.log("RAW MESSAGE IS -->", updatedParagraphs)
      let updatedMessage =  {...doc.data().message}


       //console.log("UPDATED UPDATED MESSAGE IS -->", updatedMessage)

       contactDoc.update({
        touchesAlert:doc.data() &&  doc.data().touchesAlert?!(doc.data().touchesAlert):true,
        
      }).then(()=>{
        const newContactDoc = db.collection('contacts').doc(contactId && contactId)
        newContactDoc.get().then(async(doc)=>{ 

          if (doc.exists) {
      
        dispatch(saveCandidateInFocus(doc.data()))
          }
        })

      })
      

    }
   
  }) 



}


export const updateCandidateTriggerAlert = (contactId) => async (dispatch) => {
  
       
  const contactDoc = db.collection('contacts').doc(contactId && contactId)

   contactDoc.get().then(async(doc)=>{ 

    if (doc.exists) {

      //console.log("RAW MESSAGE IS -->", updatedParagraphs)
      let updatedMessage =  {...doc.data().message}


       //console.log("UPDATED UPDATED MESSAGE IS -->", updatedMessage)

       contactDoc.update({
        triggersAlert:doc.data() &&  doc.data().triggersAlert?!(doc.data().triggersAlert):true,
        
      }).then(()=>{
        const newContactDoc = db.collection('contacts').doc(contactId && contactId)
        newContactDoc.get().then(async(doc)=>{ 

          if (doc.exists) {
      
        dispatch(saveCandidateInFocus(doc.data()))
          }
        })

      })
      

    }
   
  }) 



}



export const deleteCandidate = (contactId, notifyInvite, notifyError) => async (dispatch) => {
  if (!contactId) {
    notifyError?.('Invalid contact ID');
    return;
  }

  const contactDoc = db.collection('contacts').doc(contactId);

  try {
    const doc = await contactDoc.get();

    if (doc.exists) {
      await contactDoc.delete();
      notifyInvite?.('Contact has been deleted successfully');
    } else {
      notifyError?.('Contact not found');
    }
  } catch (error) {
    console.error('Error deleting contact:', error);
    notifyError?.('Error deleting contact, please try again');
  }
};




export const stopMessageSending = (notifyInvite,selectedChatUser) => async (dispatch) => {
  if(window.confirm('Are you sure you want to turn off message sending for this user?')){
       

    const contactDoc = db.collection('contacts').doc(selectedChatUser && selectedChatUser.uid)

     contactDoc.get().then(async(doc)=>{ 

      if (doc.exists) {

        //console.log("RAW MESSAGE IS -->", updatedParagraphs)
        let updatedMessage =  {...doc.data().message}


         //console.log("UPDATED UPDATED MESSAGE IS -->", updatedMessage)

         contactDoc.update({
          frequency:"None",
          sendDate:doc.data().frequencyInDays && doc.data().frequencyInDays.toString()
        }).then(() => contactDoc.get())
        .then((doc) => {
          if (doc.exists) {
            notifyInvite(`Message sending has been paused for${selectedChatUser.name}!`)
          }
        })

        


         
      }
     
    }) 


  }
}

export const sendEmailToContact = (data,notifyInvite,notifySkip,user,cardType) => async (dispatch) => {
  console.log("WE ARE IN THE SEND EMAIL TO CONTACT BLOCK, WHAT IS DATA, WHAT IS CARD TYPE?",user,cardType)
   
  let cardImage = "";

switch (cardType) {
  case "birthdayCard":
    cardImage = user?.cards?.birthdayCard;
    break;
  case "birthdayCard2":
    cardImage = user?.cards?.birthdayCard2;
    break;
  case "thankYouCard":
    cardImage = user?.cards?.thankYouCard;
    break;
  case "thankYouCard2":
    cardImage = user?.cards?.thankYouCard2;
    break;
  default:
    cardImage = user?.cards?.birthdayCard; // fallback
}



  if(data && data.touchesAlert !==null && data.touchesAlert ===true  ){

    const latest = data.messageQueue[data.messageQueue.length - 1];

    const emailHTML = `
      <p>Dear <strong>${data.name || ''}</strong>,</p>
    
      <p>${latest?.firstParagraph || ''}</p>
    
      <p>${latest?.secondParagraph || ''}</p>

      <ul>
      ${
        (latest.messageType !== "Holiday" && latest.messageType !== "Birthday") &&
        latest?.bulletPoints
          ? latest.bulletPoints
              .slice(0, 2)
              .map(
                (bp) => `
                  <li>
                    <strong>${bp.bulletPointBold || ""}</strong> — ${bp.bulletPointRest || ""}
                    <a href="${bp.link || "#"}" target="_blank">${bp.link || ""}</a>
                  </li>
                `
              )
              .join("")
          :
           ``
      }
    </ul>
    
    
      <p>${latest?.thirdParagraph || ''}</p>
    
      <p>Warm Regards,</p>
      <p>– ${user.name && user.name}</p>




      <ul>
      ${
        (latest.messageType === "Holiday" || latest.messageType === "Birthday") &&
         `
            <li style="list-style: none;">
              <img 
                src="${cardImage || ""}" 
                alt="greeting card"
                width="220"
                height="220"
                style="display:block; width:220px; height:220px; object-fit:cover;"
              />
            </li>
          `
      }
    </ul>
    
    `;
    
 
 
   try {
     
          const response = await axios.post(
            /*"http://localhost:5008/send-email",*/
        "https://nurturer-sendgrid-backend.vercel.app/send-email",
        /* "https://nurturer-sendgrid-backend-production.up.railway.app/send-email",*/
       {
         to: data.email, // or 'devs@nurturer.ai'
         subject: latest.subject ? latest.subject : "",
         htmlMessage: emailHTML,
         name:user.name && user.name,
         userEmail:user.email && user.email
       },
       {
         headers: {
           "Content-Type": "application/json",
         },
       }
      )

      console.log("RESPONSE IS=====>",response)
    
      const result = await response.data; // <-- parse backend JSON
    

        console.log("RESULT IS=====>",result)
      if (result.success) {
        notifyInvite("Email sent out successfully");




        //     //UPDATING STATUS OF A PARTICULAR CONTACT
    const updatedMessageQueue = [...data.messageQueue];

    // Find the index of the most recent email (assuming array is in chronological order)
    // If not, we’ll sort it before finding
    const emailMessages = updatedMessageQueue
      .map((msg, index) => ({ ...msg, index }))
     // .filter(msg => msg.messageType === "Email"); //it doesnt only have to be emails, but it has to be the most recent one
  
    if (emailMessages.length > 0) {
      // Get the last (most recent) email
      const mostRecentEmail = emailMessages[emailMessages.length - 1];
      const msgIndex = mostRecentEmail.index;
  
      // Update the messageStatus
      updatedMessageQueue[msgIndex] = {
        ...updatedMessageQueue[msgIndex],
        messageStatus: "Sent"
        
      };

      const contactDoc = await db.collection("contacts").doc(data && data.uid).get();

      if(contactDoc.exists){
        await db.collection("contacts").doc(data && data.uid).update({
          messageQueue: updatedMessageQueue,
          sendDate:contactDoc.data().frequencyInDays
        });


    await db.collection("contacts").doc(data && data.uid).get().then(async(doc)=>{
      dispatch(setCurrentChat(doc.data()))
      dispatch(saveSubjectChangeTriggerAfterEmailIsSent(new Date().toISOString()))
     

    }) 
      


        //UPDATING STATUS OF A PARTICULAR CONTACT - END
      } else {
        notifySkip("Error sending email, please try again");
      }
    }
  
  
  
  }
    
    } catch (error) {
      console.error("Fetch error:=====>", error);
      notifySkip("Network error. Please try again.");
    }



    console.log("BELOW IS AWS SES EMAIL SENDING CODE - U CAN DELETE IT ONCE MR DEA CONFIRMS THAT API IS NOT WORKING")
 //try {
 //     const params = {
 //       Destination: {
 //       ToAddresses: [data.email],
 //       },
 //       Message: {
 //         Body: {
 //           Html: {
 //             Data: `
 //               
 //               <p>Dear <strong>${data.name || ''}</strong>,</p>
 //               <br/>
 //     
 //               <p>${data.messageQueue && data.messageQueue[data.messageQueue.length - 1] && data.messageQueue[data.messageQueue.length - 1].firstParagraph || ''}</p>
 //               <br/>
 //     
 //               <p>${data.messageQueue && data.messageQueue[data.messageQueue.length - 1] && data.messageQueue[data.messageQueue.length - 1].secondParagraph || ''}</p>
 //               <br/>
 //     
 //               <ul>
 //                 ${
 //                   (data.messageQueue &&
 //                    data.messageQueue[data.messageQueue.length - 1] &&
 //                    data.messageQueue[data.messageQueue.length - 1].bulletPoints)
 //                     ? data.messageQueue[data.messageQueue.length - 1].bulletPoints.map(
 //                         bp => `
 //                           <li>
 //                             <strong>${bp.bulletPointBold || ''}</strong> — ${bp.bulletPointRest || ''} 
 //                             <a href="${bp.link || '#'}" target="_blank">${bp.link || ''}</a>
 //                           </li>`
 //                       ).join('')
 //                     : ''
 //                 }
 //               </ul>
 //               <br/>
 //     
 //               <p>${data.messageQueue && data.messageQueue[data.messageQueue.length - 1] && data.messageQueue[data.messageQueue.length - 1].thirdParagraph || ''}</p>
 //               <br/>
 //     
 //               <p>Warm Regards,</p>
 //               <p>– The Nurturer Team</p>
 //             `,
 //           },
 //           Text: {
 //             Data: data.messageQueue && data.messageQueue[data.messageQueue.length - 1] && data.messageQueue[data.messageQueue.length - 1].subject || '',
 //           },
 //         },
 //         Subject: {
 //           Data: data.messageQueue && data.messageQueue[data.messageQueue.length - 1] && data.messageQueue[data.messageQueue.length - 1].subject || '',
 //         },
 //       },
 //       Source: 'info@nurturer.ai', // must be verified in SES
 //     };
 //     
 // 
 //     const command = new SendEmailCommand(params);
 //      await sesClient.send(command);
//
//
 //     //UPDATING STATUS OF A PARTICULAR CONTACT
 //   const updatedMessageQueue = [...data.messageQueue];
//
 //   // Find the index of the most recent email (assuming array is in chronological order)
 //   // If not, we’ll sort it before finding
 //   const emailMessages = updatedMessageQueue
 //     .map((msg, index) => ({ ...msg, index }))
 //     .filter(msg => msg.messageType === "Email");
 // 
 //   if (emailMessages.length > 0) {
 //     // Get the last (most recent) email
 //     const mostRecentEmail = emailMessages[emailMessages.length - 1];
 //     const msgIndex = mostRecentEmail.index;
 // 
 //     // Update the messageStatus
 //     updatedMessageQueue[msgIndex] = {
 //       ...updatedMessageQueue[msgIndex],
 //       messageStatus: "Sent"
 //       
 //     };
//
 //     const contactDoc = await db.collection("contacts").doc(data && data.uid).get();
//
 //     if(contactDoc.exists){
 //       await db.collection("contacts").doc(data && data.uid).update({
 //         messageQueue: updatedMessageQueue,
 //         sendDate:contactDoc.data().frequencyInDays
 //       });
//
//
 //   await db.collection("contacts").doc(data && data.uid).get().then(async(doc)=>{
 //     dispatch(setCurrentChat(doc.data()))
//
 //   }) 
 //     
//
//
 //       //UPDATING STATUS OF A PARTICULAR CONTACT - END
 //        notifyInvite("Email has been sent out!")
//
 //     }
 //     //TRY BLOCK END
 //   }
 // } 
 //   catch (error) {
 //     console.error("❌ Error sending email:", error);
 //     notifySkip("Error Sending Email, please try again!")
 //     throw error;
 //   }

    //SEND EMAIL END

    

   
  }


}




export const generateAiMessage = (messageType,Frequency,Name,JobTitle,Company,Industry,Interests,setLoading,previousMessage,user,notifyInvite,selectedChatUser) => async (dispatch) => {
            
  
   if(setLoading){setLoading(true)}
  // setLoading(true)

   //AUG 29TH 2025 - USUALLY PROMPTS WILL BE EMAILS, BUT OCCASSIONALLY IF IT'S THE CONTACTS BIRTHDAY, OR A HOLIDAY, THEN A HOLIDAY PROMPT WILL BE SENT OUT
   //FOR NOW THOUGH WE WILL CHANGE THE PROMPT BASED ON IF ITS BOB JOHNSON (BIRTHDAY) OR EMILY WHITE (4TH OF JULY)

  //const apiEndpoint =`https://nurturer-helper-api.vercel.app/api/om/chatgpt`
 const apiEndpoint =`https://pmserver.vercel.app/api/om/chatgpt`

  //const apiEndpoint =`http://localhost:5008/api/om/chatgpt`

//console.log("USER BEING PASSED INTO GENERATE AI MESSAGE--->",user)

let adminSettings
                                       //later I will remove this hardcoding
const doc = await db.collection("adminSettings").doc("KjE2Xz7avxs3Y5w4eXXF").get();
  if (doc.exists) {
  adminSettings = doc.data(); 
} else {
  console.error("Admin settings document not found!");
  return; // prevent continuing if it’s missing
}

  // const prompt = WE HAVE A VARIETY OF PROMPTS NOW, NOT JUST ONE

  // `I want to send five articles to a business contact. Search the internet for five legitimate,real articles that were written in 2025
  //  along with a url to that article that can be publicly accessed from these websites - PWC, Deloitte, McKinsey,
  //   Visitage, Gallup, Josh Bersin, Harvard Business Review and Forbes.
  //    Provide the title of the articles and the url
  //    to them. I want articles that are relevant to the contacts info - ${JobTitle}, ${Company}, ${Industry}, ${Interests}.
  // Generate an email subject of 5 words maximum with and 3 really short paragraphs of text and fill in this object and 
  // return it as your answer(keep the object in valid JSON). Put an emoji at the end of the subject. Make sure the property
  //  messageStatus is in the JSON object, and it has a value of Pending .
  // For the id in each object of the bulletPoints array, please keep the id in the object below, do not delete them when 
  // generating your own object.
  // {"subject":" ",  
  //    messageType:"Email",  
  //    "messageStatus":"Pending" 
  //     "firstParagraph":" ",  
  //    "secondParagraph":" ", 
  //         "thirdParagraph":" ",   
  //      "bulletPoints":[ 
  //              {         "bulletPointBold":" ",         "bulletPointRest":" ",         "link":" ",         "id":"0",        },
  //              {          "bulletPointBold":" ",          "bulletPointRest":" ",          "link":" ",          "id":"1",        },
  //              {          "bulletPointBold":" ",          "bulletPointRest":" ",          "link":" ",          "id":"2",        },
  //              {          "bulletPointBold":" ",          "bulletPointRest":" ",          "link":" ",          "id":"3",        },
  //              {          "bulletPointBold":" ",          "bulletPointRest":" ",          "link":" ",          "id":"4",        },      ]     }
  // The first paragraph should be a professional greeting paragraph for an email to a business contact.
  //  Don't start the paragraph with Dear ${Name}, just jump into the writing. Second paragraph should be 
  //  about how you have found some articles that relate to their industry ${Industry}.
  //   The third paragraph should be about how you'd love to hear from them and you wish them luck in their future endeavors and hobbies: ${Interests}.
  //     For each article, put it's title into "bulletPointBold", it's source into "bulletPointRest" and a link to the article into "link".
  //      Make each paragraph relevant to the user's job: ${JobTitle}, company:${Company}, industry:${Industry} and interests:${Interests}.
  //       Please go through the javascript object ${JSON.stringify(previousMessage)}, and try to adapt to my writing style,so you can sound like me,when providing your answer`
 

const prompt =
   messageType === "Independence"?
   eval('`' + adminSettings.holidayQuery.replace(/\{\$/g, '${') + '`')
   :
   messageType === "Christmas"?
   eval('`' + adminSettings.holidayQuery.replace(/\{\$/g, '${') + '`')
     :
     messageType === "New Years"?
     eval('`' + adminSettings.holidayQuery.replace(/\{\$/g, '${') + '`')
     :
     messageType === "Thanksgiving"?
   eval('`' + adminSettings.holidayQuery.replace(/\{\$/g, '${') + '`')
     :
     messageType === "Labor Day"?
   eval('`' + adminSettings.holidayQuery.replace(/\{\$/g, '${') + '`')
     :
     messageType === "Memorial Day"?
   eval('`' + adminSettings.holidayQuery.replace(/\{\$/g, '${') + '`')
     :
   messageType === "Birthday"?
   eval('`' + adminSettings.birthdayQuery.replace(/\{\$/g, '${') + '`')
   :
   messageType === "Event"?
   eval('`' + adminSettings.eventQuery.replace(/\{\$/g, '${') + '`')
   :
   messageType === "Touch"?
   eval('`' + adminSettings.emailQuery.replace(/\{\$/g, '${') + '`')
   :
   eval('`' + adminSettings.emailQuery.replace(/\{\$/g, '${') + '`')


  const jobResponse = await axios.post(apiEndpoint,{prompt:prompt})

   

   


     const fullJobDetailsResponse = jobResponse.data?jobResponse.data: user.queryMsg && user.queryMsg.filter((msg)=>(msg.messageType === messageType)) ?user.queryMsg.filter((msg)=>(msg.messageType === messageType))[0]   :user.queryMsg && user.queryMsg[0] /* JSON.parse(jobResponse.data)*/

     console.log("OUR RESPONSE FROM OUR BACKEND, WHICH CALLS CHAT GPT, IN THIS CASE OUR PROMPT-->",fullJobDetailsResponse)

     if(fullJobDetailsResponse){
      dispatch(saveChatGptAnswer(fullJobDetailsResponse && {...fullJobDetailsResponse,createdAt:new Date(),messageStatus:"Pending"}))

      dispatch(saveEditedParagraphs(fullJobDetailsResponse && {...fullJobDetailsResponse,createdAt:new Date(),messageStatus:"Pending"}))

      dispatch(updateUserBroadcast({...fullJobDetailsResponse,createdAt:new Date(),messageStatus:"Pending",messageType},user,selectedChatUser))
     }

     if(setLoading){setLoading(false)}
    // setLoading(false)

   //ai trigger is to fetch contacts afresh after ai has generated, just so that 
   //subjects are up to date in the touches sidebar (formerly contacts sidebar
    //you can put anything into ai trigger
   
     dispatch(saveAiTrigger(fullJobDetailsResponse && {...fullJobDetailsResponse,createdAt:new Date()}))
     dispatch(fetchAllContactForOneUser())

     //I NEED THIS TO TRIGGER THE SUBJECT TO CHANGE ON THE TOUCHES INBOX - SO DONT DELETE
     dispatch(saveSubjectChangeTriggerAfterEmailIsSent( fullJobDetailsResponse && {...fullJobDetailsResponse,createdAt:new Date()} ))
}



export const updateUserBroadcast = (updatedParagraphs,user,selectedChatUser) => async (dispatch) => {
  //console.log("MESSAGE IS IN PHASE 2:", user.uid);
  
  try {
      //console.log("Fetching the user itself:", user.uid);
      
      // Query contacts collection where contacterId matches the user's uid

      console.log("USER IN UPDATE MESSAGE--->",user)
      console.log("CONTACT IN UPDATE MESSAGE--->",selectedChatUser)

      const contactsSnapshot = db.collection('users').doc(user && user.uid)

      const contactDoc = db.collection('contacts').doc(selectedChatUser && selectedChatUser.uid)
         
    contactsSnapshot.get().then(async(doc)=>{ 


      if (doc.exists) {

        //console.log("RAW MESSAGE IS -->", updatedParagraphs)
        let updatedMessage =  {...doc.data().message} //- DO YOU REALLY NEED THIS ? SINCE YOU'RE OVERWRITING EVERYTHING? - NOV 6 2025 DAGOGO

        

          updatedMessage.firstParagraph = updatedParagraphs && updatedParagraphs.firstParagraph
         updatedMessage.secondParagraph = updatedParagraphs &&  updatedParagraphs.secondParagraph
          updatedMessage.thirdParagraph =  updatedParagraphs && updatedParagraphs.thirdParagraph
          updatedMessage.bulletPoints =  updatedParagraphs && updatedParagraphs.bulletPoints
          updatedMessage.subject =  updatedParagraphs && updatedParagraphs.subject
          updatedMessage.createdAt =  updatedParagraphs && updatedParagraphs.createdAt
          updatedMessage.messageStatus =  updatedParagraphs && updatedParagraphs.messageStatus
          updatedMessage.messageType =  updatedParagraphs && updatedParagraphs.messageType?updatedParagraphs.messageType:"Email"

         //console.log("UPDATED UPDATED MESSAGE IS -->", updatedMessage)

         contactDoc.update({
          messageQueue: firebase.firestore.FieldValue.arrayUnion(updatedMessage)
        }).then(() => contactDoc.get())
        .then((doc) => {
          if (doc.exists) {
            dispatch(setCurrentChat(doc.data()));
          }
        })

        contactsSnapshot.update({
          message:updatedMessage
        })
        .then(() => {
          //console.log("Message Updated Successfully in ut1@nurturer")
         // notifyInvite()
        })


         
      }
     
    }) 
    
  } catch (error) {
      const errorMessage = error.message;
      console.log('FAILED TO UPDATE EMILY WHITE AFTER AI GENERATED HER MESSAGE:', errorMessage);
      console.log("FAILED TO UPDATE EMILY WHITE AFTER AI GENERATED HER MESSAGE:", user.uid);
     
  }
};



export const updateUserBroadcastWithNotif = (updatedParagraphs,user,selectedChatUser,notifyInvite) => async (dispatch) => {
  //console.log("MESSAGE IS IN PHASE 2:", user.uid);
  
  try {
      //console.log("Fetching the user itself:", user.uid);
      
      // Query contacts collection where contacterId matches the user's uid

      console.log("USER IN UPDATE MESSAGE--->",user)
      console.log("CONTACT IN UPDATE MESSAGE--->",selectedChatUser)

      const contactsSnapshot = db.collection('users').doc(user && user.uid)

      const contactDoc = db.collection('contacts').doc(selectedChatUser && selectedChatUser.uid)
         
    contactsSnapshot.get().then(async(doc)=>{ 


      if (doc.exists) {

      // Build updatedMessage safely
                 let updatedMessage = {
                   firstParagraph: updatedParagraphs?.firstParagraph ?? " ",
                   secondParagraph: updatedParagraphs?.secondParagraph ?? " ",
                   thirdParagraph: updatedParagraphs?.thirdParagraph ?? " ",
                   bulletPoints: updatedParagraphs?.bulletPoints ?? [],
                   subject: updatedParagraphs?.subject ?? " ",
                   messageType: updatedParagraphs?.messageType ?? "Email",
                 };
                 
                 // Get existing data
                 const data = doc.data();
                 const userQueryMsgArray = data.queryMsg || [];
                 
                 // Find index of message with same messageType
                 const messageTypeToMatch = updatedMessage.messageType;
                 
                 const existingIndex = userQueryMsgArray.findIndex(
                   (msg) => msg.messageType === messageTypeToMatch
                 );
                 
                 // Create updated array
                 let updatedUserQueryMsgArray;
                 
                 if (existingIndex !== -1) {
                   // ✅ Replace the matching message
                   updatedUserQueryMsgArray = [...userQueryMsgArray];
                   updatedUserQueryMsgArray[existingIndex] = {
                     ...userQueryMsgArray[existingIndex],
                     ...updatedMessage,
                   };
                 } else {
                   // ✅ No matching messageType → append new message
                   updatedUserQueryMsgArray = [
                     ...userQueryMsgArray,
                     updatedMessage,
                   ];
                 }
                 
                 // Update Firestore
                 await contactsSnapshot.update({
                   queryMsg: updatedUserQueryMsgArray,
               }).then(() => contactDoc.get())
        .then((doc) => {
          if (doc.exists) {
            //updating the user to have the latest query msg
            dispatch(loginSuccess({ user:document.data(), uid:document.data().uid }))
          }
        })
          




         //UPDATING THE USER'S queryMsg array - END



         //NOW, UPDATING THE CONTACTS LAST MESSAGE
          contactDoc.get()
         .then((doc)=>{
          if (doc.exists) {
           const data = doc.data()
            const messageQueue = data.messageQueue || [];
       
         if (messageQueue.length === 0) {
           console.error("No messages in queue for contact doc of a contact");
           return;
         }
       
         // Replace the last element
         const updatedQueue = [...messageQueue];
         updatedQueue[updatedQueue.length - 1] = {
           ...updatedQueue[updatedQueue.length - 1],
           ...updatedMessage, // merge updates
         };

         contactDoc.update({
          messageQueue: updatedQueue,
        }).then(() => contactDoc.get())
        .then((doc) => {
          if (doc.exists) {
            dispatch(setCurrentChat(doc.data()));
          }
        })
          }

         })
        // NOW, UPDATING THE CONTACTS LAST MESSAGE -END
        

        contactsSnapshot.update({
          message:updatedMessage //OH i SEE THAT I USED TO UPDATE THE MESSAGE FIELD, WELL I AM NOT USING IT, IT JUST EAVE IT CUZ OF THE .THEN BELOW
        })
        .then(() => {
          //console.log("Message Updated Successfully in ut1@nurturer")
          notifyInvite()
        })


         
      }
     
    }) 
    
  } catch (error) {
      const errorMessage = error.message;
      //console.log('Error updating user message:', errorMessage);
      //console.log("MESSAGE HAS FAILED IN CATCH:", user.uid);
     
  }
};



export const updateUserChat = (selectedChatUser,newBulletPoint) => async (dispatch) => {


  let updatedBulletPoints = [...selectedChatUser.message.bulletPoints]
  let updatedMessage = {...selectedChatUser.message}

  if(updatedBulletPoints.filter((item)=>(item.id === newBulletPoint.id)).length ){
    //console.log("ITS THERE SO WE REMOVE IT--->")
    updatedBulletPoints = updatedBulletPoints.filter((item)=>(item.id !== newBulletPoint.id))
  }
  else{
    //console.log("ITS NOT THERE,SO WE ADD IT--->")

    updatedBulletPoints = [...updatedBulletPoints,newBulletPoint]
  }

  updatedMessage = {...selectedChatUser.message,bulletPoints:updatedBulletPoints}
 
  
  var fetchUsers = db.collection('users').doc(selectedChatUser.uid)
 
  fetchUsers.update({
    message:updatedMessage
  })
  .then(() => {
    return fetchUsers.get(); // fetch updated document
  })
  .then((doc) => {
    if (doc.exists) {
      const user = doc.data();
      dispatch(setCurrentChat(user)); // return as array if needed
    }
  }).catch((error) => {
      var errorMessage = error.message;
      //console.log('Error fetching profile', errorMessage);
      dispatch(fetchUsersFailed({ errorMessage }));
});

};




export const fetchRealTimeUsers = (uid) => async (dispatch) => {
        dispatch(fetchUsersPending());
      
    const unsubscribe = db.collection("users")
    .where("uid", "!=", uid)
    .onSnapshot((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
        // if(doc.data().uid != uid){
         users.push(doc.data());
        // }
        });
        dispatch(fetchRealTimeUsersSuccess(users));
        //console.log("RealTime Fetched Users: ", users);
    });

    return unsubscribe;
};


export const initiateConnection = (type, user1, user2, usedConnection) => (dispatch) => {
    dispatch(fetchConnection(user1, user2, type, usedConnection));
};


  export const fetchConnection = (user1, user2, type, usedConnection) => async (dispatch) => {
        var connect = db.collection("connections")
        connect = connect.where("user1", "==", user1)
        connect = connect.where("user2", "==", user2)
        // connect = connect.where("type", "==", type)
        connect.get()
        .then((querySnapshot) => {
            if(querySnapshot.empty){
                //console.log("No such document");
                const res = db.collection('connections').add({
                user1: user1,
                user2: user2, 
                type: type, 
                status: 'pending', 
                invited_amt: type == 1 ? 1 : 0, 
                skipped_amt: type == 0 ? 1 : 0,
                })
                .then((docRef) => {
                  //console.log("created new connection successfully!");
                  const messageText = 'Hello, I will like to connect with you. Kindly accept my Invite. Cheers!';
                  dispatch(sendChat({
                        messageText,
                        user1: user1,
                        user2: user2,
                      }))
                 //after sending default chat message, then update usedConnection

                  if(type == 1){
                    //console.log('Update Used Connection:- ', docRef);
                    var userRef = db.collection("users").doc(user1);
                    userRef.update({
                       usedConnection: usedConnection + 1,
                   })
                   .then(() => {
                       const usedConnectionCount = usedConnection + 1;
                     //console.log('Used connection updated:- ', usedConnection);
                     dispatch(updateUsedConnection({ usedConnectionCount }));
                   })
                   .catch((error) => {
                     var errorMessage = error.message;
                     //console.log('Error updating used connection:', errorMessage);
                   });
                  }

                })
                .catch((err) => {
                  var errorMessage = err.message;
                  //console.log('error creating new connection: ', errorMessage);
                });
            }else{
                //update record

                 //console.log('Type is: ', type);
                querySnapshot.forEach((doc) => {

                //console.log('Fetched Doc: ', doc.data());
                // //console.log('Doc ID: ', doc.id);
                const docID = doc.id;
                const docType = doc.data().type;
                const skipped_amt = doc.data().skipped_amt;
                const invited_amt = doc.data().invited_amt;

                if(type == 1 && doc.data().type == 1 || type == 0 && doc.data().type == 1){
                 var errorMessage = 'You have already invited this user';
                 //console.log('Error Msg: ', errorMessage);
                 dispatch(initiateFailed({ errorMessage }));
                }else if(type == 1 && doc.data().type == 0){
                 var errorMessage = 'You cannot invite, untill you undo this user from skipped';
                 //console.log('Error Msg: ', errorMessage);
                 dispatch(initiateFailed({ errorMessage }));
                }else if(type == 0 && doc.data().type == 0){
                  //update Firestore
                  //console.log('Type is 0: and doc data is : 0');
                db.collection("connections").doc(docID).set({
                user1: doc.data().user1,
                user2: doc.data().user2,
                type: docType,
                status: doc.data().status,
                invited_amt:  type == 1 ? invited_amt + 1 : invited_amt,
                skipped_amt: type == 0 ? skipped_amt + 1 : skipped_amt,
                }).then(() => {
                //console.log('updated connect');
                })
                .catch((error) => {
                var errorMessage = error.message;
                //console.log('error updating connect: ', errorMessage);
                });

               }

                });
                
            }
        })
        .catch((error) => {
            //console.log("Error fetching connections: ", error.message);
        });
};
  

export const fetchRealTimeConnections = (uid) => async (dispatch) => {
    const unsubscribe = db.collection("connections")
    .where("user1", "==", uid)
    .onSnapshot((querySnapshot) => {
        const connects = [];
        querySnapshot.forEach((doc) => {
        // if(doc.data().uid != uid){
         connects.push(doc.data());
        // }
        });
        dispatch(initiateSuccess(connects));
        //console.log("connections fetched for user1: ", connects);
    });

    return unsubscribe;
};

export const fetchRealTimeConnections2 = (uid) => async (dispatch) => {
    const unsubscribe = db.collection("connections")
    .where("user2", "==", uid)
    .onSnapshot((querySnapshot) => {
        const connects = [];
        querySnapshot.forEach((doc) => {
        // if(doc.data().uid != uid){
         connects.push(doc.data());
        // }
        });
        dispatch(initiateSuccess2(connects));
        //console.log("connections fetched for user2: ", connects);
    });

    return unsubscribe;
};


    export const fetchConnectedUsers = (uid) => async (dispatch) => {

        var unsubscribe = db.collection("connections")
        unsubscribe = unsubscribe.where("user1", "==", uid)
        unsubscribe = unsubscribe.where("invited_amt", "==", 1)
        // const unsubscribe = db.collection("connections")
        // .where("user1", "==", uid)
        unsubscribe.onSnapshot((querySnapshot) => {
            const users = [];
            querySnapshot.forEach((doc) => {
            // if(doc.data().uid != uid){
            users.push(doc.data().user2);
            // }
            });
            // dispatch(fetchRealTimeUsersSuccess(users));
            //console.log("Connected Users ID for USER 1: ", users);
            /*if(users.length > 0  ){*/
                db.collection('users')
               // .where('uid', 'in', users)
                .get()
                .then((snapshot) => {
                    const connectedUsers = snapshot.docs.map((doc) => ({ ...doc.data() }));
                    //console.log('Connected Users Data, ', connectedUsers);
                    dispatch(fetchConnectedUserSuccess(connectedUsers));
            }).catch((error) => {
                    var errorMessage = error.message;
                    //console.log('Error Connected Users Data', errorMessage);
                    dispatch(fetchUsersFailed({ errorMessage }));
            });
        
           /* }*/
    
        });
    
        return unsubscribe;
        };
    

        export const fetchConnectedUsers2 = (uid) => async (dispatch) => {
        
            var unsubscribe = db.collection("connections")
            unsubscribe = unsubscribe.where("user2", "==", uid)
            unsubscribe = unsubscribe.where("invited_amt", "==", 1)
            // const unsubscribe = db.collection("connections")
            // .where("user1", "==", uid)
            unsubscribe.onSnapshot((querySnapshot) => {
                const users = [];
                querySnapshot.forEach((doc) => {
                // if(doc.data().uid != uid){
                users.push(doc.data().user1);
                // }
                });
                // dispatch(fetchRealTimeUsersSuccess(users));
                //console.log("Connected Users ID for User2 : ", users);
                /*if(users.length > 0){*/
                    db.collection('users')
                    .where('uid', 'in', users)
                    .get()
                    .then((snapshot) => {
                        const connectedUsers = snapshot.docs.map((doc) => ({ ...doc.data() }));
                        //console.log('Connected Users Data for User2, ', connectedUsers);
                        dispatch(fetchConnectedUserSuccess(connectedUsers));
                }).catch((error) => {
                        var errorMessage = error.message;
                        //console.log('Error Connected Users Data for user 2', errorMessage);
                        dispatch(fetchUsersFailed({ errorMessage }));
                });
            
                /*}*/
        
            });
        
            return unsubscribe;
            };
        
       

            export const updateConnection = (user1, user2, status, history) => async (dispatch) => {
                var connect = db.collection("connections")
                connect = connect.where("user1", "==", user1)
                connect = connect.where("user2", "==", user2)
                connect.get()
                .then((querySnapshot) => {
                    if(querySnapshot.empty){
                        //console.log("No such document, cannot update connections");
                    }else{
                    // check for status type
                        //update record
                        querySnapshot.forEach((doc) => {
                            const docID = doc.id;
                            if(status == 'accepted'){
                                db.collection("connections").doc(docID).set({
                                    user1: doc.data().user1,
                                    user2: doc.data().user2,
                                    type: doc.data().type,
                                    status: status,
                                    invited_amt:  doc.data().invited_amt,
                                    skipped_amt: doc.data().skipped_amt,
                                    }).then(() => {
                                    //console.log('updated connections');
                                    alert('Accepted Connection Successfully');
                                    dispatch(clearUser());
                                    dispatch(clearChat());
                                    window.location.href = '/candidates';
                                    })
                                    .catch((error) => {
                                    var errorMessage = error.message;
                                    //console.log('error updating connections: ', errorMessage);
                                    });
                             }else{
                                db.collection("connections").doc(docID).delete().then(() => {
                                    //console.log("Connection successfully deleted!");
                                    //delete chats
                                    //first select chat collections
                                    //console.log('User1 is ',user1)
                                    //console.log('User2 is ',user2)
                                    var chats = db.collection("chats")
                                    chats = chats.where("user1", "==", user1)
                                    chats = chats.where("user2", "==", user2)
                                    chats.get()
                                    .then((querySnapshot) => {
                                        // const docArr = [];
                                        // Once we get the results, begin a batch
                                        var batch = db.batch();
                                        querySnapshot.forEach((doc) => {
                                            // docArr.push(doc.id);
                                            // //console.log('Doc ID: ',docArr);
                                            // For each doc, add a delete operation to the batch
                                             batch.delete(doc.ref);  
                                        });
                                        // Commit the batch
                                         return batch.commit();
                                        }).then(function() {
                                            // Delete completed!
                                              //console.log("Chats successfully deleted!");
                                              alert('Rejected Connection Successfully');
                                              dispatch(clearUser());
                                              dispatch(clearChat());
                                              window.location.href = '/candidates';
                                        })
                                    
                                    .catch((error) => {
                                        //console.log("Error fetching chats doc: ", error.message);
                                    });

                                }).catch((error) => {
                                    console.error("Error removing connection: ", error.message);
                                });
                            }
                            });
                    }
                })
                .catch((error) => {
                    //console.log("Error fetching connections: ", error.message);
                });
              }



           
              export const rollOverConnections = () => async (dispatch) => {
                const collection = await db
                  .collection("users")
                  .get()
                collection.forEach(doc=> {
                  doc.ref
                    .update({
                      usedConnection: 0
                    })
                    .then(() => {
                        //console.log('Reset sucessfully');
                      })
                      .catch((error) => {
                        var errorMessage = error.message;
                        //console.log('Error resetting connections', errorMessage);
                      });
                })
              }


              export const unMatchConnect = (user1, user2, history) => async (dispatch) => {

                var unmatch = db.collection('connections')
                unmatch = unmatch.where('user1','==',user1);
                unmatch = unmatch.where('user2','==',user2);
                unmatch.get().then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                    doc.ref.delete();
                  });
                }).then(() => {
                    var unchat = db.collection('chats')
                    unchat = unmatch.where('user1','==',user1);
                    unchat = unmatch.where('user2','==',user2);
                    unchat.get().then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                    doc.ref.delete();
                  });
                }).then(() => {
                    dispatch(resetConnects());
                    dispatch(fetchConnectedUsers(user1));
                    dispatch(fetchConnectedUsers2(user1));
                    alert('You have UnMatched Connection✔');
                    dispatch(clearUser());
                    dispatch(clearChat());
                    window.location.href = '/candidates';
                })            
                });
            
            };


        // export const fetchConnectedUsers = (uid) => async (dispatch) => {
        //     //     dispatch(fetchUsersPending());
            
        //     var unsubscribe = db.collection("connections")
        
        //      //We define an async function
        //      async function getConnections() {
        //         const isUser1 = unsubscribe.where("user1", "==", uid).get();
        //         const isUser2= unsubscribe.where("user2", "==", uid).get();
        
        //         const [user1QuerySnapshot, user2QuerySnapshot] = await Promise.all([
        //           isUser1,
        //           isUser2
        //         ]);
        
        //         const user1Array = user1QuerySnapshot.docs;
        //         const user2Array = user2QuerySnapshot.docs;
        
        //         const usersArray = user1Array.concat(user2Array);
        
        //         return usersArray;
        //       }
        
        
        //       //We call the asychronous function
        //       const users = [];
        //       getConnections().then(result => {
        //         result.forEach(doc => {
        //           users.push(doc.data().user2);
        //           //console.log("Connected Users ID: ", users);
                  
        //         });
        //     }).then(() => {
        //         //console.log('Unto the next query: ', users);
        //         if(users.length > 0){
        //             db.collection('users')
        //             .where('uid', 'in', users)
        //             .get()
        //             .then((snapshot) => {
        //                 const connectedUsers = snapshot.docs.map((doc) => ({ ...doc.data() }));
        //                 //console.log('Connected Users Data, ', connectedUsers);
        //                 dispatch(fetchConnectedUserSuccess(connectedUsers));
        //         }).catch((error) => {
        //                 var errorMessage = error.message;
        //                 //console.log('Error Connected Users Data', errorMessage);
        //                 dispatch(fetchUsersFailed({ errorMessage }));
        //         });
        //         }

        //     });
        
        //     return unsubscribe;
        //     };
        