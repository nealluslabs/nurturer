import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import {
  updateHeaderText,
  updateImageText,
  updateImageBlob,
  updateFontText,
  updateLinkText,
  updateParagraphText,
  updateColor,
} from "src/redux/reducers/newsLetter.slice";
import { S3 } from "aws-sdk";

export const setHeaderText = (header, text) => (dispatch) => {
  dispatch(updateHeaderText({ header, text }));
};
export const setLinkText = (link, text) => (dispatch) => {
  dispatch(updateLinkText({ link, text }));
};
export const setParagraphText = (paragraph, text) => (dispatch) => {
  dispatch(updateParagraphText({ paragraph, text }));
};

export const setImageText = (image, text) => (dispatch) => {
  dispatch(updateImageText({ image, text }));
};

export const setImageBlob = (image, blob) => (dispatch) => {
  dispatch(updateImageBlob({ image, blob }));
};


export const setFontText = (font) => (dispatch) => {
  dispatch(updateFontText({ font }));
};
export const setBackgroundColor = (color) => updateColor({ color });


export const sendNewsletterToRecipients = (recipientArray,newsletter,notifyInvite,notifySkip) => async (dispatch) => {


  


const s3 = new S3({
  accessKeyId:process.env.REACT_APP_ACCESSKEYID_NURTURER,
  secretAccessKey:process.env.REACT_APP_SECRETACCESSKEY_NURTURER,
  region:process.env.REACT_APP_REGION,
});


const sesClient = new SESClient({
region: "eu-north-1", // e.g. "us-east-1" - come and remove these environemt variables before pushing o !
credentials: {
accessKeyId:process.env.REACT_APP_ACCESSKEYID_NURTURER,
secretAccessKey:process.env.REACT_APP_SECRETACCESSKEY_NURTURER,
},
});

console.log("WHAT IS OUR NEWSLETTER EVEN?--->",newsletter)



if(newsletter.firstParagraph === " " ||
newsletter.secondParagraph === " " ||
newsletter.thirdParagraph === " " ||
newsletter.fourthParagraph === " " ||

newsletter.firstHeader === " " ||
newsletter.secondHeader === " " ||

newsletter.firstLink === " " ||
newsletter.secondLink === " " ||

newsletter.firstImage === " " ||
newsletter.secondImage === " " ||
newsletter.thirdImage === " " 

){
  notifySkip("Please make sure you have edited all paragraphs,titles and images before submitting!")
  return


}

 if(!recipientArray || recipientArray.length === 0){
  notifySkip("No recipients selected, make sure you have selected at least one recipients before sending newsletter!")
  return
 }
 else{

  /**TRY TO SEND THE EMAIL HERE - START */

  const uploadToS3 = async (file) => {

    //console.log("PABOUT TO SEND TO S3--->",file)
  
  
    const params = {
      Body: file, // Blob
      Bucket:process.env.REACT_APP_S3_BUCKET_NEWSLETTER,
      Key:file &&  file.name, // Unique filename
      ContentType: 'image/png', // Ensure correct MIME type
      
    };
  
  
  
     
    
    const data = await s3.upload({
      Body: file, // Blob
      Bucket:process.env.REACT_APP_S3_BUCKET_NEWSLETTER,
      Key:file &&  file.name, // Unique filename
      ContentType: 'image/png', // Ensure correct MIME type
    
    }).promise();
    return data.Location; // S3 file URL 
  };


    console.log("WHAT IS THE IMAGE TYPE IN NEWSLETTER-->",newsletter)
  //NOv 2 - YOU GOTTA MAKE SURE THAT NEWSLETTER IMAGES BELOW ARE BLOBS, AND NOT SOMeTHING ELSE LIKE OBJECT URLS
    const imageLink1 =newsletter.firstImage ? await uploadToS3(newsletter.firstImage):''
    const imageLink2 = newsletter.secondImage ? await uploadToS3(newsletter.secondImage):''
    const imageLink3 = newsletter.thirdImage ?await uploadToS3(newsletter.thirdImage):''

  recipientArray.forEach(async(recipient)=>{  



  
  try {
    const params = {
      Destination: {
        ToAddresses: [recipient.email], // recipient email
      },
      Message: {
        Body: {
          Text: {
            Data: `${newsletter.firstHeader}.`,
          },
          Html: {
            Data: newsletter.newsletterType ==='1'?
            `
            <div style="max-width:600px;margin:0 auto;background-color:#ffffff;font-family:Arial, sans-serif;border-radius:8px;overflow:hidden;border:1px solid #eee;">
              
              <!-- Header section -->
              <div style="background-color:#6A1B9A;padding:20px;text-align:center;color:white;">
                <h2 style="margin:0;font-size:24px;"> ${newsletter.firstHeader || ''}</h2>
                <img src="${imageLink1}" alt="Profile Image" style="border-radius:50%;margin-top:15px;" width="100" height="100"/>
              </div>
              
              <!-- Body section -->
              <div style="padding:20px;text-align:center;color:#333;">
                
                <h3 style="margin-bottom:10px;"> ${newsletter.secondHeader || ''}</h3>
                
          
                <p style="margin:0 0 15px 0;font-size:15px;line-height:1.6;">
                  ${newsletter.firstParagraph || ''}
                </p>
          
                <p style="margin:0 0 15px 0;font-size:15px;line-height:1.6;">
                  ${newsletter.secondParagraph || ''}
                </p>
          
                <p style="margin:0 0 20px 0;font-size:15px;line-height:1.6;">
                  ${newsletter.thirdParagraph || ''}
                </p>
          
                <a href= ${newsletter.firstLink|| '#'} style="display:inline-block;margin:15px 0;color:#6A1B9A;font-weight:bold;text-decoration:none;">
                  CHECK OUR DEMO VIDEO
                </a>
          
                <div style="margin:20px 0;">
                  <img src="https://nurturer-newsletter.s3.eu-west-3.amazonaws.com/decorative-line.png" alt="Decorative line" style="width:100%;max-width:200px;"/>
                </div>
          
                <p style="margin:10px 0;font-size:15px;line-height:1.6;">
                ${newsletter.fourthParagraph || ''}
                </p>
          
                <!-- Image grid -->
                <div style="display:flex;justify-content:center;flex-wrap:wrap;gap:10px;margin-top:20px;">
                  <img src="${imageLink2}" alt="Image 1" style="border-radius:8px;width:48%;max-width:250px;"/>
                  <img src="${imageLink3}" alt="Image 2" style="border-radius:8px;width:48%;max-width:250px;"/>
                </div>
          
                <!-- Footer -->
                <div style="margin-top:30px;text-align:center;">
                  <p style="font-size:14px;margin:0;">Warm Regards,</p>
                  <p style="font-weight:bold;color:#6A1B9A;">– The Nurturer Team</p>
                </div>
              </div>
            </div>
            `

            :

            `
            <div style="max-width:600px;margin:0 auto;position:relative;background-color:#ffffff;font-family:Arial, sans-serif;border-radius:12px;overflow:hidden;border:1px solid #eee;">
  
            <!-- Profile Image -->
            <div style="text-align:center;padding:30px 20px 10px 20px;">
              <img src="${imageLink1 || ''}" alt="Profile" width="120" height="120"
                   style="border-radius:50%;display:block;margin:0 auto 15px auto;"/>
              <h2 style="margin:0;font-size:22px;color:#333;font-weight:bold;">${newsletter.firstHeader || ''}</h2>
            </div>
          
            



             <!-- Purple Decorative Bar Banner -->
             <div style="width:80px;height:10px;background-color:#6A1B9A;margin:20px auto 10px auto;border-radius:4px;"></div>

          
            <!-- Main Content -->
            <div style="padding:20px 30px;text-align:center;color:#333;">
          
              <h3 style="margin:0 0 15px 0;font-size:18px;font-weight:bold;">${newsletter.secondHeader || ''}</h3>
          
              <p style="margin:0 0 15px 0;font-size:15px;line-height:1.6;">
                ${newsletter.firstParagraph || ''}
              </p>
          
              <p style="margin:0 0 15px 0;font-size:15px;line-height:1.6;">
                ${newsletter.secondParagraph || ''}
              </p>
          
             
          
              <!-- Hardcoded CTA Link -->
              <a href="${newsletter.firstLink || '#'}"
                 style="display:inline-block;margin:20px 0;color:#6A1B9A;font-weight:bold;text-decoration:none;">
                CHECK OUR DEMO VIDEO
              </a>
          
              <p style="margin:0 0 20px 0;font-size:15px;line-height:1.6;">
                ${newsletter.thirdParagraph || ''}
              </p>

              <h3 style="margin:0 0 15px 0;font-size:18px;font-weight:bold;">${newsletter.thirdHeader || ''}</h3>

          
              <p style="margin:15px 0;font-size:15px;line-height:1.6;">
                ${newsletter.fourthParagraph || ''}
              </p>
          
              <!-- Two-Column Section -->
              <div style="display:flex;justify-content:center;align-items:center;flex-direction:column;flex-wrap:wrap;gap:10px;margin-top:20px;text-align:left;">
                <div style="flex:1;font-size:15px;line-height:1.6;">
                ${newsletter.fifthParagraph || ''}:
                </div>
                <div style="flex:1;text-align:center;">
                  <a href="${newsletter.secondLink || '#'}"
                     style="display:inline-block;margin:5px 0;color:#6A1B9A;font-weight:bold;text-decoration:none;">
                    COOL FAN PURCHASE LINK
                  </a>
                </div>
              </div>
          
           
          
              <!-- Footer -->
              <div style="margin-top:10px;text-align:center;">
                <p style="font-size:14px;margin:0;color:#555;">${newsletter.footerNote || 'STAY COOL & CONNECTED,'}</p>
                <p style="font-weight:bold;color:#6A1B9A;margin-top:5px;">${newsletter.footerName || 'Jane'}</p>
              </div>
          
            </div>
          </div>
          

` /**CLOSING  QUOTATOION TAG IS HERE (TO THE LEFT,BE CAREFUL NOT TO DELETE )*/
          }
        },
        Subject: {
          Data: ` ${newsletter.firstHeader || ''}`,
        },
      }, 
      Source: 'info@nurturer.ai'//process.env.SES_FROM_EMAIL, // must be a verified SES sender
    };

    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);

    //console.log("✅ Email sent successfully:", response.MessageId);
   // return response;
    notifyInvite("Newsletter sent out successfully!")
  } catch (error) {
    console.error("❌ Error sending email:", error);
    notifySkip("Error sending out newsletter, please try again!")
    throw error;
  }

})


 } //END OF ELSE BLOCK

  



   



}