import React from 'react';
import {withRouter} from "react-router-dom";
import { Form, Button} from 'react-bootstrap';
import Header from '../Header';
import  "../tablebooking/tablebooking.css";

class AddInventory extends React.Component {
    
    constructor(props)
    {
        super(props)
        this.state={
            product:"",
            description:"",
            quantity:"",
            buyingPrice:""

        }

        this.handleNameChange=this.handleNameChange.bind(this)
        this.handleDescriptionChange=this.handleDescriptionChange.bind(this)
        this.handleQuantityChange=this.handleQuantityChange.bind(this)  
        this.handlePriceChange=this.handlePriceChange.bind(this)
        this.submitData=this.submitData.bind(this)      
    }

    

    handleNameChange(e)
    {
        
        this.setState({
            product: e.target.value
        })
        console.log(e.target.value)
            
    }
    handleDescriptionChange(e)
    {
        
        this.setState({
            description:e.target.value
        })
        console.log(e.target.value)
            
    }
    handleQuantityChange(e)
    {
        this.setState({
            quantity:e.target.value
        })
        console.log(e.target.value)
            
    }
    handlePriceChange(e)
    {
        this.setState({
            buyingPrice:e.target.value
        })
        console.log(e.target.value)
            
    }


    submitData = (props) =>
    {
        let token = sessionStorage.getItem('token');
    
        if(this.state.product != "" && this.state.description != "" && this.state.quantity != "" && this.state.buyingPrice != "")    
        { 
            fetch("https://backend-node-js.herokuapp.com/api/inventories",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                    "x-auth-token": token
                },
                body:JSON.stringify(this.state)

            }).then(res=>res.json())
            .then(data=> {
                
                this.props.history.push({
                    pathname: "/inventories",
                    data:data
                })
            
                
            })
        }
        else{
            alert("Please enter all the data");
        }
    
    }
 

    render()
    {
        return(
            <>
            
            
            <div className="inventory">
                <h1>Add Inventory</h1>
                <Form>
                    <Form.Group>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" id="name" placeholder="Product Name"  onChange={this.handleNameChange}/>
                    </Form.Group>
    
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" id="description" onChange={this.handleDescriptionChange} placeholder="Description" />
                    </Form.Group>
                
                    <Form.Group>
                        <Form.Label>Quantity </Form.Label>
                        <Form.Control type="text" id="quantity" onChange={this.handleQuantityChange} placeholder="Quantity"/>
                    </Form.Group>
    
                    <Form.Group>
                        <Form.Label>Buying Price</Form.Label>
                        <Form.Control type="text" id="price" onChange={this.handlePriceChange} placeholder="Price"/>
                    </Form.Group>
                    <Button variant="secondary" onClick={this.submitData} size="lg">
                        Add 
                    </Button>
                </Form>
            </div>
            
            </>
        )
    }
}

export default withRouter(AddInventory);