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
  

  //send info to the db in firebase
  const sendInfoSurvey = async(infoForm)=>{
    try {
        await db.collection("survey").doc().set(infoForm)
        toast("Nuevo registro agregado",{
          type:"success",
          autoClose:1000,
        });
      
    } catch (error) {
      console.log(error)
    }    
  };
 
  
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

/* 
 //show information in the form
 const getInfoById= async(id)=>{
  const dataWithId=[]
  const data = await db.collection("survey").doc(id).get()
  dataWithId.push({...data.data(),id:id})
  setCurrentId(dataWithId[0].id)
}; */

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
     <Route exact path='/' element={<Form sendInfoSurvey={sendInfoSurvey}  infoSurvey={infoSurvey} />}/>
     <Route exact path='/info' element={<SurveyInfo infoSurvey={infoSurvey} deleteRegister={deleteRegister}/>}/>
      </Routes> 
      </div>
      <ToastContainer/>
    </div>
  )
}

export default App;

