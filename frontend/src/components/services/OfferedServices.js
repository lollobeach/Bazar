import React from 'react'
import axios from 'axios'

function OfferedServices() {

  const [posts, setPosts] = React.useState([])

  async function fetchServices() {
    const data = await axios.get('/listings-offered-services')
    setPosts(data.data)
  }

  React.useEffect(() => {
    fetchServices()
  },[])

  const services = posts.map(item => (
      <div key={item._id} className='offered-service'>
        <p>
          <h2>{item.title}</h2>
          <h3>{item.description}</h3>
          <p>Price: {item.price}€</p>
          <p>Where: {item.place}</p>
          <p>Data creation: {item.dataCreation.split('T')[0]}</p>
        </p>
        </div>
    ))  

  return (
    <div className='offered-services box'>
      <h1>Offered Services</h1>
      {services}
    </div>
  )
}

export default OfferedServices