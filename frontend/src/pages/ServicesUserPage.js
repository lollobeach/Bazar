import React from 'react'
import axios from 'axios'
import UserServices from '../components/services/UserServices'
import SideDrawer from '../components/miscellanous/SideDrawer'
import ErrorPage from './ErrorPage'
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const ServicesUserPage = () => {

    const [offeredServices, setOfferedServices] = React.useState()
    const [requiredServices, setRequiredServices] = React.useState()
    const [corporateServices, setCorporateServices] = React.useState()
    const [error, setError] = React.useState()

    async function fetchServices() {
        const info = await JSON.parse(localStorage.getItem('userInfo'))
        if (info.data.username) {
            const token = info.data.token
            const _offeredServices = await axios.get('/listings-offered-services-user',
            { headers: {
                Authorization: `Bearer ${token}`
            }})           
            const _requiredServices = await axios.get('/listings-required-services-user',
            { headers: {
                Authorization: `Bearer ${token}`
            }})
            setOfferedServices(_offeredServices.data) 
            setRequiredServices(_requiredServices.data)
        } else if (info.data.name) {
            const token = info.data.token
            const _offeredServices = await axios.get('/listings-offered-services-user',
            { headers: {
                Authorization: `Bearer ${token}`
            }})
            setCorporateServices(_offeredServices.data)
        }
        else {
            setError(401)
        }
    }

    React.useEffect(() => {
        fetchServices()
    },[])

    if ((!offeredServices || !requiredServices) && !corporateServices) {
        return (
            <div stye={{ width: "100% "}}>
                <SideDrawer/>
                <ErrorPage error={error} />
            </div>
        )
    } else {
        return (
            <div stye={{ width: "100% "}}>
                <SideDrawer/>
                <Button
                    colorScheme={"blue"}
                >
                    <Link to={'/add-service'}>
                        Add Service
                    </Link>
                </Button>
                {corporateServices ? (
                    <div className='container-corp-service'>
                        <div className='offered-services-column'>
                            <h1>Offered Services</h1>
                            <UserServices services={corporateServices} />
                        </div>
                    </div>
                ) : (
                    <div className='container'>
                    <div className='offered-services-column'>
                        <h1>Offered Services</h1>
                        <UserServices services={offeredServices} />
                    </div>
                    <div className='required-services-column'>
                        <h1>Required Services</h1>
                        <UserServices services={requiredServices} />
                    </div>
                </div>
                )}
            </div>
        )
    }
}

export default ServicesUserPage