import React from 'react'
import { Link } from 'react-router-dom'

const UserServices = (props) => {

    const [posts, setPosts] = React.useState([])

    React.useEffect(() => {
        setPosts(props.services)
    },[props.services])

    const services = posts.map(item => (
        <div key={item._id} className='serviceImage'>
            <Link
            to='/service'
            state={{
                id: item._id,
                picture: item.picture,
                title: item.title,
                description: item.description,
                place: item.place,
                price: item.price,
                dataRequired: item.dataRequired,
                dataCreation: item.dataCreation,
                lastUpdate: item.lastUpdate
                }}>
                <div className='box'>
                    <div className='serviceInformations'>
                        <h2 className='serviceTitle'>{item.title}</h2>
                        <p>Where: {item.place}</p>
                        {item.price ? 
                        (<p>Price: {item.price}€</p>) :
                        (<p>Data required: {item.dataRequired.split('T')[0]}</p>)}
                        <p>Data creation: {item.dataCreation.split('T')[0]}</p>
                    </div>
                </div>
            </Link>
        </div>
    ))  

    return (
    <div>
        {services}
    </div>
    )
}

export default UserServices