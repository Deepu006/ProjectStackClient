import React from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import { Table, Button} from 'react-bootstrap';
import Header from '../Header';
import  "./tablebooking.css";

class ListOfTableBooking extends React.Component{

    constructor(props)
    {
        super(props)
    
        this.state = {
            tableBookings: [],
        }
    }

    componentDidMount(){
        let token = sessionStorage.getItem('token');
        let config = {
            headers: {
                'x-auth-token': token
            }
        };

        axios.get('https://backend-node-js.herokuapp.com/api/tablebookings', config)
        .then(res => {
            // console.log(res.data);
            this.setState({tableBookings: res.data});
        });
    }


    delete = (e) => {
        let token = sessionStorage.getItem('token');
        //console.log(e.target.id);
        fetch(`https://backend-node-js.herokuapp.com/api/tablebookings/${e.target.id}`, {
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
                axios.get('https://backend-node-js.herokuapp.com/api/tablebookings', config)
                .then(res => {
                    // console.log(res.data);
                    this.setState({tableBookings: res.data});
                });
            }
            // this.setState({inventories: data});
        })
        
    }



    render(){
        return(
            <>
                
                <div id="tableBookingList">
                    <h1>Table Booking Management</h1>
                   
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>No Of Persons</th>
                                <th>Special Instructions</th>
                                <th>Action</th>
                            </tr>
                            
                        </thead>
                        <tbody>

                    {this.state.tableBookings.map(tableBooking => {
                        return (<tr>
                            <td>{tableBooking.name}</td>
                            <td>{tableBooking.email}</td>
                            <td>{tableBooking.noOfPerson}</td>
                            <td>{tableBooking.specialInstruction}</td>
                            <td>
                                <Button variant="danger" name="delete" id={tableBooking._id} onClick={this.delete} size="sm">Delete</Button>
                            
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


export default withRouter(ListOfTableBooking);