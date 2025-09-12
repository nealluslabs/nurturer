import {fetchUsersPending, fetchUsersSuccess, fetchUsersFailed, fetchContactsSuccess, fetchContactsFailed, fetchRealTimeUsersSuccess, fetchConnectedUserSuccess,
    initiatePending, initiateSuccess, initiateSuccess2, initiateFailed, clearUser, resetConnects} from 'src/redux/reducers/user.slice';
 import { updateUsedConnection } from 'src/redux/reducers/auth.slice';
    import { db, fb, auth, storage } from '../../config/firebase';
import { sendChat } from './chat.action';
import { result } from 'lodash';
import { clearChat } from 'src/redux/reducers/chat.slice';
import { setCurrentChat } from 'redux/reducers/chat.slice';
import { saveChatGptAnswer, saveEditedParagraphs,saveAiTrigger } from 'redux/reducers/user.slice';
import axios from 'axios';

import firebase from "firebase/app";
import "firebase/firestore";
  

export const fetchAllUsers = (uid) => async (dispatch) => {
    dispatch(fetchUsersPending());
    // db.collection('users').where("uid", "!=", fb.auth().currentUser.uid)
    var fetchUsers = db.collection('users')
    // fetchUsers = fetchUsers.where("uid", "!=", uid)
    console.log("This should show all the users", fetchUsers);
    fetchUsers = fetchUsers.where("intro", "!=", null)
    fetchUsers.get()
    .then((snapshot) => {
        const users = snapshot.docs.map((doc) => ({ ...doc.data() }));
        const filteredUser = users.filter(user => user.uid != uid);
        console.log('Filtered User\'s', filteredUser );
        // }
        // dispatch(fetchUsersSuccess(users));
        dispatch(fetchUsersSuccess(filteredUser));
}).catch((error) => {
        var errorMessage = error.message;
        console.log('Error fetching profile', errorMessage);
        dispatch(fetchUsersFailed({ errorMessage }));
});

};

export const fetchAllContactForOneUser = (uid) => async (dispatch) => {
    dispatch(fetchUsersPending());
    
    try {
        console.log("Fetching contacts for user:", uid);
        
        // Query contacts collection where contacterId matches the user's uid
        const contactsSnapshot = await db.collection('contacts')
            .where("contacterId", "==", uid)
            .get();
        
        if (contactsSnapshot.empty) {
            console.log("No contacts found for user:", uid);
            dispatch(fetchContactsSuccess([]));
            return;
        }
        
        // Map the documents to extract data
        const contacts = contactsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        
        console.log("Successfully fetched contacts:", contacts);
        console.log("Total contacts found:", contacts.length);
        
        // Dispatch the contacts data to Redux store
        dispatch(fetchContactsSuccess(contacts));
        
    } catch (error) {
        const errorMessage = error.message;
        console.log('Error fetching contacts:', errorMessage);
        dispatch(fetchContactsFailed({ errorMessage }));
    }
};

export const generateAiMessage = (Frequency,Name,JobTitle,Company,Industry,Interests,setLoading,previousMessage,user,notifyInvite,selectedChatUser) => async (dispatch) => {
            
   if(setLoading){setLoading(true)}


   //AUG 29TH 2025 - USUALLY PROMPTS WILL BE EMAILS, BUT OCCASSIONALLY IF IT'S THE CONTACTS BIRTHDAY, OR A HOLIDAY, THEN A HOLIDAY PROMPT WILL BE SENT OUT
   //FOR NOW THOUGH WE WILL CHANGE THE PROMPT BASED ON IF ITS BOB JOHNSON (BIRTHDAY) OR EMILY WHITE (4TH OF JULY)

  //const apiEndpoint =`https://nurturer-helper-api.vercel.app/api/om/chatgpt`
 const apiEndpoint =`https://pmserver.vercel.app/api/om/chatgpt`

console.log("USER BEING PASSED INTO GENERATE AI MESSAGE--->",user)
  const prompt = 
    selectedChatUser && selectedChatUser.name === "Emily White"?

     


  ` Generate an email subject of 5 words maximum,wishing the user a Happy Fourth of July, and 3 really short paragraphs of text, and fill in this object and return it as your answer(keep the object in valid JSON).For the id in each object of the bulletPoints array, please keep the id in the object below,do not delete them when generating your own object.Finally for the subject, make sure to put an emoji at the end of the generated subject:
  {"subject":"Happy Fourth ofJuly",
  messageType:"Event",
  "messageStatus":"Pending"
   "firstParagraph":" ",
   "secondParagraph":" ",
   "thirdParagraph":" ",
   "bulletPoints":[
     {
      "bulletPointBold":" ",
      "bulletPointRest":" ",
      "link":" ",
      "id":"0",
     },{
       "bulletPointBold":" ",
       "bulletPointRest":" ",
       "link":" ",
       "id":"1",
     },{
       "bulletPointBold":" ",
       "bulletPointRest":" ",
       "link":" ",
       "id":"2",
     },{
       "bulletPointBold":" ",
       "bulletPointRest":" ",
       "link":" ",
       "id":"3",
     },{
       "bulletPointBold":" ",
       "bulletPointRest":" ",
       "link":" ",
       "id":"4",
     },
   ]
  } .The first paragraph should be about how you wish the receiver and everyone at their company,:${Company} a happy fourth of July.
      Don't start the paragraph with Dear ${Name}, just jump into the writing.
     second parargaph should be about how you are grateful for all the work they do in their industry: ${Industry}. Add a sentimental touch at this point.
     Also mention how you hope they can get a well deserved break today, and maybe even dabble in their interests: ${Interests}.
     The third Paragraph should be thanking them once again for the difference they make and wishing them  happy holidays.
     The Subject should be composed from the content of the paragraphs above and should have some sort of "Happy Fourth of July" phrase in it.
    in the JSON object you generate, there is no need to fill out the bulletPoints array, return the bulletPoints array as it is in the text above.

 Please go through the javascript object ${JSON.stringify(previousMessage)}, and try to adapt to my writing style,so you can sound like me,when providing your answer`




    :
    selectedChatUser && selectedChatUser.name === "Bob Johnson"?


      
    ` Generate an email subject of 5 words maximum,wishing the user a Happy Birthday, and 3 really short paragraphs of text, and fill in this object and return it as your answer(keep the object in valid JSON).For the id in each object of the bulletPoints array, please keep the id in the object below,do not delete them when generating your own object.Finally for the subject, make sure to put an emoji at the end of the generated subject:
    {"subject":"Happy Fourth ofJuly",
    messageType:"Event",
    "messageStatus":"Pending"
     "firstParagraph":" ",
     "secondParagraph":" ",
     "thirdParagraph":" ",
     "bulletPoints":[
       {
        "bulletPointBold":" ",
        "bulletPointRest":" ",
        "link":" ",
        "id":"0",
       },{
         "bulletPointBold":" ",
         "bulletPointRest":" ",
         "link":" ",
         "id":"1",
       },{
         "bulletPointBold":" ",
         "bulletPointRest":" ",
         "link":" ",
         "id":"2",
       },{
         "bulletPointBold":" ",
         "bulletPointRest":" ",
         "link":" ",
         "id":"3",
       },{
         "bulletPointBold":" ",
         "bulletPointRest":" ",
         "link":" ",
         "id":"4",
       },
     ]
    } .The first paragraph should be about how you wish the receiver a happy birthday and a year ahead filled with great moments,not just in relation to their job:${JobTitle},but in life as well.
        Don't start the paragraph with Dear ${Name}, just jump into the writing.
       second parargaph should be about how you are grateful for all the work they do in their industry: ${Industry}. Add a sentimental touch at this point.
       Also mention how you hope they can get a well deserved break today, and maybe even dabble in their interests: ${Interests}.
       The Subject should be composed from the content of the paragraphs above and should have some sort of "Happy Birthday" phrase in it.
       The third Paragraph should be wishing them future success at their company:${Company},and then say something witty about their hobby:${Interests},before finally wishing them success at it.
      in the JSON object you generate, there is no need to fill out the bulletPoints array, return the bulletPoints array as it is in the text above.
  
   Please go through the javascript object ${JSON.stringify(previousMessage)}, and try to adapt to my writing style,so you can sound like me,when providing your answer`

    :
  
  ` Generate an email subject of 5 words maximum, and 3 really short paragraphs of text and 5 articles to refer to, and fill in this object and return it as your answer(keep the object in valid JSON).For the id in each object of the bulletPoints array, please keep the id in the object below,do not delete them when generating your own object.Finally for the subject, make sure to put an emoji at the end of the generated subject:
     {"subject":" ",
     messageType:"Email",
     "messageStatus":"Pending"
      "firstParagraph":" ",
      "secondParagraph":" ",
      "thirdParagraph":" ",
      "bulletPoints":[
        {
         "bulletPointBold":" ",
         "bulletPointRest":" ",
         "link":" ",
         "id":"0",
        },{
          "bulletPointBold":" ",
          "bulletPointRest":" ",
          "link":" ",
          "id":"1",
        },{
          "bulletPointBold":" ",
          "bulletPointRest":" ",
          "link":" ",
          "id":"2",
        },{
          "bulletPointBold":" ",
          "bulletPointRest":" ",
          "link":" ",
          "id":"3",
        },{
          "bulletPointBold":" ",
          "bulletPointRest":" ",
          "link":" ",
          "id":"4",
        },
      ]
     } .The first paragraph should be about how you haven't spoken to ${Name} in ${Frequency} days and how you've been thinking about their role.
         Don't start the paragraph with Dear ${Name}, just jump into the writing.
        second parargaph should be about how you have found some articles that relate to their industry ${Industry}.
        The third paragraph should be about how you'd love to hear from them and you wish them luck in their future endeavors and hobbies: ${Interests}.
        The Subject should be composed from the content of the paragraphs above and should have some sort of "catch up" phrase in it.

     for each article, put in it's title into "bulletPointBold", it's source into "bulletPointRest" and a link to the article into "link"

     make each paragraph relevant to the user's job: ${JobTitle},company:${Company},industry:${Industry}  and interests:${Interests}.Please make sure each article fetched is from this year. Please go through the javascript object ${JSON.stringify(previousMessage)}, and try to adapt to my writing style,so you can sound like me,when providing your answer`


  const jobResponse = await axios.post(apiEndpoint,{prompt:prompt})

     console.log("OUR RESPONSE FROM OUR BACKEND, WHICH CALLS CHAT GPT-->",JSON.parse(jobResponse.data.text))

     const fullJobDetailsResponse = JSON.parse(jobResponse.data.text)

 

     if(fullJobDetailsResponse){
      dispatch(saveChatGptAnswer(fullJobDetailsResponse && {...fullJobDetailsResponse,createdAt:new Date()}))

      dispatch(saveEditedParagraphs(fullJobDetailsResponse && {...fullJobDetailsResponse,createdAt:new Date()}))

      dispatch(updateUserBroadcast({...fullJobDetailsResponse,createdAt:new Date()},user,selectedChatUser))
     }

     if(setLoading){setLoading(false)}

   //ai trigger is to fetch contacts afresh after ai has generated, just so that 
   //subjects are up to date in the touches sidebar (formerly contacts sidebar
    //you can put anything into ai trigger
   
     dispatch(saveAiTrigger(fullJobDetailsResponse && {...fullJobDetailsResponse,createdAt:new Date()}))

}



export const updateUserBroadcast = (updatedParagraphs,user,selectedChatUser) => async (dispatch) => {
  console.log("MESSAGE IS IN PHASE 2:", user.uid);
  
  try {
      console.log("Fetching the user itself:", user.uid);
      
      // Query contacts collection where contacterId matches the user's uid
      const contactsSnapshot = db.collection('users').doc(user && user.uid)

      const contactDoc = db.collection('contacts').doc(selectedChatUser && selectedChatUser.uid)
         
      const  userToUpdate =   contactsSnapshot.get().then(async(doc)=>{ 


        
      
      if (doc.exists) {

        console.log("RAW MESSAGE IS -->", updatedParagraphs)
        let updatedMessage =  {...doc.data().message}

        

          updatedMessage.firstParagraph = updatedParagraphs && updatedParagraphs.firstParagraph
         updatedMessage.secondParagraph = updatedParagraphs &&  updatedParagraphs.secondParagraph
          updatedMessage.thirdParagraph =  updatedParagraphs && updatedParagraphs.thirdParagraph
          updatedMessage.bulletPoints =  updatedParagraphs && updatedParagraphs.bulletPoints
          updatedMessage.subject =  updatedParagraphs && updatedParagraphs.subject
          updatedMessage.messageType =  updatedParagraphs && updatedParagraphs.messageType?updatedParagraphs.messageType:"Trigger"

         console.log("UPDATED UPDATED MESSAGE IS -->", updatedMessage)

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
          console.log("Message Updated Successfully in ut1@nurturer")
         // notifyInvite()
        })


         
      }
     
    }) 
    
  } catch (error) {
      const errorMessage = error.message;
      console.log('Error updating user message:', errorMessage);
      console.log("MESSAGE HAS FAILED IN CATCH:", user.uid);
     
  }
};



export const updateUserChat = (selectedChatUser,newBulletPoint) => async (dispatch) => {


  let updatedBulletPoints = [...selectedChatUser.message.bulletPoints]
  let updatedMessage = {...selectedChatUser.message}

  if(updatedBulletPoints.filter((item)=>(item.id === newBulletPoint.id)).length ){
    console.log("ITS THERE SO WE REMOVE IT--->")
    updatedBulletPoints = updatedBulletPoints.filter((item)=>(item.id !== newBulletPoint.id))
  }
  else{
    console.log("ITS NOT THERE,SO WE ADD IT--->")

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
      console.log('Error fetching profile', errorMessage);
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
        console.log("RealTime Fetched Users: ", users);
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
                console.log("No such document");
                const res = db.collection('connections').add({
                user1: user1,
                user2: user2, 
                type: type, 
                status: 'pending', 
                invited_amt: type == 1 ? 1 : 0, 
                skipped_amt: type == 0 ? 1 : 0,
                })
                .then((docRef) => {
                  console.log("created new connection successfully!");
                  const messageText = 'Hello, I will like to connect with you. Kindly accept my Invite. Cheers!';
                  dispatch(sendChat({
                        messageText,
                        user1: user1,
                        user2: user2,
                      }))
                 //after sending default chat message, then update usedConnection

                  if(type == 1){
                    console.log('Update Used Connection:- ', docRef);
                    var userRef = db.collection("users").doc(user1);
                    userRef.update({
                       usedConnection: usedConnection + 1,
                   })
                   .then(() => {
                       const usedConnectionCount = usedConnection + 1;
                     console.log('Used connection updated:- ', usedConnection);
                     dispatch(updateUsedConnection({ usedConnectionCount }));
                   })
                   .catch((error) => {
                     var errorMessage = error.message;
                     console.log('Error updating used connection:', errorMessage);
                   });
                  }

                })
                .catch((err) => {
                  var errorMessage = err.message;
                  console.log('error creating new connection: ', errorMessage);
                });
            }else{
                //update record

                 console.log('Type is: ', type);
                querySnapshot.forEach((doc) => {

                console.log('Fetched Doc: ', doc.data());
                // console.log('Doc ID: ', doc.id);
                const docID = doc.id;
                const docType = doc.data().type;
                const skipped_amt = doc.data().skipped_amt;
                const invited_amt = doc.data().invited_amt;

                if(type == 1 && doc.data().type == 1 || type == 0 && doc.data().type == 1){
                 var errorMessage = 'You have already invited this user';
                 console.log('Error Msg: ', errorMessage);
                 dispatch(initiateFailed({ errorMessage }));
                }else if(type == 1 && doc.data().type == 0){
                 var errorMessage = 'You cannot invite, untill you undo this user from skipped';
                 console.log('Error Msg: ', errorMessage);
                 dispatch(initiateFailed({ errorMessage }));
                }else if(type == 0 && doc.data().type == 0){
                  //update Firestore
                  console.log('Type is 0: and doc data is : 0');
                db.collection("connections").doc(docID).set({
                user1: doc.data().user1,
                user2: doc.data().user2,
                type: docType,
                status: doc.data().status,
                invited_amt:  type == 1 ? invited_amt + 1 : invited_amt,
                skipped_amt: type == 0 ? skipped_amt + 1 : skipped_amt,
                }).then(() => {
                console.log('updated connect');
                })
                .catch((error) => {
                var errorMessage = error.message;
                console.log('error updating connect: ', errorMessage);
                });

               }

                });
                
            }
        })
        .catch((error) => {
            console.log("Error fetching connections: ", error.message);
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
        console.log("connections fetched for user1: ", connects);
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
        console.log("connections fetched for user2: ", connects);
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
            console.log("Connected Users ID for USER 1: ", users);
            /*if(users.length > 0  ){*/
                db.collection('users')
               // .where('uid', 'in', users)
                .get()
                .then((snapshot) => {
                    const connectedUsers = snapshot.docs.map((doc) => ({ ...doc.data() }));
                    console.log('Connected Users Data, ', connectedUsers);
                    dispatch(fetchConnectedUserSuccess(connectedUsers));
            }).catch((error) => {
                    var errorMessage = error.message;
                    console.log('Error Connected Users Data', errorMessage);
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
                console.log("Connected Users ID for User2 : ", users);
                /*if(users.length > 0){*/
                    db.collection('users')
                    .where('uid', 'in', users)
                    .get()
                    .then((snapshot) => {
                        const connectedUsers = snapshot.docs.map((doc) => ({ ...doc.data() }));
                        console.log('Connected Users Data for User2, ', connectedUsers);
                        dispatch(fetchConnectedUserSuccess(connectedUsers));
                }).catch((error) => {
                        var errorMessage = error.message;
                        console.log('Error Connected Users Data for user 2', errorMessage);
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
                        console.log("No such document, cannot update connections");
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
                                    console.log('updated connections');
                                    alert('Accepted Connection Successfully');
                                    dispatch(clearUser());
                                    dispatch(clearChat());
                                    window.location.href = '/candidates';
                                    })
                                    .catch((error) => {
                                    var errorMessage = error.message;
                                    console.log('error updating connections: ', errorMessage);
                                    });
                             }else{
                                db.collection("connections").doc(docID).delete().then(() => {
                                    console.log("Connection successfully deleted!");
                                    //delete chats
                                    //first select chat collections
                                    console.log('User1 is ',user1)
                                    console.log('User2 is ',user2)
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
                                            // console.log('Doc ID: ',docArr);
                                            // For each doc, add a delete operation to the batch
                                             batch.delete(doc.ref);  
                                        });
                                        // Commit the batch
                                         return batch.commit();
                                        }).then(function() {
                                            // Delete completed!
                                              console.log("Chats successfully deleted!");
                                              alert('Rejected Connection Successfully');
                                              dispatch(clearUser());
                                              dispatch(clearChat());
                                              window.location.href = '/candidates';
                                        })
                                    
                                    .catch((error) => {
                                        console.log("Error fetching chats doc: ", error.message);
                                    });

                                }).catch((error) => {
                                    console.error("Error removing connection: ", error.message);
                                });
                            }
                            });
                    }
                })
                .catch((error) => {
                    console.log("Error fetching connections: ", error.message);
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
                        console.log('Reset sucessfully');
                      })
                      .catch((error) => {
                        var errorMessage = error.message;
                        console.log('Error resetting connections', errorMessage);
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
        //           console.log("Connected Users ID: ", users);
                  
        //         });
        //     }).then(() => {
        //         console.log('Unto the next query: ', users);
        //         if(users.length > 0){
        //             db.collection('users')
        //             .where('uid', 'in', users)
        //             .get()
        //             .then((snapshot) => {
        //                 const connectedUsers = snapshot.docs.map((doc) => ({ ...doc.data() }));
        //                 console.log('Connected Users Data, ', connectedUsers);
        //                 dispatch(fetchConnectedUserSuccess(connectedUsers));
        //         }).catch((error) => {
        //                 var errorMessage = error.message;
        //                 console.log('Error Connected Users Data', errorMessage);
        //                 dispatch(fetchUsersFailed({ errorMessage }));
        //         });
        //         }

        //     });
        
        //     return unsubscribe;
        //     };
        