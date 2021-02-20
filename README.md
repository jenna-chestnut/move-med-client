# MoveMed 
## Your movement medicine.

---

[View the live MoveMed app here](https://move-med.vercel.app/)

[View the MoveMed server repo here](https://github.com/jenna-chestnut/move-med-server)

**MoveMed** was created with continuous movement in mind!

How you move (and how often you move) can make all the difference in your wellness, especially when it's at the direction of a professional.  
As true as this is, it can be hard to remember what exercises you were given, or how often you should do them - and sometimes, when you're at home and something happens during an exercise - you can forget to mention it in your visit!  

With MoveMed, the communication between provider and client is not broken after leaving the office.  
Providers can create exercises, and assign those exercises with unique details to a client. They can also assign a specific goal to the client - to help them stay motivated and on track. Clients can then view their goal and customized exercises anytime, without having to find a folded up paper or searching through their email. Comments between providers and the client help add feedback in real time and maintain progress.


 --- 
 
### User flows:  
New / any user goes to landing page  
-> views simple description  
-> views log in form and buttons to demo  

New User views About page
-> gets description of app
-> sees buttons to demo

New User demo   
-> is able to demo the app as a client or provider 
  
Client logs in
-> is able to view their assigned exercises and goal
-> can make comments on their exercises
-> can delete or edit their comments

Provider logs in
-> is able to view base exercises, clients, and client exercises
-> can assign, edit and create exercises
-> can add/edit client goals
-> can make comments on any client exercise
-> can delete or edit their comments

Admin logs in
-> is able to do everything a provider can
-> can create and edit user accounts

<br/>

---  

### Screenshots  
  
  
<img width="400px" alt="move-med-screenshot-1" src="https://gdurl.com/nZ_a">
<img width="400px" alt="move-med-screenshot-2" src="https://gdurl.com/fwkU">
<img width="400px" alt="move-med-screenshot-3" src="https://gdurl.com/jnPR">
<img width="400px" alt="move-med-screenshot-4" src="https://gdurl.com/F3O8">
<img width="400px" alt="move-med-screenshot-5" src="https://gdurl.com/XIDH">

<br/>

---

### Tech stack  
This client-side app was created with:    
<img align="left" alt="Visual Studio Code" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png" />
<img align="left" alt="HTML5" src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white" />
<img align="left" alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<img align="left" alt="CSS3" src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white" />
<img align="left" alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img align="left" alt="Redux" src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /> 
<img align="left" alt="Git" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/git/git.png" />
<img align="left" alt="GitHub" width="26px" src="https://raw.githubusercontent.com/github/explore/78df643247d429f6cc873026c0622819ad797942/topics/github/github.png" />
<img align="left" alt="React Router" src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" /> 

<br/>

---

### Components Tree
**App🔻**     

➖**Header🔻**   
➖➖*Conditional Links*  

➖**Main🔻**    
➖➖**Error Banner**  

➖➖**Landing Page**   
➖➖➖*Log In*  
➖➖➖*Intro 'Cards'* 

➖➖**About Page** 
  
➖➖**Dashboard**    
➖➖➖*Exercises List* (if client/provider/admin) 
➖➖➖*Client List* (if provider/admin)  
➖➖➖*Provider List* (if admin)   

➖➖**View Exercise**    
➖➖➖*Edit Exercise Form* (on click, if admin/provider)
➖➖➖*Exercise video and picture*
➖➖➖*Special notes* (if client exercise)
➖➖➖*Comments* (if client exercise)     
  
➖➖**View User**    
➖➖➖*Assign Exercise Select*
➖➖➖*Client goal*
➖➖➖*Client Exercises*
➖➖➖*User Permissions*
  
➖➖**Create Exercise**   
  
➖➖**Assign Exercise**  

➖➖**Create User**  

➖➖**Edit User**  
  
➖➖**Not Found 404 Page**    
  
➖**Footer🔻**     
  
---  
  
  
## Available Scripts  
  
In the project directory, you can run:  
  
`npm start`  
  
The page will reload if you make edits.\
You will also see any lint errors in the console.

`npm test`

Launches the test runner in the interactive watch mode.

`npm run build`

Builds the app for production to the `build` folder.
