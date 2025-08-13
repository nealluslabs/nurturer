i
import "firebase/firestore";
import admin from 'firebase-admin';

if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.PROJECT_ID,
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
  }
  
  const db = admin.firestore();


  
//import { db, fb, auth, storage } from 'src/config/firebase';


export default async function handler(req, res) {
  try {
    const snapshot = await db.collection('contacts').get();

    if (snapshot.empty) {
      return res.status(200).json({ message: "No contacts found." });
    }

    const batch = db.batch();

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.sendDate) {
        const currentSendDateNum = Number(data.sendDate);
        if (!isNaN(currentSendDateNum)) {
          let updatedSendDate;
          if (currentSendDateNum === 0) {
            updatedSendDate = String(data.frequency ?? 0);
          } else {
            updatedSendDate = String(currentSendDateNum - 1);
          }
          batch.update(doc.ref, { sendDate: updatedSendDate });
        }
      }
    });

    await batch.commit();
    return res.status(200).json({ message: "Contacts updated successfully." });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
  
  