import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import TechnicalQuery from './components/technicalqueries/TechnicalQueries';
import AllTechnicalQueries from './components/technicalqueries/ListOfTechnicalQueries';
import Invetory from './components/inventories/Invetories';
import UpdateInventory from './components/inventories/UpdateInventory';
import AddInventory from './components/inventories/AddInventory';
import AllTablebooking from './components/tablebooking/ListOfTableBookings';
import Tablebooking from './components/tablebooking/TableBooking';
import Application from './components/application/Application';
import ShowApplicants from './components/application/ShowApplicants';
import LoginForm from './components/auth/Login';
import AdminLoginForm from './components/auth/AdminLogin';
import RegisterForm from './components/auth/Register';
import HomePage from './components/Home';

// import LogoutForm from './components/auth/Logout';
import GoogleApiWrapper from './components/location/Location';
import Order from './pages/Order';
import Cart from './pages/Cart';
import Success from './pages/Success';
import Menu from './pages/Menu';

import Header from './components/Header';
import {useHistory } from "react-router-dom";

function AppRouter(){

    // const history = useHistory();
    // history.push("/login");
    return(
    <BrowserRouter>
        <Header />
        
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/query' component={TechnicalQuery} />
            <Route exact path='/tablebooking' component={Tablebooking} />
            <Route exact path='/login' component={LoginForm} />
            
            
            <Route exact path='/admin_login' component={AdminLoginForm} />
            
            <Route exact path='/register' component={RegisterForm} />
            
            
            {/* <Route exact path='/logout' component={LogoutForm} /> */}
            <Route exact path='/home' component={HomePage} />
            <Route exact path='/location' component={GoogleApiWrapper} />
            <Route exact path='/order' component={Order} />
            <Route exact path='/application' component={Application} />
            <Route exact path='/cart'  component={Cart} />
            <Route exact path='/success'  component={Success} />
            <Route exact path='/menu'  component={Menu} />
            <Route exact path='/inventories'  component={Invetory} />
            <Route exact path='/updateInventory'  component={UpdateInventory} />
            <Route exact path='/addInventory'  component={AddInventory} />
            <Route exact path='/ShowApplicants'  component={ShowApplicants} />
            <Route exact path='/listOfTableBookings'  component={AllTablebooking} />
            <Route exact path='/listOfTechnicalQueries'  component={AllTechnicalQueries} />

        </Switch>
        
    </BrowserRouter>
    );
}



export default AppRouter;
