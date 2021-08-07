import {formSchema} from './config.js';

const verifyElmRequiredValidation = (elm, typeValidation) => {

    let keys = Object.keys(formSchema)
    let schemaIncludeValidation;

    keys.forEach( key => {
        if( key !== elm.name ) return;
        schemaIncludeValidation = formSchema[key][typeValidation]
    })

    return schemaIncludeValidation;
}

export const required = (elm) => {

    let typeValidation = 'required'
    let required = verifyElmRequiredValidation(elm, typeValidation)

    if( !required ) {
        return {
            code: 'OK',
            success: true,
            message: null,
            data: null
        }
    }
    
    if( elm.value === '' ) {
        return {
            code: 'VALIDATE-ERR',
            success: false,
            message: `${elm.name} is requred`,
            data: {
                elm,
                typeValidation
            }
        }
    }
    
    return {
        code: 'OK',
        success: true,
        message: null,
        data: null
    } 
}

export const min = (elm) => {

    let typeValidation = 'min'
    let required = verifyElmRequiredValidation(elm, typeValidation)
    let n = required;

    if( !required ) {
        return {
            code: 'OK',
            success: true,
            message: null,
            data: null
        }
    }

    if( elm.value.length < n ) {
        return {
            code: 'VALIDATE-ERR',
            success: false,
            message: `${elm.name} must contain more than ${n} characters`,
            data: {
                elm,
                typeValidation: 'min'
            }
        }
    }
    return {
        code: 'OK',
        success: true,
        message: null,
        data: null
    } 
}

export const max = (elm) => {

    let typeValidation = 'max'
    let required = verifyElmRequiredValidation(elm, typeValidation)
    let n = required;

    if( !required ) {
        return {
            code: 'OK',
            success: true,
            message: null,
            data: null
        }
    }

    if( elm.value.length > n ) {
        return {
            code: 'VALIDATE-ERR',
            success: false,
            message: `${elm.name} cannot contain more than ${n} characters`,
            data: {
                elm,
                validation: 'max'
            }
        }
    }
    return {
        code: 'OK',
        success: true,
        message: null,
        data: null
    } 
}

export const pattern = (elm) => {

    let typeValidation = 'pattern'
    let required = verifyElmRequiredValidation(elm, typeValidation)
    if( !required ) {
        return {
            code: 'OK',
            success: true,
            message: null,
            data: null
        }
    }

    let pattern = required[0];
    let customMessage = required[1] || 'Pattern error ocurred';
    
    if( !pattern.test(elm.value) ) {
        return {
            code: 'VALIDATE-ERR',
            success: false,
            message: customMessage,
            data: {
                pattern,
                elm,
                typeValidation
            }
        }
    }
    return {
        code: 'OK',
        success: true,
        message: null,
        data: null
    } 
}

