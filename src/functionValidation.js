// regular expression for name
const expRegular =/^[a-zA-Z]{2,50}$/
const expEmail =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/



export const validation=(currentInput,inputs)=> {
    let errors = {};

    if(currentInput === "full_name" && !inputs.full_name) errors.full_name = "*Campo requerido";

   if( currentInput ==="email" && !inputs.email) errors.email = "*Campo requerido";

   else if( currentInput === "email" && !expEmail.test(inputs.email)) errors.email = "No es un formato de correo valido";

   if( currentInput === "birth_date" && !inputs.birth_date) errors.birth_date = "*Campo requerido";


   if( currentInput === "terms_and_conditions" &&  inputs.terms_and_conditions === false) errors.terms_and_conditions= "*Debes aceptar los terminos y condiciones";
   
   else{
    errors.terms_and_conditions = "";
   }
    return errors;

}



