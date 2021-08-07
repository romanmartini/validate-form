# Front-end validate-form

## Releases

- v0.0.1
# guide 
```
import { configForm, optionFormSchema } from './config.js'
```
```
configForm({
    idForm: 'singinForm',
    idSubmit: 'btnSignInForm',
    fieldNames: ['name', 'email', 'password' ,'address' ,'city' ,'zip-z'],
    classErrorMessage: 'error-message',
    classError: 'error',
    classSuccess: 'success'
})
```
### The ```configForm(object)``` method receives a configuration object:
- the ``` idForm ``` attribute must receive the id of the form.
- the ``` idSubmit ``` attribute must receive the id of the input to send.
- the ``` fieldNames ``` attribute receives an array with the value of the "name" attributes of the inputs.
- the ``` classErrorMessage ``` attribute.
- the ``` classError ``` attribute.
- the ``` classSuccess ``` attribute.

```
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
```
### The ```optionFormSchema(object)``` method receives a schema:
- ``` required ``` attribute .
- ``` min ``` attribute .
- ``` max ``` attribute .
- ``` pattern ``` attribute .