import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes , Route, Navigate } from 'react-router-dom';
import PostDetails from './components/PostDetails/PostDetails';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import Women from './components/Women/Women';
import Conference from './components/Conference/Conference';
import Inter from './components/Inter/Inter';
import Intra from './components/Intra/Intra';
import Workshop from './components/Workshop/Workshop';

import ResetPassword from './components/ResetPassword/ResetPassword';
import Reset from './components/ResetPassword/Reset';
import ForgottenPassword from './components/ForgottenPassword/ForgottenPassword';
import EmailSent from './components/EmailSent/EmailSent';
import PasswordReset from './components/PasswordReset/PasswordReset';


const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return(
        <BrowserRouter>
          <Container maxWidth="xl">
            <Navbar />
            <Routes>
              <Route path="/" exact element={<Home/>} />
              <Route path="/women" exact element={<Women/>} />
              <Route path="/workshop" exact element={<Workshop/>} />
              <Route path="/inter" exact element={<Inter/>} />
              <Route path="/intra" exact element={<Intra/>} />
              <Route path="/seminar" exact element={<Conference/>} />

              <Route path="/posts" exact element={<Home/>} />
              <Route path="/posts/search" exact element={<Home/>} />
              <Route path="posts/:id" exact element={<PostDetails/>} />
              {/* <Route path="/auth" exact element={() => (!user ? <Auth/> : <Home/>)} /> */}
              <Route path="/auth" exact element={<Auth/>} />
              <Route path="/forgottenPassword" exact element={<ForgottenPassword/>} />
              <Route path="/emailsent/:userEmail?/:reset?" exact element={<EmailSent/>} />
              <Route path="/passwordReset/:userId/:resetString" exact element={<PasswordReset/>} />
              {/* <Route path="/reset" exact element={<Reset/>} /> */}

              {/* <Route path="/reset" exact element={<Reset/>} /> */}
            </Routes>
          </Container>
        </BrowserRouter>



    )  




};  

export default App;
// import React from 'react';
// import { Container} from '@material-ui/core';
// import Navbar from './components/Navbar/Navbar';
// import {  BrowserRouter, Switch, Route } from 'react-router-dom';

// import Home from './components/Home/Home';
// import Auth from './components/Auth/Auth';





// const App = () => {
//     return ( 
//     <BrowserRouter>
//         <Container maxwidth = "lg" >
//             <Navbar />
//             <Switch>
//                 <Route  path="/" exact component= {Home}  />
//                 <Route  path="/auth" exact component= {Auth}  />
                 
//             </Switch>
          
//         </Container>

//     </BrowserRouter>


//     );
// }
// export default App;