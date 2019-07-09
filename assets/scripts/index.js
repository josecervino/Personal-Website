const state = {
    blurbVisible: true,
    contactFormVisible: false,
    tempStore: '',
}

/**
 * @method toggleContactForm
 * @method submitFormAndSendEmail
 * @method toggleContactFormEventListener
 */
const contactFormFunctionality = {
    /**
     * Visual toggle for contact form that simply reveals a hidden HTML element and hides the visible one. 
     * NOTE: Toggling activates a window event listener and modifies existing textContent. 
     * NOTE: This method depends on .submitFormAndSendEmail() method.
     */
    toggleContactForm: function () {
        const   blurbSection = document.getElementById('blurb-section'),
                contactButton = document.getElementById('contact-link'),
                contactFormSection = document.getElementById('contact-form-section');

        if (state.contactFormVisible) { // if the contact form is visible
            if (document.forms['contact-form'][0].value && 
                document.forms['contact-form'][1].value && 
                document.forms['contact-form'][2].value) this.submitFormAndSendEmail('contact-form');
            contactButton.textContent = 'Contact'; // * change the contact button text back to Contact
            
            contactFormSection.style.display = 'none'; // * make the contact form invisible
            state.contactFormVisible = false;

            blurbSection.style.display = 'block'; // * make the blurb visible
            state.blurbVisible = true;
            // de-activate blurb's animation

            // de-activate the window listener
        }
        else if (!state.contactFormVisible) {  // if the contact form is not visible
            blurbSection.style.display = 'none';  // * make the blurb invisible
            state.blurbVisible = false;
            // activate the blurb's animation

            contactFormSection.style.display = 'block';  // * make the contact form visible
            state.contactFormVisible = true;

            contactButton.textContent = 'Submit';  // * change the contact form button text to Submit

            // activate window event listener
        }
    },

    /**
     * Parses specified form for its name, email, and address input values to populate an email to send via the user's default email client.
     * 
     * @param {string} formName The name of the form specified in the HTML (as a string)
     * 
     * @returns {undefined} undefined
     * 
     * @example
     * let forms = {
     *      'form-name': {
     *          0:  {  // 0th index always the name
     *                  value: 'name';
     *              },
     *          1:  {  // 1st index always the email
     *                  value: 'email'
     *              },
     *          2:  {  // 2nd index always the message
     *                  value: 'message'
     *              }
     *      }
     * }
     * 
     * contactFormFunctionality.submitFormAndSendEmail('form-name')
     */
    submitFormAndSendEmail: function (formName) {
        let name = document.forms[formName][0].value,
            email = document.forms[formName][1].value, 
            message = document.forms[formName][2].value;

        // Clean values for mailto: syntax
        for (let i = 0; i < 3; i += 1) {
            if (i === 0) { //name
                state.tempStore = '';
                for (let i = 0; i < name.length; i += 1) {
                    if (name[i] === ' ') state.tempStore += '%20';
                    else state.tempStore += name[i];
                }
                name = state.tempStore;
                state.tempStore = '';
            }
            else if (i === 1) { //email
                //check that the email is the correct format
            } 
            else if (i === 2) { //message
                // const messageNewLines = /\r|\n/g.exec(message);
                for (let j = 0; j < message.length; j += 1) {
                    // if (messageNewLines.includes(i)) state.tempStore += '%0D%0A'
                    if (message[j] === ' ') state.tempStore += '%20';
                    else state.tempStore += message[j];
                }
                message = state.tempStore;
                state.tempStore = '';
            }
        }

        // send email
        document.location.href = `mailto:jciv.public@gmail.com?subject=Message%20From%20${name}&body=${message}`;

        // reset form values
        document.forms[formName][0].value = '';
        document.forms[formName][1].value = '';
        document.forms[formName][2].value = '';
    },

    toggleContactFormEventListener: function() {
        // use state to determine whether to add or remove event listener
        // set event listener on the inverse of the .container class
            // could be mouseover
    },
}
