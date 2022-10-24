import React from 'react'
import axios from 'axios'
import Services from '../components/services/Services'
import SideDrawer from '../components/miscellanous/SideDrawer'
import ErrorPage from './ErrorPage'
import { Box, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { decrypt } from '../utils/decrypted_value'
import Footer from '../components/miscellanous/Footer'

const ServicesUserPage = () => {

    const [offeredServices, setOfferedServices] = React.useState()
    const [requiredServices, setRequiredServices] = React.useState()
    const [corporateServices, setCorporateServices] = React.useState()
    const [info, setInfo] = React.useState()
    const [error, setError] = React.useState()

    React.useEffect(() => {
        async function fetchServices() {
            let _info = null
            let data = null
            if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
                data = decrypt(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
                _info = JSON.parse(data)
            } else if (sessionStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
                data = decrypt(sessionStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
                _info = JSON.parse(data)
            } else {
                setError(401)
            }
            if (_info) {
                setInfo(_info.data)
                if (_info.data.username) {
                    const token = _info.data.token
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
                } else if (_info.data.name) {
                    const token = _info.data.token
                    const _offeredServices = await axios.get('/listings-offered-services-user',
                    { headers: {
                        Authorization: `Bearer ${token}`
                    }})
                    setCorporateServices(_offeredServices.data)
                }
            }
        }
        fetchServices()
    },[])

    if ((!offeredServices || !requiredServices) && !corporateServices) {
        return (
            <div stye={{ width: "100%" }}>
                <SideDrawer/>
                <ErrorPage error={error} />
            </div>
        )
    } else {
        return (
            <div className='superContainerUserPage'> 
                <SideDrawer/>
                <Box pt={'64px'}>
                { !corporateServices ? (
                    <Link 
                    to='/add-service'
                    state={{ 
                        postsNumber: offeredServices.length,
                        info: info
                    }}
                    >
                        <Button
                        mt='2%'
                        colorScheme={"blue"}
                        width="20%"
                        >
                            Add Service
                        </Button>
                    </Link>
                ) : (
                    <Link 
                    to='/add-service'
                    state= {{ info: info}}
                    >
                        <Button
                        mt='2%'
                        colorScheme={"blue"}
                        width="20%"
                        >
                            Add Service
                        </Button>
                    </Link>
                )}
                </Box>
                {corporateServices ? (
                <div className='superContainer'>
                    <div className='container-corp-service'>
                        <div className='offered-services-column-corporate'>
                            <h1>Offered Services</h1>
                            <Services services={corporateServices} />
                        </div>
                    </div>
                </div>
                ) : (
                <div className='superContainer'>
                    <div className='containerUserPage'>
                        <div className='offered-services-column'>
                            <h1>Offered Services</h1>
                            <Services services={offeredServices} />
                    </div>
                    <div className='required-services-column'>
                        <h1>Required Services</h1>
                        <Services services={requiredServices} />
                    </div>
                    </div>
                </div>
                )}
                <Footer />
            </div>
        )
    }
}

export default ServicesUserPage