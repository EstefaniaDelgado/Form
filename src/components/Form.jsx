import { useEffect, useState } from 'react';
import { info } from '../data/data.js';
import { validation } from '../functionValidation.js';
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';



function Form({ sendInfoSurvey, infoSurvey }) {

  //redirect to answers
  const history = useNavigate();

  // STATES
  const [data, setData] = useState([]);

  const [inputs, setInputs] = useState({
    full_name: '',
    email: '',
    birth_date: '',
    country_of_origin: '',
    terms_and_conditions: false,
  });
  
  
  const [error, setError] = useState({});

  const [currentInput, setCurrentInput] = useState('');
  
  // disable if the name already exists
  const [disable, setDisabled] = useState(false);
  //disableEmail if the email already exists
  const[disableEmail, setDisableEmail] = useState(false)


  useEffect(() => {
    setData(info);
    // This is a reference to get the current value of "inputs.full_name"
    const fullName = inputs.full_name;  
    const email = inputs.email;

    if(infoSurvey.some((element) => element.full_name.toLowerCase() === fullName.toLowerCase())){
       setTimeout(()=>{
        setDisabled(true)
      }, 800)
    }else{
      setDisabled(false)
    }

    if(infoSurvey.some((element) => element.email === email)){
      setTimeout(()=>{
       setDisableEmail(true)
     }, 800)
   }else{
     setDisableEmail(false)
   }
  }, [inputs.full_name, inputs.email, infoSurvey]);
  

  //Handler Inputs
  const handlerChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    setError(
      validation(currentInput, {
        ...inputs,
        [e.target.name]: e.target.value,
      })
    );
  };

  //Handler Input-Checkbox
  const handlerCheck = (e) => {
    setInputs({
      ...inputs,
      terms_and_conditions: e.target.checked,
    });

    if (!e.target.checked) {
      setError({
        ...error,
        terms_and_conditions: '*Debes aceptar los términos y condiciones',
      });
    } else if (e.target.checked) {
      setError({
        ...error,
        terms_and_conditions: "",
      });
    }
  };
 

  //Handler Submit
  const handlerSubmit = (e) => {
    e.preventDefault();
    sendInfoSurvey(inputs);
    swal('Puedes ver los registros de las encuestas');
    history('/info');
  };

  //Handler validate only the current input
  const handleInputFocus = (e) => {
    const { name } = e.target;
    setCurrentInput(name);
  };

  return (
    // FORM
    <>
      <h1 style={{ marginBottom: '30px' }}>Formulario <i className="material-icons">face</i></h1>
      {data.items ? (
        data.items.map((ele, index) => {
          return (
            <form
              key={index}
              className="card card-body p-4"
              onSubmit={handlerSubmit}
            >
              <div className="form-group input-group">
                
                <label>
                 {ele.label !== 'Enviar' ? ele.label : null}
                  {ele.type !== 'select' || ele.type === "submit" ? (
                   
                    <input
                      type={ele.type}
                      onChange={
                        ele.type === 'checkbox' ? handlerCheck : handlerChange
                      }
                      onFocus={handleInputFocus}
                      name={ele.name}
                      value={inputs.name}
                      disabled={
                        ele.type === 'submit'
                          ? true &&
                            (error.full_name ||
                               disable || 
                               disableEmail ||
                              error.email ||
                              error.birth_date ||
                              error.terms_and_conditions ||
                              !inputs.full_name ||
                              !inputs.email ||
                              !inputs.birth_date ||
                              !inputs.country_of_origin ||
                              !inputs.terms_and_conditions )
                          : false
                      }
                      style={{ marginLeft: '5px', height: '25px' }}
                      />
                  ) : (
                    <div>
                      <select
                        name="country_of_origin"
                        onChange={handlerChange}
                        value={inputs.country_of_origin}
                        style={{ height: '25px', width: '155px' }}
                      >
                        <option value=""></option>
                        {ele.options.map((country, index) => {
                          return (
                            <option key={index} value={country.value}>
                              {country.label}
                            </option>
                          );
                        })} 
                      </select>
                     </div> 
                  )}
                  {ele.name === 'full_name' && error.full_name && (
                    <p style={{ fontSize: 'medium', color: 'red' }}>
                      {error.full_name}
                    </p>
                  )}
                  {ele.name === 'full_name' && disable && <p>Ese nombre ya existe</p> }
                  {ele.name === "email" && disableEmail && <p>Este correo ya se encuentra registrado</p> }
                  {ele.name === 'email' && error.email && (
                    <p style={{ fontSize: 'medium', color: 'red' }}>
                      {error.email}
                    </p>
                  )}
                  {ele.name === 'birth_date' && error.birth_date && (
                    <p style={{ fontSize: 'medium', color: 'red' }}>
                      {error.birth_date}
                    </p>
                  )}
                  {ele.name === 'terms_and_conditions' &&
                    error.terms_and_conditions && (
                      <p style={{ fontSize: 'medium', color: 'red' }}>
                        {error.terms_and_conditions}
                      </p>
                    )}
                </label>
              </div>
            </form>
          );
        })
      ) : (
        <ClipLoader />
      )}
    </>
  );
}

export default Form;

