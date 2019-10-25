import React, { Component } from 'react'

class MapSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: "",
            value: "name",
            data: [],
            filteredData: [],
        }

        // bind functions
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.listItems = this.listItems.bind(this)
    }

    handleSelectChange(e) {
        this.setState({value: e.target.value})
    }

    // checks the input and filters the list accordingly
    handleInputChange(e) {
        const query = e.target.value

        // filter the list by charger name
        if (this.state.value === "name") {
            this.setState(prevState => {
                const filteredData = prevState.data.filter(element => {
                    return element.name.toLowerCase().includes(query.toLowerCase())
                })
    
                return {
                    query,
                    filteredData
                }
            })
        }
        
        // filter the list by location/city name
        if (this.state.value === "location") {
            this.setState(prevState => {
                const filteredData = prevState.data.filter(element => {
                    return element.location.toLowerCase().includes(query.toLowerCase())
                })
    
                return {
                    query,
                    filteredData
                }
            })
        }
    }

    // return the list items using map()
    listItems() {
        return this.state.filteredData.map((charger, index) => {
            return <li 
                
                key={index}>{charger.name}</li>
        })
    }

    // fetch the charger data
    componentDidMount() {
        fetch('http://34.239.125.70/api/chargers/get')
            .then(res => res.json())
            .then(data => {
                const { query } = this.state
                const filteredData = data.filter(element => {
                    return element.name.toLowerCase().includes(query.toLowerCase())
                })

                this.setState({
                    data,
                    filteredData
                })
            })
    }

    render() {
        return (
            <div id='form'>
                <form>
                    <select value={this.state.value} onChange={this.handleSelectChange}>
                        <option value="name">Charger name</option>
                        <option value="location">Charger location</option>
                    </select> <br />
                    <input 
                    type='text'
                    placeholder='Search for...'
                    value={this.state.query}
                    onChange={this.handleInputChange} />
                </form>
                <ul>
                    {this.listItems()}
                </ul>
            </div>
        )
    }
}

export default MapSearch