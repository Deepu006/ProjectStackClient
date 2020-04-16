import React from 'react';
import {withRouter} from "react-router-dom";
import { Form, Button} from 'react-bootstrap';
import CommonBackgroundPage from '../CommonBackground';
import  "./tablebooking.css";


class Tablebooking extends React.Component {
    
    constructor()
    {
        super()
        this.state={
            name:"",
            email:"",
            noOfPerson:"",
            specialInstruction:""
        }

        this.handleNameChange=this.handleNameChange.bind(this)
        this.handleEmailChange=this.handleEmailChange.bind(this)
        this.handleNoOfPersonChange=this.handleNoOfPersonChange.bind(this)  
        this.handleInstructionChange=this.handleInstructionChange.bind(this)
        this.submitData=this.submitData.bind(this)      
    }


    handleNameChange(e)
    {
        this.setState({
            name:e.target.value
        })
            
    }
    handleEmailChange(e)
    {
        this.setState({
            email:e.target.value
        })
            
    }
    handleNoOfPersonChange(e)
    {
        this.setState({
            noOfPerson:e.target.value
        })
            
    }
    handleInstructionChange(e)
    {
        this.setState({
            specialInstruction:e.target.value
        })
            
    }



    submitData()
    {
        let token = sessionStorage.getItem('token');
      
        fetch("https://backend-node-js.herokuapp.com/api/tablebookings",{
            method:"POST",
            
            headers:{
                "Content-Type": "application/json",
                "x-auth-token": token
            },
            body:JSON.stringify(this.state)

        }).then(res=>res.json()).then(data=>
        {
            console.log(data)
            if(data.success !== 0)
            {
                document.getElementById("name").value="";
                document.getElementById("email").value = "";
                document.getElementById("noOfPerson").value = "";
                document.getElementById("instructions").value = "";
                alert("Data insserted successfully");

                this.props.history.push({
                    pathname: "/",
                    data:data
                })
            }
            else
            {
                alert("Error inserting data");
            }
            
        })
    }


    render(){
        return (
            <>
            <CommonBackgroundPage />
            <div className="tablebooking" style={{position:"relative"}}>
                <h1>Table Booking</h1>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" id="name" onChange={this.handleNameChange} placeholder="name"/>
                    </Form.Group>
    
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" id="email" onChange={this.handleEmailChange} placeholder="name@example.com" />
                    </Form.Group>
                
                    <Form.Group>
                        <Form.Label>No Of Persons(Max. 6) </Form.Label>
                        <Form.Control type="number" id="noOfPerson" onChange={this.handleNoOfPersonChange} placeholder="1" min="1" max="6"/>
                    </Form.Group>
    
                    <Form.Group>
                        <Form.Label>Special Instructions</Form.Label>
                        <Form.Control as="textarea" id="instructions" rows="3" onChange={this.handleInstructionChange}/>
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


export default withRouter(Tablebooking);