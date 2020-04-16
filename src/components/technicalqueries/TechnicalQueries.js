import React from 'react';
import {withRouter} from "react-router-dom";
import { Form, Button} from "react-bootstrap";
import axios from 'axios';
import CommonBackgroundPage from '../CommonBackground';
import  "./technical.css";


class TechnicalQueryForm extends React.Component {

    constructor()
    {
        super()
        this.state={
            name:"",
            email:"",
            query:""
        }

        this.handleNamechange=this.handleNamechange.bind(this)
        this.handleEmailChange=this.handleEmailChange.bind(this)
        this.handleQueryChange=this.handleQueryChange.bind(this)  
        this.submitData=this.submitData.bind(this)      
    }
    handleNamechange(e)
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

    handleQueryChange(e)
    {
        this.setState({
            query:e.target.value
        })
            
    }

    submitData()
    {
       
        console.log(this.state.email);

        let token = sessionStorage.getItem('token');

        fetch("https://backend-node-js.herokuapp.com/api/technicalqueries",{
            method:"POST",
        
            headers:{
                "Content-Type": "application/json",
                "x-auth-token" : token
            },
            body:JSON.stringify(this.state)

        }).then(res=>res.json()).then(data=>
        {
            console.log(data)
            
            
            if(data.success !== 0)
            {
                let config = {
                    email: this.state.email
                }
                
                axios.post('https://backend-node-js.herokuapp.com/email', config)
                    .then(res => console.log(res.data));

                document.getElementById("name").value="";
                document.getElementById("email").value = "";
                document.getElementById("query").value = "";
               
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
            <div className="technical" style={{position:"relative"}}>
                <h1>Contact Us</h1>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" id="name"  placeholder="Name" onChange={this.handleNamechange} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" id="email" placeholder="name@example.com" value = {this.state.email} onChange={this.handleEmailChange}/>
                    </Form.Group>
                
                    <Form.Group>
                        <Form.Label>Your Message</Form.Label>
                        <Form.Control id="query" as="textarea" rows="3" onChange={this.handleQueryChange}/>
                    </Form.Group>
                    <Button onClick={this.submitData} variant="secondary" size="lg">
                        Submit
                    </Button>
                </Form>
            </div>
            </>

        );
    }
    
};


export default withRouter(TechnicalQueryForm);