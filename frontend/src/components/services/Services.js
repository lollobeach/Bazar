import React from 'react'


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
        <div key={item._id} className='serviceImage'>
            <div className='box'>
                <div className='serviceInformations'>
                    <h2 className='serviceTitle'>{item.title}</h2>
                    <p>Where: {item.place}</p>
                    <p>Data creation: {item.dataCreation.split('T')[0]}</p>
                </div>
                <a className='linkBox' href=''>READ MORE</a>
            </div>
        </div>
    ))
    
    return (
    <div>
        {services}
    </div>
    )
}

export default Services