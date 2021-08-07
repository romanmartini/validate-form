import { required, min, max, pattern } from './validates.js';
import { errorClassMessage, errorClass, successClass, $formElements, getAllFields} from './config.js'

export const validateForm = () => {

    let errRequired = validate( (field) => required(field) );
    let errMin = validate( (field) => min(field) );
    let errMax = validate( (field) => max(field) );
    let errPatern = validate( (field) => pattern(field) );

    let errors = {
        errRequired,
        errMin,
        errMax,
        errPatern
    };

    let succeess = errorHandler(errors) === 0;

    if ( succeess ) sendForm();
}

const sendForm = (method, url) => console.log('Submin Ok');

const validate = (cb) => {

    let keys = Object.keys($formElements);
    let errors = [];

    keys.forEach(elm => {
        let err = cb($formElements[elm]);
        if( !err.success ) errors.push(err);
    })
    return ( errors.length > 0 ) ? errors : null
}


const errorHandler = (errors) => {

    let count = 0;
    let keys = Object.keys(errors);
    let $errorFields = [];

    keys.forEach( key => {
        if ( !errors[key] ) return
        errors[key].forEach( errField => {
            count++
            $errorFields.push(errField)
        })
    })
    getAllFields().forEach(elm => anmationSuccess(elm))
    $errorFields.forEach(errField => anmationError(errField))
    return count;
}


const anmationError = (errField) => {

    let $field = errField.data.elm;
    let message = errField.message;
    let $alertError = document.createElement('div');
    let $contentText = document.createElement('div');

    $alertError.classList.add(errorClassMessage);
    $contentText.innerHTML = message;
    
    $alertError.appendChild($contentText);
    $field.insertAdjacentElement('afterend', $alertError)

    $field.classList.add(errorClass);
    $field.classList.remove(successClass);
}

const anmationSuccess = (elm) => {

    let $alertError = elm.parentElement.querySelectorAll(`.${errorClassMessage}`)
    if ( $alertError ) $alertError.forEach( elm => elm.outerHTML = '');
    elm.classList.add(successClass);
    elm.classList.remove(errorClass);
}