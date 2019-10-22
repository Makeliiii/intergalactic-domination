import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY

class ChargerMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        }

        this.markers = this.markers.bind(this)
        this.onMapClick = this.onMapClick.bind(this)
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/chargers/get')
            .then(res => res.json())
            .then(data => {
                this.setState({ data: data })
            })
    }

    onMapClick(props) {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

    markers() {
        return this.state.data.map((marker, index) => { 
            return <Marker 
                key={index} 
                id={index}
                name={marker.name}
                location={marker.location}
                type={marker.type}
                inUse={marker.inUse ? "Yes" : "No"}
                position={{
                    lat: marker.latitude.$numberDecimal,
                    lng: marker.longitude.$numberDecimal
                }}
                onClick={(props, marker, e) => {
                    this.setState({
                        selectedPlace: props,
                        activeMarker: marker,
                        showingInfoWindow: true
                    })
                }} />
        })
    }

    render() {
        const mapStyles = {
            width: '60%',
            height: '100%'
        }

        return (
            <Map
                google={ this.props.google }
                zoom={ 6 }
                style={mapStyles}
                initialCenter={{ lat: 64.00, lng: 26.50 }}
                onClick={this.onMapClick} >
                
                {this.markers()}

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                        <h2>{this.state.selectedPlace.name}</h2>
                        <p>Location: {this.state.selectedPlace.location}</p>
                        <p>Type: {this.state.selectedPlace.type}</p>
                        <p>In Use: {this.state.selectedPlace.inUse}</p>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: API_KEY
})(ChargerMap)
