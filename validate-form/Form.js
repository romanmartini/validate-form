import Validates from "./Validates.js";

class FormSchema extends Validates{

    $form;
    $formFields = [];
    loadClass;
    errorClass;
    errorClassMessage;
    successClass;
    idSubmit;
    static timeLastEvent = 0;
    $btnSubmit;

    constructor(idForm, object){

        super();
        let { ...rest } = object;

        this.$form = document.getElementById(idForm)

        for ( let key in rest ) {
            this[key] = rest[key]
            this[`${key}Err`] = []
            this.setAllFieldsByAttName(key)
        }
    }  
    
    setSelectors(object){
        let { nameClassLoad, nameClassError, nameClassMessageError, nameClassSuccess, nameIdSubmit } = object;
        this.loadClass = nameClassLoad;
        this.errorClass = nameClassError;
        this.errorClassMessage = nameClassMessageError;
        this.successClass = nameClassSuccess;
        this.idSubmit = nameIdSubmit;

        this.$btnSubmit = document.getElementById(nameIdSubmit)
    }
    
    setAllFieldsByAttName(name){
        let field = this.$form[name];
        this.validateElementDOM(field, name);
        this.$formFields.push(field);
    }

    run(){
        let errors = this.runValidations();
        this.handler(errors);
        this.addEventListenerChange();
        this.addEventListenerClick();
    }

    runValidations(){

        let errRequired = this.validate(this, (validateOpt, field) => this.required(validateOpt, field))
        let errMin = this.validate(this, (validateOpt, field) => this.min(validateOpt, field))
        let errMax = this.validate(this, (validateOpt, field) => this.max(validateOpt, field))
        let errPattern = this.validate(this, (validateOpt, field) => this.pattern(validateOpt, field))

        const errors = {
            errRequired,
            errMin,
            errMax,
            errPattern
        }
        
        return errors;
    }


    handler(errors){
        this.orderErrorByField(errors);
        let countErr = this.countError(errors);
        this.handlerSubmit(countErr);
        return console.log({ "count-errors": countErr, data: errors });
    }

    orderErrorByField(errors){
        this.$formFields.forEach(field => {
            this[`${field.name}Err`] = []
            for( let key in errors ) {
                errors[key].forEach(err => {
                    if (err.attribute !== field.name) return;
                    this[`${field.name}Err`].push(err)
                })
            }
        })
    }

    countError(errors){
        let count = 0;
        for( let key in errors ) errors[key].forEach(err => count++)
        return count;
    }

    addEventListenerClick(){

        this.$form.addEventListener('click', e => {
            
            e.preventDefault();
            if( e.target.matches(`#${this.idSubmit}`) ) {
                let errors = this.runValidations();
                this.handler(errors);
                this.handlerAnimations(e)
            }
        })
    }

    addEventListenerChange(){

        this.$form.addEventListener('keyup', e => {
        
            let fieldRequiredValidations = this[e.target.name];
            if ( !fieldRequiredValidations ) {
                throw new Error(`The ${e.target.name} field was not declared in the FormSchema instance`)
            } 

            this.animationLoad(e.target)
            if( FormSchema.timeLastEvent > 0 ) return
            FormSchema.timeLastEvent++;

            setTimeout( () =>  {
                let errors = this.runValidations();
                this.handler(errors);
                this.handlerAnimations(e)
                FormSchema.timeLastEvent = 0;
            },1000)

        })
    }

    handlerAnimations(e){
        if( e.type === 'keyup' ) this.keyupEventHandler(e);
        if( e.type === 'click' ) this.clickEventHandler();
    }

    keyupEventHandler(e){
        this.handlerFieldAnimations(e.target)
    }
    clickEventHandler(){
        this.$formFields.forEach(field => this.handlerFieldAnimations(field))
    }
    handlerFieldAnimations(field){
        let errByField = this[`${field.name}Err`];
        ( errByField.length === 0 )
            ? this.animationSuccess(field)
            : this.animationError(field, errByField);
    }

    animationLoad(field){
        field.classList.remove(this.errorClass)
        field.classList.remove(this.successClass)
        field.classList.add(this.loadClass);
    }

    animationSuccess(field){
        field.classList.remove(this.errorClass)
        field.classList.remove(this.loadClass);
        field.classList.add(this.successClass)
    }

    animationError(field, errByField){
        console.log(errByField)
        field.classList.add(this.errorClass)
        field.classList.remove(this.loadClass);
        field.classList.remove(this.successClass);
    }

    handlerSubmit(countErr){

        if( countErr === 0 ){
            console.log('SI')
        }else{
            console.log('NO')
        }
    }
}

export default FormSchema;
