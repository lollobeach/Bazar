import React from 'react'
import UserServices from '../components/services/UserServices'
import SideDrawer from '../components/miscellanous/SideDrawer'
import axios from 'axios'

const UserSerevicesPage = () => {

    const [offeredServices, setOfferedServices] = React.useState([])
    const [requiredServices, setRequiredServices] = React.useState([])

    async function fetchOfferedServices() {
        const data = await axios.get('/listings-offered-services-user')
        setOfferedServices(data.data)
    }

    async function fetchRequiredServices() {
        const data = await axios.get('/listings-required-services-user')
        setRequiredServices(data.data)
    }

    React.useEffect(() => {
        fetchOfferedServices()
        fetchRequiredServices()
    },[])

  return (
    <div stye={{ width: "100% "}}>
    <SideDrawer/>
    <div className='container'>
        <div>
            <h1>Offered Services</h1>
            <UserServices services={offeredServices}/>
        </div>
        <div>
            <h1>Required Services</h1>
            <UserServices services={requiredServices} />
        </div>
    </div>
</div>
  )
}

export default UserSerevicesPage