# Form
Technical test 👩‍💻

DESCRIPTION 💻 
<hr>
This project was created with VITE. This is a survey form similar to but not the same as Google Form. 

<br>

✔FRONTEND ---> ReactJs 
<br/>
✔DATA BASE ---> Firebase

<br>

INSTALATION AND CONFIGURATIONS 🔧
<hr>
They are the dependencies used in the project with the command npm i:

<br/>
- Routing --> React-Router-Dom <br/>
- Icons --> Material Icons <br/>
- Menssages and alerts --> SweetAlert and React-Toastify <br/>
- Loading --> React-spinner <br/>
- Bootswatch --> Styles <br/>
- Data Base --> Firebase <br/>
<br>

We need to connect the app with firebase, so is necessary install it, through the command npm i fiebase and add some configurations that you can find in the platform of firebase when you create an account and add a new project which you have to copy and page in a new file in the project that you may call it like firebase.js.

ENVIRONMENT VARIABLES 🔑
<hr>
Add new file in root of the project calls .env  which contains the following:

VITE_API_KEY = XXX 

Inside firebase.js file import the variables:

const firebaseConfig = { <br/>
  apiKey: import.meta.env.API_KEY, <br/>
   .....<br/>
   .....<br/>
}

<br>
DEPLOY 🚀
<hr>
VERCEL 


