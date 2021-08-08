class Validates {

    validateElementDOM(field, name){
        if( !field ) throw new Error(`${name} does not exist in the dom form`)
    }

    validate(schema, cb){

        let fields = schema.$formFields;
        let errors = []

        fields.forEach(field => {

            let valueFieldName = field.name;
            let schemaOption = schema[valueFieldName];
            let err = cb(schemaOption, field);
            if( !err ) return
            errors.push(err)
        })
        return errors;
    };

    required(schemaOption, field){

        if( !schemaOption.required ) return
        if (field.value === '') {
            return{
                code: 'REQUIRED-VALIDATE',
                success: false,
                elm: field,
                attribute: field.name,
                message: schemaOption.required[1] || `${field.name} is requred`
            }
        }
    }

    min(schemaOption, field){

        if( !schemaOption.min ) return
        let n = schemaOption.min[0] || schemaOption.min;

        if (field.value.length < n ) {
            return{
                code: 'MIN-VALIDATE',
                success: false,
                elm: field,
                attribute: field.name,
                message: schemaOption.min[1] || `${field.name} debe contener al menos ${n} caracteres`
            }
        }
    }

    max(schemaOption, field){

        if( !schemaOption.max ) return
        let n = schemaOption.max[0] || schemaOption.max;

        if (field.value.length > n ) {
            return{
                code: 'MAX-VALIDATE',
                success: false,
                elm: field,
                attribute: field.name,
                message: schemaOption.max[1] || `${field.name} no puede contener más de ${n} caracteres `
            }
        }
    }

    pattern(schemaOption, field){

        if( !schemaOption.pattern ) return
        let pattern = schemaOption.pattern[0] || schemaOption.pattern;
        
        if ( !pattern.test(field.value) ){
            return{
                code: 'PATTERN-VALIDATE',
                success: false,
                elm: field,
                attribute: field.name,
                message: schemaOption.pattern[1] || `${field.name} campo incorrecto `
            }
            
        }
    }
}

export default Validates;