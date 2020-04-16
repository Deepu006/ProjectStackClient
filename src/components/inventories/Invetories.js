import React from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import { Table, Button} from 'react-bootstrap';
import Header from '../Header';
import  "../tablebooking/tablebooking.css";

class Inventories extends React.Component{

    constructor(props)
    {
        super(props)
    
        this.state = {
            inventories: [],
        }
    }

    componentDidMount(){
        let token = sessionStorage.getItem('token');
        let config = {
            headers: {
                'x-auth-token': token
            }
        };

        axios.get('https://backend-node-js.herokuapp.com/api/inventories', config)
        .then(res => {
            // console.log(res.data);
            this.setState({inventories: res.data});
        });
    }

    add = (props) => {
        this.props.history.push({
            pathname: "/addInventory"
        })
    }
    
    // update = (props) => {
       
    //     console.log(this.props)
    //         //     this.props.history.push({
    //         //         pathname: "/updateInventory",
    //         //         data:
    //         //     })
    //         // }
       
        
    // }


    update = (e,props) => {
        console.log(e.target.id);
        this.props.history.push({
            pathname:"/updateInventory",
            data:e.target.id
        })
    }

    delete = (e) => {
        let token = sessionStorage.getItem('token');

        fetch(`https://backend-node-js.herokuapp.com/api/inventories/${e.target.id}`, {
            method:"DELETE",
            headers:{
                "x-auth-token" : token
            }
        })
        .then(res=>res.json())
        .then(data=>{
            let token = sessionStorage.getItem('token');
            let config = {
                headers: {
                    'x-auth-token': token
                }
            };
            console.log(data)
            if(data.status == 0)
            {
                axios.get('https://backend-node-js.herokuapp.com/api/inventories', config)
                .then(res => {
                    // console.log(res.data);
                    this.setState({inventories: res.data});
                });
            }
            // this.setState({inventories: data});
        })
        
    }

    render(){
        return(
            <>
                
                <div id="inventoryList">
                    <h1>Inventory Management</h1>
                    <Button variant="info" name="add" onClick={this.add} size="sm">Add New Inventory</Button>
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Discption</th>
                                <th>Quantity</th>
                                <th>Buying Price</th>
                                <th>Action</th>
                            </tr>
                            
                        </thead>
                        <tbody>

                    {this.state.inventories.map(inventory => {
                        return (<tr>
                            <td>{inventory.product}</td>
                            <td>{inventory.description}</td>
                            <td>{inventory.quantity}</td>
                            <td>{inventory.buyingPrice}</td>
                            <td>
                                <Button variant="secondary" name="update" id={inventory._id} onClick={this.update} size="sm">Update</Button>
                                <Button variant="danger" name="delete" id={inventory._id} onClick={this.delete} size="sm">Delete</Button>
                            
                            </td>
                        </tr>)
                    } )}
                    
                        </tbody>

                    </Table>
                </div>    
            </>
        )
    }
}


export default withRouter(Inventories);