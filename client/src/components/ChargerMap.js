import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY

class ChargerMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }

        this.markers = this.markers.bind(this)
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/chargers/get')
            .then(res => res.json())
            .then(data => {
                this.setState({ data: data })
                console.log(this.state.data[0].latitude.$numberDecimal)
            })
    }

    markers() {
        return this.state.data.map((marker, index) => {
            return <Marker key={index} id={index} position={{
                lat: marker.latitude.$numberDecimal,
                lng: marker.longitude.$numberDecimal
            }}
            onClick={() => console.log('You clicked!')} />
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
            >
                {this.markers()}
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: API_KEY
})(ChargerMap)
