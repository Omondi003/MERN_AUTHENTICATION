// creating one email
import { mailtrapClient, sender } from "./mailtrap.config.js"
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailsTemplate.js"
  
 
export const sendVerificationEmail = async (email, verificationToken) => {
	const recipient = [{ email }];

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
		console.error(`Error sending verification`, error);

		throw new Error(`Error sending verification email: ${error}`);
	}
};

 
export const sendWelcomeEmail = async (email, name) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			template_uuid: "0416f135-842d-4f2a-9011-e4e087db74d3",
			template_variables: {
				company_info_name: "Auth Company",
				name: name,
			},
		});

		console.log("Welcome email sent successfully", response);
	} catch (error) {
		console.error(`Error sending welcome email`, error);

		throw new Error(`Error sending welcome email: ${error}`);
	}
};

export const sendPasswordResetEmail=async (email,resetUrl)=>{
   const recipient=[{email}]
      
   try { 
	const response= await mailtrapClient.send({
		from:sender,
		to:recipient,
		subject:"password reset",
		html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetUrl}", resetUrl),
		category:"password reset",
		
	})
	
   } catch (error) {
	
       console.error("Error sending a password reset Email", error)
	   throw new error(`Error sending a new password reset email ${error}`)
   }
}