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

  onChangeType = (input) => {
    this.setState({
      filters: {
        type: input
      }
    }, () => console.log(`App type Update: ${this.state.filters.type}`), 
    () => fetch('/api/pets')
    .then(resp => console.log(resp))
    )
  }

  onFindPetsClick = () => {
    const filterType = this.state.filters.type
    const url = filterType === 'all' ? '/api/pets' : `/api/pets?type=${filterType}`
    
    fetch(url)
    .then(resp => resp.json() )
    .then(pets => this.setState({pets: pets}))
    .then(console.log(this.state.pets))
  }

  onAdoptPet = (searchId) => {
    const pets = JSON.parse(JSON.stringify(this.state.pets))
    let foundPet = pets.find(pet=> pet.id === searchId)
    console.log(foundPet)
    foundPet.isAdopted = true
    this.setState({ pets })
    
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
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
