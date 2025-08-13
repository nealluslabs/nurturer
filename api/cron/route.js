import axios from 'axios';

import firebase from "firebase/app";
import "firebase/firestore";
  
import { db, fb, auth, storage } from 'src/config/firebase';


export const UpdateAllContacts = (uid) => async (dispatch) => {
    try {
      const fetchUsers = db.collection('contacts');
      console.log("Fetching all contacts...");
  
      const snapshot = await fetchUsers.get();
  
      if (snapshot.empty) {
        console.log("No contacts found.");
        return;
      }
  
      const batch = db.batch(); // Use batch to update efficiently
  
      snapshot.forEach((doc) => {
        const data = doc.data();
  
        if (data.sendDate) {
          const currentSendDateNum = Number(data.sendDate);
  
          if (!isNaN(currentSendDateNum)) {
            const updatedSendDate = String(currentSendDateNum - 1);
            console.log(`Updating doc ${doc.id}: ${data.sendDate} -> ${updatedSendDate}`);
  
            batch.update(doc.ref, { sendDate: updatedSendDate });
          } else {
            console.warn(`sendDate is not a number for doc ${doc.id}:`, data.sendDate);
          }
        } else {
          console.warn(`No sendDate field found for doc ${doc.id}`);
        }
      });
  
      await batch.commit();
      console.log("All matching contacts updated successfully.");
    } catch (error) {
      console.error("Error updating contacts:", error.message);
      dispatch(fetchUsersFailed({ errorMessage: error.message }));
    }
  };
  