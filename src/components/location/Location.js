import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios';
import  "./location.css";

import Geocode from "react-geocode";


import {
  MDBJumbotron,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCol} from 'mdbreact';

const mapStyles = {
  width: '100%',
  height: '64%'
};



export class MapContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stores: [],
            lat: "43.721512",
            lng: "-79.583473",
          }
        navigator.geolocation.getCurrentPosition(
          position => {
            this.setState({lat: position.coords.latitude,lng: position.coords.longitude});
            console.log(this.state.lat)
          },
          error => console.log(error),
          
        );
        console.log(this.state.lat)
      
        let token = sessionStorage.getItem('token');
        let config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
        }
        };
        if ("geolocation" in navigator) {
          console.log("Available");
        } else {
          console.log("Not Available");
        }
        Geocode.setApiKey("AIzaSyAER2Hipy8v6OpK1khTMjQgaFRNlbrwbcI");
        Geocode.fromLatLng(this.state.lat, this.state.lng).then(
          response => {
            const address = response.results[0].formatted_address;
            this.setState({ address })
            console.log(address);
          },
          error => {
            console.error(error);
          }
        );
        
        let data = {
            "curr_latitude": this.state.lat,
            "curr_longitude": this.state.lng
        };
        axios.post(`https://projectstackserver.herokuapp.com/api/location/`, data, config)
      .then(res => {
        const stores = res.data;
        this.setState({ stores });
        

      
        })       
    }   

    // componentWillMount() {
    //   navigator.geolocation.getCurrentPosition(
    //     position => {
    //       this.setState({ lat: position.coords.latitude, lng: position.coords.longitude});
    //     },
    //     error => console.log(error)
    //   );
    // }

    // componentDidMount() {

    //     let token = sessionStorage.getItem('token');
    //     let config = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'x-auth-token': token
    //     }
    //     };

    //     let data = {
    //         "curr_latitude": 75.63,
    //         "curr_longitude": 82.91
    //     };
    //     axios.post(`http://localhost:8001/api/location/`, data, config)
    //   .then(res => {
    //     const stores = res.data;
    //     this.setState({ stores });
    //     //this.setState({ location_json });
        
    //   })
    //   }

    
    
    componentWillMount() {
      clearInterval(this.interval);
     
    }
    showcurrentlocation = () =>{
     

    }

    
    componentDidMount() {
      //this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({lat: position.coords.latitude,lng: position.coords.longitude});
          console.log(this.state.lat)
        },
        error => console.log(error)
        
      );
      if ("geolocation" in navigator) {
        console.log("Available");
      } else {
        console.log("Not Available");
      }
 
      
      
      
    }

    

    
    

    displayMarkers = () => {
        return this.state.stores.map((store, index) => {
        return <Marker key={index} id={index} position={{
        lat: store.latitude,
        lng: store.longitude
        }}
        onClick={() => console.log("You clicked me!")}
        title = {store.franchise_name} 
        //icon = "https://cdn4.iconfinder.com/data/icons/map-pins-2/256/21-512.png"
        //scale= "0.05"
        icon={{
          url: "https://cdn4.iconfinder.com/data/icons/map-pins-2/256/21-512.png",
          scale : 0.05,
          scaledSize:  new this.props.google.maps.Size(40,40)
        }}
        />
      })   
    }
  render() {
    return (
      <div>
        <br></br>
    <p>&nbsp;<b>Current Address</b>: {this.state.address}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Latitude: </b>{this.state.lat}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Longitude: </b>{this.state.lng}</p>
        {this.showcurrentlocation()}
        {/* {this.state.hh} */}
        <Map
        google={this.props.google}
        zoom={10}
          style={mapStyles}
          initialCenter={{lat: this.state.lat,lng: this.state.lng}}
        >
          {this.displayMarkers()}
          <Marker position={{ lat: this.state.lat, lng: this.state.lng}} title="My Location" />
          </Map>
          
      
          {/* return this.state.stores.map((store, index) => {
              <li>{store.latitude}</li>
          } */}
            <div className="divtag">
 
            
            <MDBContainer className="w-auto p-3 container_size">
        <MDBJumbotron className='text-center'>
          <h4 className='h4 display-3'>We would be happy to serve you at</h4>
          <MDBCol md='12'>
            <MDBCard>
              <MDBCardBody>
                <MDBTable borderless>
                <MDBTableHead>
                    <tr>
                      <th>Sr No</th>
                      <th>Franchise Name</th>
                      <th>Address</th>
                      <th>Distance</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                      {this.state.stores.map((c, index) => (
                        <tr>
                        <td>{index + 1}</td>
                        <td>{c.franchise_name}</td>
                        <td>{c.address}</td>
                        <td>{(c.distance * 100).toFixed(2)} Km</td>
                        </tr> 
                      ))}
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
            </MDBCard>
        </MDBCol>
          
        </MDBJumbotron>
      </MDBContainer>
      </div>
          </div>
        
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAER2Hipy8v6OpK1khTMjQgaFRNlbrwbcI'
})(MapContainer);