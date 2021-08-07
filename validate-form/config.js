import {validateForm} from './validateForm.js'

export let $form;
export const $formElements = {};
export let formSchema;
export let errorClassMessage;
export let errorClass;
export let successClass;
const fieldNames = [];

export const configForm = (obj) => {

    const {idForm, fieldNames, idSubmit, classErrorMessage, classError, classSuccess} = obj;

    setFormById(idForm);
    addFieldName(fieldNames);
    setFormElements();
    setNameMessageErrorClass(classErrorMessage);
    setNameErrorClass(classError);
    setNameSuccessClass(classSuccess);
    addListen(idSubmit);
}

export const optionFormSchema = function(schema) {

    let keysSchema = Object.keys(schema);
    let fieldNames = getFieldNames()
    keysSchema.forEach( key => {
        if ( !fieldNames.includes(key) ) throw Error(`the key with the name "${key}" does not exist in the DOM form`);
    })
    setFormSchema(schema)
}

const addListen = (id) => {

    $form.addEventListener('change', e =>setFormElements());

    $form.addEventListener('click', e => {
        e.preventDefault();
        if(e.target.matches(`#${id}`)){
            validateForm();
            $form.addEventListener('change', e => validateForm())
        } 
    })
}

export const setFormElements = () => {
    fieldNames.forEach( field => {
        if( !$form[field] ) throw Error(`the field with the name "${field}" does not exist in the DOM form`);
        $formElements[field] = $form[field];
    })
}

export const getAllFields = () => {
    let keys = Object.keys($formElements);
    return keys.map( key => $formElements[key]);
}

const getFieldNames = () => fieldNames;
const setFormById = (id) => $form = document.getElementById(id);
const addFieldName = (names) => names.forEach( name => fieldNames.push(name));
const setNameErrorClass = (className) => errorClass = className;
const setNameSuccessClass = (className) => successClass = className;
const setNameMessageErrorClass = (className) => errorClassMessage = className;
const setFormSchema = (objectOption) => formSchema = objectOption