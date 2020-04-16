import React from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import { Table, Button} from 'react-bootstrap';
import Header from '../Header';
import  "./technical.css";


class ListOfTechnicalQueries extends React.Component{
    constructor(props)
    {
        super(props)
    
        this.state = {
            technicalQueries: [],
        }
    }

    componentDidMount(){
        let token = sessionStorage.getItem('token');
        let config = {
            headers: {
                'x-auth-token': token
            }
        };

        axios.get('https://backend-node-js.herokuapp.com/api/technicalqueries', config)
        .then(res => {
            // console.log(res.data);
            this.setState({technicalQueries: res.data});
        });
    }



    delete = (e) => {
        let token = sessionStorage.getItem('token');
        //console.log(e.target.id);
        fetch(`https://backend-node-js.herokuapp.com/api/technicalqueries/${e.target.id}`, {
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
                axios.get('https://backend-node-js.herokuapp.com/api/technicalqueries', config)
                .then(res => {
                    // console.log(res.data);
                    this.setState({technicalQueries: res.data});
                });
            }
            // this.setState({inventories: data});
        })
        
    }



    render(){
        return(
            <>
                
                <div id="technicalQueriesList">
                    <h1>Technical Query Management</h1>
                   
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Action</th>
                            </tr>
                            
                        </thead>
                        <tbody>

                    {this.state.technicalQueries.map(technicalQuery => {
                        return (<tr>
                            <td>{technicalQuery.name}</td>
                            <td>{technicalQuery.email}</td>
                            <td>{technicalQuery.query}</td>
                            <td>
                                <Button variant="danger" name="delete" id={technicalQuery._id} onClick={this.delete} size="sm">Delete</Button>
                            
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

export default withRouter(ListOfTechnicalQueries);