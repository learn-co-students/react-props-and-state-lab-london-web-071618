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

    this.setAllPets()
  }

  setAllPets = () => {
    fetch("/api/pets").then(res => res.json())
    .then(petsData => {
      this.setState({
        pets: petsData
      }, () => console.log(this.state))
    })
  }

  setFilter = (selectedType) => {
    this.setState({
      filters: {
        type: selectedType
      }
    })
  }

  getPets = () => {
    const url = this.state.filters.type === "all" ? "/api/pets" : `/api/pets?type=${this.state.filters.type}`
    fetch(url).then(res => res.json())
    .then(petData => {
      this.setState({
        pets: petData
      }, ()=>console.log(this.state))
    })
  }

  adoptPet = (petId) => {
    const allPets = JSON.parse(JSON.stringify(this.state.pets))
    const foundPet = allPets.find(pet => pet.id === petId)
    foundPet.isAdopted = true
    this.setState({ pets: allPets }, () => console.log(this.state.pets))

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
              <Filters onChangeType={this.setFilter} onFindPetsClick={this.getPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// App.defaultProps({
//   fetch("/api/pets").then(res => res.json())
//   .then(petsData => {
//     this.setState({
//       pets: petsData
//     })
//   })
//   pets: 
// })

export default App
