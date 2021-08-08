import {formSchema} from "./model.js";

formSchema.setSelectors({
    nameClassLoad: 'load',
    nameClassError: 'error',
    nameClassSuccess: 'success',
    nameClassMessageError: 'error-message',
    nameIdSubmit: 'btnSignInForm'
})

formSchema.run()
