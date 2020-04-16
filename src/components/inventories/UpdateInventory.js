import React from 'react';
import {withRouter} from "react-router-dom";
import { Form, Button} from 'react-bootstrap';
import Header from '../Header';
import  "../tablebooking/tablebooking.css";


class UpdateInventory extends React.Component {
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

    

    componentDidMount()
    {
        let token = sessionStorage.getItem('token');
        
        console.log(this.props.location.data);
        fetch(`https://backend-node-js.herokuapp.com/api/inventories/${this.props.location.data}`,{
            headers: {
                'x-auth-token': token
            }
        }).then(res=>res.json())
        .then(data=>{
            this.setState({
                product:data.product,
                description:data.description,
                quantity:data.quantity,
                buyingPrice:data.buyingPrice
            })
       
        })
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
            fetch(`https://backend-node-js.herokuapp.com/api/inventories/update/${this.props.location.data}`,{
                method:"PUT",
                headers:{
                    "Content-Type": "application/json",
                    "x-auth-token" : token
                },
                body:JSON.stringify(this.state)

            }).then(res=>res.json())
            .then(data=> {
                
                this.props.history.push({
                    pathname: "/inventories",
                    data:data
                })
                
            })
        }else{
            alert("Please enter all the data");
        }
        
    }
 

    render()
    {
        return(
            <>
            {     console.log(this.state.description)}
            
            <div className="inventory">
                <h1>Update Inventory</h1>
                <Form>
                    <Form.Group>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" id="name" value={this.state.product} placeholder="Product Name"  onKeyUp={this.handleNameChange}/>
                    </Form.Group>
    
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" id="description" onChange={this.handleDescriptionChange} value={this.state.description} placeholder="Description" />
                    </Form.Group>
                
                    <Form.Group>
                        <Form.Label>Quantity </Form.Label>
                        <Form.Control type="text" id="quantity" onChange={this.handleQuantityChange} value={this.state.quantity} placeholder="Quantity"/>
                    </Form.Group>
    
                    <Form.Group>
                        <Form.Label>Buying Price</Form.Label>
                        <Form.Control type="text" id="price" onChange={this.handlePriceChange} value={this.state.buyingPrice} placeholder="Price"/>
                    </Form.Group>
                    <Button variant="secondary" onClick={this.submitData} size="lg">
                        Update
                    </Button>
                </Form>
            </div>
            </>
        )
    }
}

export default withRouter(UpdateInventory);