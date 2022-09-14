import React from 'react'
import axios from 'axios'
import UserServices from '../components/services/UserServices'
import SideDrawer from '../components/miscellanous/SideDrawer'
import ErrorPage from './ErrorPage'

const ServicesUserPage = () => {

    const [offeredServices, setOfferedServices] = React.useState()
    const [requiredServices, setRequiredServices] = React.useState()

    async function fetchServices() {
        const info = await JSON.parse(localStorage.getItem('userInfo'))
        if (info) {
            const token = info.data.token
            const _offeredServices = await axios.get('/listings-offered-services-user',
            { headers: {
                Authorization: `Bearer ${token}`
            }})
            setOfferedServices(_offeredServices.data)            
            const _requiredServices = await axios.get('/listings-required-services-user',
            { headers: {
                Authorization: `Bearer ${token}`
            }})
            setRequiredServices(_requiredServices.data)
        } else {
            console.error('401 Unauthorised')
        }
    }

    React.useEffect(() => {
        fetchServices()
    },[])

    if (!offeredServices || !requiredServices) {
        return (
            <div stye={{ width: "100% "}}>
                <SideDrawer/>
                <ErrorPage error={401} />
            </div>
        )
    } else {
        return (
            <div stye={{ width: "100% "}}>
                <SideDrawer/>
                <div className='container'>
                    <div className='offered-services-column'>
                        <h1>Offered Services</h1>
                        <UserServices services={offeredServices}/>
                    </div>
                    <div className='required-services-column'>
                        <h1>Required Services</h1>
                        <UserServices services={requiredServices} />
                    </div>
                </div>
            </div>
        )
    }
}

export default ServicesUserPage