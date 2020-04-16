import React, {Fragment, useState} from 'react';
import { Form, Button} from "react-bootstrap";
import axios from 'axios';
import decode from 'jwt-decode';
import Switch from "react-switch";
import {useHistory } from "react-router-dom";
import CommonBackgroundPage from '../CommonBackground';
/*import  "./technical.css";*/


const LoginForm = () => {

      const history = useHistory();
      const [formData, setFormData] = useState({
  
        email: '',
        password: ''
      });

      const [errors, seterrors]  = useState([]);


        const { email, password, is_admin} = formData;;
    
        const [checked, setchecked]  = useState(false);

        const handleValidation=()=>{
          let errors = {};
          let formIsValid = true;
  
      
          console.log(password.length)
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
            
  
         seterrors(errors);
         return formIsValid;
     }

        const handleChange = () => {
          if(checked == false){
            setchecked(true);
          }else{
            setchecked(false);
          }
          
        }
        

          
            

      const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
  
  
      const onSubmit = async e => {
          console.log(checked);
          e.preventDefault();
          
          if(handleValidation()){
            alert("Login Successfull");
          
            console.log(errors)
              let config = {
                  headers: {
                  'Content-Type': 'application/json'
                  }
              };
              console.log(checked)

              let is_admin;
              if(checked){
                is_admin = true;
              }else{
                is_admin = false;
              }
          
              let data = {
                  "email": email,
                  "password": password,
                  "is_admin" : is_admin
              };
          
              axios
                  .post('https://projectstackserver.herokuapp.com/api/user/', data, config)
                  .then(response => {
                      console.log(response, "response")
                  let decodeddata = decode(response.data.token);
                  console.log(decodeddata);
                  sessionStorage.setItem('token', response.data.token);
                  history.push("/home");
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
              alert("Login Form has errors")
            }
      };
        
      return (
        <> 
        <CommonBackgroundPage />
        
        <div className="technical" style={{position:"relative"}}>
            <h1>Login</h1>
            <span style={{color: "red"}}>{formData.errormsg}</span>
            <Form>
                

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" type="email" required="true" value={email} placeholder="name@example.com" onChange={e => onChange(e)} />
                    <span style={{color: "red"}}>{errors["email"]}</span>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" required="true" value={password} onChange={e => onChange(e)} />
                    <span style={{color: "red"}}>{errors["password"]}</span>
                </Form.Group>
                <Form.Group controlId="login_as">
                <Form.Label>Login as</Form.Label>
                &nbsp;&nbsp;&nbsp;
                <Switch
            checked={checked}
            onChange={handleChange}
            width = {80}
            height = {35}
            uncheckedIcon={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 15,
                  color: "orange",
                  paddingRight: 2
                }}
              >
                Guest
              </div>
            }
            checkedIcon={
                <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: 15,
                  color: "orange",
                  paddingRight: 2
                }}
              >
                Admin
              </div>
            }
            className="react-switch"
            id="icon-switch"
          />
          </Form.Group>
            
                
           
                <Button variant="secondary" size="lg" style={{
                  float: "right"
                }} onClick={e => onSubmit(e)}>
                    Login
                </Button>
            </Form>
        </div>
        </>
        
        
  );
};


export default LoginForm;
