import React from 'react'
import Services from '../components/Services'
import SideDrawer from '../components/miscellanous/SideDrawer'
import axios from 'axios'

const Bazar = async () => {

    const dataRequired = await axios.get('/listings-required-services')
    const dataOffered = await axios.get('/listings-offered-services')

    console.log(dataOffered.data)

    return (
    <div stye={{ width: "100% "}}>
        <SideDrawer/>
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
    </div>
    )
}

export default Bazar