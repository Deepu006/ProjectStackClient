import React, {Fragment, useState} from 'react';
import { Form, Button} from "react-bootstrap";
import axios from 'axios';
import {useHistory } from "react-router-dom";
import CommonBackgroundPage from '../CommonBackground';
import decode from 'jwt-decode';
/*import  "./technical.css";*/


const RegisterForm = () => {

    const history = useHistory();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        password1: ''
      });

      const [errors, seterrors]  = useState([]);

      const handleValidation=()=>{
        let errors = {};
        let formIsValid = true;

    
        if(!name){
            formIsValid = false;
            errors["name"] = "Name field cannot be empty";
        }
        //Email
        if(!email){
           formIsValid = false;
           errors["email"] = "Email cannot be empty";
        }else{
          if(email != "undefined"){
            console.log(email)
             let lastAtPos = email.lastIndexOf('@');
             let lastDotPos = email.lastIndexOf('.');
  
             if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
              }
         }
        }

        if(!password){
            formIsValid = false;
            errors["password"] = "Password cannot be empty";
         }else{
           if(password != "undefined"){
              if (password.length < 8) {
                 formIsValid = false;
                 errors["password"] = "Password length should not be less than 8";
               }
            }
         }

         if(!password1){
            formIsValid = false;
            errors["password1"] = "Password cannot be empty";
         }else{
           if(password1 != "undefined"){
              if (password1.length < 8) {
                 formIsValid = false;
                 errors["password1"] = "Password length should not be less than 8";
               }
            }else{
                if(password != password1){
                    formIsValid = false;
                    errors["password1"] = "Password does not matches"; 
                }
            }
         }

        if(!mobile){
          formIsValid = false;
          errors["mobile"] = "Mobile cannot be empty";
        }else{
            if(mobile != "undefined"){
                if (mobile.length < 10) {
                formIsValid = false;
                errors["mobile"] = "Invalid Mobile Number";
                }
            }
        }

    
          

       seterrors(errors);
       return formIsValid;
   }


    const { name, email, mobile, password, password1 } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });


    const onSubmit = async e => {
        console.log("hello");
        e.preventDefault();

        if(handleValidation()){
            alert("Registration Successfull");
        
            let config = {
                headers: {
                'Content-Type': 'application/json'
                }
            };
            console.log(config)
        
            let data = {
                "name": name,
                "email": email,
                "password": password,
                "password1": password1,
                "mobile": mobile,
                "is_admin": false
            };
        
            axios
                .post('https://projectstackserver.herokuapp.com/api/user/register', data, config)
                .then(response => {
                    console.log(response, "response")
                    history.push("/login");
                // let decodeddata = decode(response.data.token);
                // console.log(decodeddata);
                // sessionStorage.setItem('token', response.data.token);
                })
                .catch(error => {
                    console.log('error ', error);
                    console.log(error.response)
                
                    setFormData({
                        ...formData,
                        errormsg: error.response.data.error[0].msg
                    });
                    });

        }else{
            alert("Registration Form has errors")
            }
    }
    return (
        <>
        <CommonBackgroundPage />
        <Fragment>


            <div className="technical" style={{position:"relative"}}>
                <h1>Register</h1>
                    <span style={{color: "red"}}>{formData.errormsg}</span>
                
                    <Form onSubmit={e => onSubmit(e)}>
                   <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control  type="text" name="name" value={name} required onChange={e => onChange(e)} />
                        <span style={{color: "red"}}>{errors["name"]}</span>
                    </Form.Group> 

                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" type="email" value={email} required placeholder="name@example.com" onChange={e => onChange(e)}/>
                        <span style={{color: "red"}}>{errors["email"]}</span>
                    </Form.Group>

                    <Form.Group controlId="mobile">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control type="mobile" name="mobile" value={mobile} required placeholder="" onChange={e => onChange(e)} />
                        <span style={{color: "red"}}>{errors["mobile"]}</span>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" value={password} required onChange={e => onChange(e)} />
                        <span style={{color: "red"}}>{errors["password"]}</span>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name="password1" value={password1} required onChange={e => onChange(e)} />
                        <span style={{color: "red"}}>{errors["password1"]}</span>
                    </Form.Group>`
                     <Button variant="secondary" style={{
                  float: "right"
                }} size="lg" onClick={e => onSubmit(e)}>
                        Register
                    </Button>
                </Form>
                    
            
                   
          
        
        </div>
        </Fragment>
        </>
        
  );
};


export default RegisterForm;