import React from 'react'
import Services from '../components/Services'
import axios from 'axios'

const Bazar = async () => {

  const dataRequired = await axios.get('/listings-required-services')
  const dataOffered = await axios.get('/listings-offered-services')

  console.log(dataOffered.data)

  return (
    <div className='container'>
      <div>
        <h1>Offered Services</h1>
        <Services service={dataOffered.data}/>
      </div>
      <div>
        <h1>Required Services</h1>
        <Services service={dataRequired.data} />
      </div>

    </div>
  )
}

export default Bazar