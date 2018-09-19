import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  createCards = () => {
    return this.props.pets.map(petInstance => {
      return <Pet pet={petInstance} isAdopted={petInstance.isAdopted} onAdoptPet={this.props.onAdoptPet}/>
    })
  }
  render() {
    return (
      <div className="ui cards">{ this.createCards() }</div>

    )
    }
  }

export default PetBrowser
