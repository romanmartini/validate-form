import { configForm, optionFormSchema } from './config.js'

configForm({
    idForm: 'singinForm',
    idSubmit: 'btnSignInForm',
    fieldNames: ['name', 'email', 'password' ,'address' ,'city' ,'zip-z'],
    classErrorMessage: 'error-message',
    classError: 'error',
    classSuccess: 'success'
})

optionFormSchema({
    "name": {
        min: 3,
        max: 30,
        pattern: [/^[a-z ]+$/i, 'Name only allows alphabetic characters']
    },
    "email": {
        required: false,
        min: 3,
        max: 30,
        pattern: [/^[a-z]*@*[a-z]+$/i, 'Email invalid']
    },
    "password": {
        required: true,
        min: 3,
        max: 30
    },
    "address": {
        required: true,
        max: 30
    },
    "city": {
        min: 3,
        max: 30
    },
    "zip-z": {
        min: 3,
        max: 30
    }
})