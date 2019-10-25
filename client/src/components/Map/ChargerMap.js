import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'

// import children
import MapSearch from './MapSearch'
import MapInfo from './MapInfo'

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

        // bind functions
        this.markers = this.markers.bind(this)
        this.onMapClick = this.onMapClick.bind(this)
        this.onMarkerClick = this.onMarkerClick.bind(this)
    }

    // fetch the chargers
    componentDidMount() {
        fetch('http://34.239.125.70/api/chargers/get')
            .then(res => res.json())
            .then(data => {
                this.setState({ data: data })
            })
    }

    // if map gets clicked, then stop displaying the infowindow
    onMapClick(props) {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

    // display the info window when marker is clicked
    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    }

    // place all the markers on the map using map()
    markers() {
        return this.state.data.map((marker, index) => { 
            return <Marker 
                key={index} 
                id={index}
                name={marker.name}
                location={marker.location}
                type={marker.type}
                inUse={marker.inUse ? "Taken" : "Available"}
                free={marker.free ? "Yes" : "No"}
                position={{
                    lat: marker.latitude.$numberDecimal,
                    lng: marker.longitude.$numberDecimal
                }}
                onClick={this.onMarkerClick} />
        })
    }

    render() {
        const mapStyles = {
            width: '60%',
            height: '100%'
        }

        return (
            <div id='container'>
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
                            <p>Status: {this.state.selectedPlace.inUse}</p>
                            <p>Free: {this.state.selectedPlace.free}</p>
                    </InfoWindow>
                </Map>
                <div id="listAndInfo">
                    <MapInfo />
                    <MapSearch />
                </div>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: API_KEY
})(ChargerMap)
