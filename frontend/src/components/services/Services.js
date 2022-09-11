import React from 'react'

const Services = (props) => {

    const [posts, setPosts] = React.useState([])

    React.useEffect(() => {
        setPosts(props.services)
    },[props.services])

    const services = posts.map(item => (
    <div key={item._id} className='service'>
        <h2>{item.title}</h2>
        <h3>{item.description}</h3>
        <p>Where: {item.place}</p>
        {item.price ? 
        (<p>Price: {item.price}€</p>) :
        (<p>Data required: {item.dataRequired.split('T')[0]}</p>)}
        <p>Data creation: {item.dataCreation.split('T')[0]}</p>
        </div>
    ))  

    return (
    <div>
        {services}
    </div>
    )
}

export default Services