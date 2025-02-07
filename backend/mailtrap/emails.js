// creating one email
import { mailtrapClient } from "./mailtrap.config.js"
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailsTemplate.js"
import {sender} from './mailtrap.config.js'
 
export const sendVerificationEmail= async (email, verificationToken)=> {
    const recipient = [{email : email}]

   

    try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Verify your email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
			category: "Email Verification",
		});
    
        console.log("Email sent successfully", response);


    } catch (error) {
        console.error('error sending verification', error)
        throw new Error(`Error sending email verification ${error}`)
    }
}


 