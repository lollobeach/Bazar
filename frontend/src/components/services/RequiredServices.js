import React from 'react'
import axios from 'axios'

function RequiredServices(props) {

  const [posts, setPosts] = React.useState([])

  async function fetchServices() {
    const data = await axios.get('/listings-required-services')
    setPosts(data.data)
  }

  React.useEffect(() => {
    setPosts(props)
  },[])

  const services = posts.map(item => (
    <div key={item._id} className='required-service'>
      <p>
        <h2>{item.title}</h2>
        <h3>{item.description}</h3>
        <p>Where: {item.place}</p>
        <p>Data required: {item.dataRequired.split('T')[0]}</p>
        <p>Data creation: {item.dataCreation.split('T')[0]}</p>
      </p>
      </div>
  ))

  return (
    <div className='required-services'>
      <h1>Required Services</h1>
      {services}
    </div>
  )
}

export default RequiredServices