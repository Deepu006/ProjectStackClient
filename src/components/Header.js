import React, {useState} from 'react';
import {useHistory } from "react-router-dom";
import { Navbar, Nav, Button, Form, FormControl, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import decode from 'jwt-decode';

const Header = props => {

    

    const history = useHistory();

    const [show, setShow]  = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let token = sessionStorage.getItem('token');
    

    let register_button, logout_button, login_button, tablebooking_button, online_order,
    inventory_management, tablebooking_management, technicalqueries_management, menu_button, location_button, about_us, contact_us, join_us;
    if (!token) {
        register_button = <Nav.Link if={show}  href="/register">Register</Nav.Link>;
        login_button = <Nav.Link href="/login">Login</Nav.Link>;
        logout_button = "";
        tablebooking_button = "";
        online_order = "";
        inventory_management = "" 
        tablebooking_management = ""  
        technicalqueries_management = ""
        menu_button = <Nav.Link href="/menu">Menu</Nav.Link>;
        location_button = <Nav.Link href="/location">Locate Us</Nav.Link>;
        about_us = <Nav.Link href="#aboutus">About Us</Nav.Link>;
        contact_us= <Nav.Link href="/query">Contact Us</Nav.Link>;
        join_us = <Nav.Link href="/application">Join Us!</Nav.Link>;
      } else {
        register_button = '';
        logout_button = <Button variant="primary" onClick={handleShow}>
                    Logout
                </Button>;
        login_button = ""
        
        

        let decodeddata = decode(token);
        let is_admin = decodeddata.user.is_admin

        if(!is_admin){
        tablebooking_button = <Nav.Link href="/tablebooking">Tabel Booking</Nav.Link>;
        online_order =   <Nav.Link href="/order">Online Order</Nav.Link>;
        menu_button = <Nav.Link href="/menu">Menu</Nav.Link>;
        location_button = <Nav.Link href="/location">Locate Us</Nav.Link>;
        about_us = <Nav.Link href="#aboutus">About Us</Nav.Link>;
        contact_us = <Nav.Link href="/query">Contact Us</Nav.Link>;
        join_us = <Nav.Link href="/application">Join Us!</Nav.Link>;
        inventory_management = "" 
        tablebooking_management = ""  
        technicalqueries_management = ""
          
        }else{
          tablebooking_button = ""
          online_order = ""
          inventory_management = <Nav.Link href="/inventories">Inventory Management</Nav.Link>;
          tablebooking_management = <Nav.Link href="/listOfTableBookings">Table Booking Management</Nav.Link>; 
          technicalqueries_management = <Nav.Link href="/listOfTechnicalQueries">Technical Queries</Nav.Link>
          contact_us = "";
          menu_button = ""
          location_button = ""
          about_us = ""
          join_us = ""
        }
        

    }

    const onSubmit = () => {

        console.log("I am here")
        setShow(false);
        sessionStorage.removeItem('token');
        history.push("/login");
        
  



    };



    return (
        <>
        
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/home">Restaurant</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            {register_button}
            {login_button}
            {menu_button}
            {tablebooking_button}
            {online_order}
            {location_button}
            {about_us}
            {contact_us}
            {join_us}

            {inventory_management}
            {tablebooking_management}
            {technicalqueries_management}

            </Nav>
            <Form inline>
            {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
            {/* <Button variant="outline-success">Search</Button> */}
            {logout_button}
            </Form>
        </Navbar.Collapse>
        </Navbar>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Logout</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to logout ?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose} onClick={onSubmit}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
        </>
  );
};


export default Header;
