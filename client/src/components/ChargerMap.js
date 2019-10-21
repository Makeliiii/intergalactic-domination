import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY

class ChargerMap extends Component {
    render() {
        const mapStyles = {
            width: '60%',
            height: '100%'
        }
        return (
            <Map
                google={ this.props.google }
                zoom={ 8 }
                style={mapStyles}
                initialCenter={{ lat: 64.992572, lng: 25.460457 }}
            />
        )
    }
}

export default GoogleApiWrapper({
    apiKey: API_KEY
})(ChargerMap)
