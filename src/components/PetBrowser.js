import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  render () {
    return <div className='ui cards'> {this.props.pets.map(pett => <Pet key={pett.id} onAdoptPet={this.props.onAdoptPet} pet={pett} />)}</div>
  }
}

export default PetBrowser
