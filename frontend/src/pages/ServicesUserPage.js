import React from 'react'
import axios from 'axios'
import UserServices from '../components/services/UserServices'
import SideDrawer from '../components/miscellanous/SideDrawer'

const ServicesUserPage = () => {

    const [offeredServices, setOfferedServices] = React.useState()
    const [requiredServices, setRequiredServices] = React.useState()

    function getToken() {
        const user = JSON.parse(localStorage.getItem('userInfo'))
        if (!user) return null
        else return user.data.token
    }

    async function fetchOfferedServices() {
        const token = getToken()
        await axios.get('/listings-offered-services-user',
        { headers: {
            "Authorization": `Bearer ${token}`
        }})
        .then(response => setOfferedServices(response.data))
        .catch(err => setOfferedServices({errorMessage: err.message}))
    }

    async function fetchRequiredServices() {
        const token = getToken()
        await axios.get('/listings-offered-services-user',
        { headers: {
            "Authorization": `Bearer ${token}`
        }})
        .then(response => setRequiredServices(response.data))
        .catch(err => setRequiredServices(err.message))
    }

    React.useEffect(() => {
        fetchOfferedServices()
        fetchRequiredServices()
    },[])

    if (!Array.isArray(offeredServices)) {
        return (
            <div stye={{ width: "100% "}}>
                <SideDrawer/>
                <h1 style={{fontSize: '50px', padding: '50px'}}>Error 401 unauthorised</h1>
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