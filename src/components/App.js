import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }


  ChangeFilterType = (type) => {
    this.setState({
      filters: { type: type }
    })
  }

  fetchPets = () => {
    const URL = this.state.filters.type === 'all' ?
        '/api/pets' :
        `/api/pets?type=${this.state.filters.type}`

    return fetch(URL)
    .then(resp => resp.json())
    .then(pets => this.setState({
      pets: pets
    }))
  }

  onAdoptPet = (id) => {
    const pets = JSON.parse(JSON.stringify(this.state.pets))
    const foundPet = pets.find( pet => pet.id === id)
    foundPet.isAdopted = true
    this.setState({pets: pets})
  }



  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onFindPetsClick={this.fetchPets}
                onChangeType={this.ChangeFilterType}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets}
                onAdoptPet={this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
