import React from 'react'
import { Link } from 'react-router-dom'


const Services = (props) => {

    const [posts, setPosts] = React.useState([])

    React.useEffect(() => {
        setPosts(props.services)
    },[props.services])
//riga sotto service class ci andra l immagine
    /*const services = posts.map(item => (
    <div key={item._id} className='service'>
        <div className='serviceImage'>
        <div className='box'> 
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>Where: {item.place}</p>
            {item.price ? 
            (<p className='servicePrice'>Price: {item.price}€</p>) :
            (<p>Data required: {item.dataRequired.split('T')[0]}</p>)}
            <p>Data creation: {item.dataCreation.split('T')[0]}</p>
            </div>
        </div>
    </div>
    ))  
    */
    /*const services = posts.map(item => (
        <div key={item._id} className='service'>
            <div className='serviceImage'></div>
            <div className='box'> 
                <h2 className='serviceTitle'>{item.title}</h2>
                <p>Where: {item.place}</p>
                <p>Data creation: {item.dataCreation.split('T')[0]}</p>
                <a href=''>READ MORE</a>
                </div>
        
        </div>
        ))  
        */

        /*const services = posts.map(item => (
            <div key={item._id} className='service'>
                <div className='box'>
                <div className='serviceImage'></div>
                
                    <h2 className='serviceTitle'>{item.title}</h2>
                    <p>Where: {item.place}</p>
                    <p>Data creation: {item.dataCreation.split('T')[0]}</p>
                    <a href=''>READ MORE</a>
                    </div>
                    
            
            </div>
            ))  
            */
    const services = posts.map(item => (
        <Link
        to='/service'
        key={item._id}
        state={{
            picture: item.picture,
            id: item._id,
            title: item.title,
            description: item.description,
            place: item.place,
            price: item.price,
            dataRequired: item.dataRequired,
            dataCreation: item.dataCreation,
            lastUpdate: item.lastUpdate,
            user: item.user
        }}>
            <div className='serviceImage'>
                <div className='box'>
                    <div className='serviceInformations'>
                        <h2 className='serviceTitle'>{item.title}</h2>
                        <p>Where: {item.place}</p>
                        <p>Data creation: {item.dataCreation.split('T')[0]}</p>
                        {item.dataRequired ? (
                            <p>Data required: {item.dataRequired.split('T')[0]}</p>
                        ) : (
                            <p>Price: {item.price}€</p>
                        )}
                    </div>
                </div>
            </div>
        </Link>

    ))
    
    return (
    <div>
        {services}
    </div>
    )
}

export default Services