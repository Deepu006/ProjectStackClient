import React from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import { Table, Button} from 'react-bootstrap';
import Header from '../Header';
import  "./application.css";

class ShowApplicants extends React.Component{

    constructor(props)
    {
        super(props)
    
        this.state = {
            applicationList: [],
        }
    }

    componentDidMount(){
        let token = sessionStorage.getItem('token');
        let config = {
            headers: {
                'x-auth-token': token
            }
        };
        
        axios.get('http://localhost:5000/api/application', config)
        .then(res => {
            // console.log(res.data);
            this.setState({applicationList: res.data});
        });
    }


    delete = (e) => {

        // axios.delete(`http://localhost:5000/api/application`, { params: requestData })
        // .then(function(response) {console.log(response.data));})
        // .catch(function(error) {console.log(error);
        // });

        let token = sessionStorage.getItem('token');
        console.log(token);
        console.log(e.target.id);
        fetch(`http://localhost:5000/api/application/${e.target.id}`, {
            method:"DELETE",
            headers:{
                //"x-auth-token" : token
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
                axios.get('http://localhost:5000/api/application', config)
                .then(res => {
                    // console.log(res.data);
                    this.setState({applicationList: res.data});
                });
            }
            // this.setState({inventories: data});
        })
        
    }



    render(){
        return(
            <>
                <div id="applicantList">
                    <h1>Application Management</h1>
                   
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone</th>
                                <th>Position</th>
                                <th>resume</th>
                                <th>Action</th>
                            </tr>
                            
                        </thead>
                        <tbody>
                        <br/>
                        
                    {this.state.applicationList.map(application => {
                        return (<tr>

                            <td>{application.firstname}</td>
                            <td>{application.lastname}</td>
                            <td>{application.phone}</td>
                            <td>{application.position}</td>
                            <td>{application.resume}</td>
                            <td>
                                <Button variant="danger" name="delete" id={application._id} onClick={this.delete} size="sm">Delete</Button>
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


export default withRouter(ShowApplicants);
