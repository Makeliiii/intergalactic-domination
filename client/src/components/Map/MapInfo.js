import React, { Component } from 'react'

class MapInfo extends Component {
    render() {
        return (
            <div id="mapInfo">
                <p>This map contains currently available chargers. Some of the slow chargers are free and some have a cost of 0.20€/min. The fast chargers are paid by electricity consumption and have a cost of 18c/kWh. You can see if a charger is free by clicking the marker.</p>
            </div>
        )
    }
}

export default MapInfo