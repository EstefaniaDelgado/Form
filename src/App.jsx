import './App.css'
import SurveyInfo from './components/SurveyInfo';
import { Route, Routes } from 'react-router-dom';
import Form from './components/Form'
import { useEffect, useState } from "react";
import {db} from "./data/firebase.js"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"


function App() {

  const[infoSurvey, setInfoSurvey]=useState([]);
  
  const[currentId, setCurrentId]=useState("");

  
//////////////////////////////////////////////////
  //send info to the db in firebase
  const sendInfoSurvey = async(infoForm)=>{
    try {
      if(currentId === ""){
        await db.collection("survey").doc().set(infoForm)
        toast("Nuevo registro agregado",{
          type:"success",
          autoClose:1000,
        });
      }else{
        await db.collection("survey").doc(currentId).update(infoForm);
        toast("Resgistro Actualizado exitosamente",{
          type:"info",
          autoClose:1000,
        })
        setCurrentId("");
      }
    } catch (error) {
      console.log(error)
    }    
  };
 /////////////////////////////////
  
 //To do a request to fb and show info in a new path
   
   const getAndShowAnswers = async()=>{
   db.collection("survey").onSnapshot((querySnapShot)=>{
  const dataFb = [];
  querySnapShot.forEach(doc=>{
  dataFb.push({...doc.data(), id: doc.id})
})
setInfoSurvey(dataFb)
}); 

};
console.log(infoSurvey)


//const contactos = collection(db, "contactos");

/* export const getContact = async (_req, res) => {
  try {
    const datos = await getDocs(contactos);
    const { docs } = datos;
    const data = docs.map((doc) => ({ id: doc.id, datos: doc.data() }));
    // return success({ res, data });
    res.render("index", { data });
  } catch (error) {
    return failure({ res, msg: error });
  }
}; */


 //show information in the form
 const getInfoById= async(id)=>{
  const dataWithId=[]
  const data = await db.collection("survey").doc(id).get()
  dataWithId.push({...data.data(),id:id})
  setCurrentId(dataWithId[0].id)
};

//Delete register by Id
const deleteRegister = async(id)=>{
  if(window.confirm("Estas seguro de eliminar este registro?")){
   toast("Eliminando Registro", {
      type:"error",
      autoClose:1000
    })
  await db.collection("survey").doc(id).delete()
 
  }
};
   
  
//Mounting the component, get and show info
 useEffect(()=>{
   getAndShowAnswers()
 },[]);

 

  return (
    <div className="container p-4">
      <div className="">
       <Routes>
     <Route exact path='/' element={<Form sendInfoSurvey={sendInfoSurvey} currentId={currentId} infoSurvey={infoSurvey} />}/>
     <Route exact path='/info' element={<SurveyInfo infoSurvey={infoSurvey} deleteRegister={deleteRegister} getInfoById={getInfoById} />}/>
      </Routes> 
      </div>
      <ToastContainer/>
    </div>
  )
}

export default App;

