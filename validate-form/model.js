import FormSchema from "./Form.js";

let formSchema = new FormSchema( 'singinForm', {
    name: {
        min: [3, 'debe contener 3 caracteres'],
        max: [30, 'No puede tener más de 30 caracteres'],
        required: [true, 'El nombre es requerido'],
        pattern: [/^[a-z ]+$/i, 'Solo permite caracteres alfanumericos']
    },
    email: {
        min: [3, 'Tu MAMAMAMA'],
        max: 30,
        required: true,
        pattern: [/^[a-z]+$/i, 'solo puede contener caracteres alfabéticos']
    },
    'zip-z': {
        min: 3,
        max: 30,
        pattern: [/^[0-9]+$/i]
    }
})

export {formSchema};

