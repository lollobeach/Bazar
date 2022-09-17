import React from 'react'

const UserServices = (props) => {

    const [posts, setPosts] = React.useState([])

    React.useEffect(() => {
        setPosts(props.services)
    },[props.services])

    const services = posts.map(item => (
        <div key={item._id} className='serviceImage'>
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
        </div>
    ))  

    return (
    <div>
        {services}
    </div>
    )
}

export default UserServices