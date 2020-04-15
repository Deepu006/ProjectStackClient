import React from 'react';
import { Form, Button, Col} from "react-bootstrap";
import axios from 'axios';
import  "./application.css";
import CommonBackgroundPage from '../CommonBackground';


  class Application extends React.Component {
    
    constructor()
    {
        super()
        this.state={
            firstname:"",
            lastname:"",
            phone:"",
            email:"",
            position:"",
            resume:""
        }

        this.handleFirstNameChange=this.handleFirstNameChange.bind(this)
        this.handleLastNameChange=this.handleLastNameChange.bind(this)
        this.handlePhoneChange=this.handlePhoneChange.bind(this)  
        this.handleEmailChange=this.handleEmailChange.bind(this)
        this.handlePositionChange=this.handlePositionChange.bind(this)
        this.handleResumeChange=this.handleResumeChange.bind(this)
        this.submitData=this.submitData.bind(this)      
    }


    handleFirstNameChange(e)
    {
        this.setState({
            firstname:e.target.value
        })
            
    }
    handleLastNameChange(e)
    {
        this.setState({
            lastname:e.target.value
        })
            
    }
    handlePhoneChange(e)
    {
        this.setState({
            phone:e.target.value
        })
            
    }
    handleEmailChange(e)
    {
        this.setState({
            email:e.target.value
        })
            
    }
    handlePositionChange(e)
    {
        this.setState({
            position:e.target.value
        })
            
    }
    handleResumeChange(e)
    {
        this.setState({
            resume:e.target.value
        })
            
    }



    submitData()
    {

        //let token = sessionStorage.getItem('token');
        let config = {
            headers: {
            'Content-Type': 'application/json'//,
        //    "x-auth-token": token
            }
        };
        console.log(config)

        var body = {
            firstname : this.state.firstname,
            lastname : this.state.lastname,
            phone : this.state.phone,
            email : this.state.email,
            position : this.state.position,
            resume : this.state.resume
        }

        axios.post('http://localhost:5000/api/application/', body, config).then(response => {
//            axios.post('https://backend-node-js.herokuapp.com/api/application/', body, config).then(response => {
                  console.log(response, "response")
            //   let decodeddata = decode(response.data.token);
            //   console.log(decodeddata);
            //   sessionStorage.setItem('token', response.data.token);
                    document.getElementById("firstname").value="";
                    document.getElementById("lastname").value = "";
                    document.getElementById("phone").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("position").value = "";
                    document.getElementById("resume").value = "";
                    alert("Entry created");
              })
              .catch(error => {
                  console.log('error ', error);
                  console.log(error.response)
                    
                  
                  });
      
        // fetch("http://localhost:5000/api/application",{
        //     method:"POST",
        //     headers:{
        //         "Content-Type": "application/json"
        //     },
        //     body:JSON.stringify(this.state)

        // }).then(res=>res.json()).then(data=>
        // {
        //     console.log(data)
        //     if(data.success !== 0)
        //     {
        //         document.getElementById("firstname").value="";
        //         document.getElementById("lastname").value = "";
        //         document.getElementById("phone").value = "";
        //         document.getElementById("email").value = "";
        //         document.getElementById("position").value = "";
        //         document.getElementById("resume").value = "";
        //         alert("Entry created");
        //     }
        //     else
        //     {
        //         alert("CRUD failure");
        //     }
            
        // })
    }


render(){
    return (

        <>
        <CommonBackgroundPage />
        
        
        <div className="application">
            <h1>Join Us!</h1>
            <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="firstname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" onChange={this.handleFirstNameChange} placeholder="John/Jane"/>
                </Form.Group>


                <Form.Group as={Col} controlId="lastname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" onChange={this.handleLastNameChange} placeholder="Doe"/>
                </Form.Group>
            </Form.Row>

                <Form.Group controlId="phone">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="text" onChange={this.handlePhoneChange} placeholder="a ten digit number" />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" onChange={this.handleEmailChange} placeholder="xyz@example.com" />
                </Form.Group>

                <Form.Group controlId="position">
                    <Form.Label>Position's Applied For</Form.Label>
                    <Form.Control type="text" onChange={this.handlePositionChange} placeholder="server/counter/kitchen" />
                </Form.Group>

                <Form.Group controlId="resume">
                    <Form.Label>What would you contribute?</Form.Label>
                    <Form.Control as="textarea" onChange={this.handleResumeChange} rows="3" placeholder="Write a brief resume of relevant experience"/>
                </Form.Group>
                <Button variant="secondary" onClick={this.submitData} size="lg">
                    Submit
                </Button>
            </Form>
        </div>

        
        </>
    );
}

};


export default Application;
