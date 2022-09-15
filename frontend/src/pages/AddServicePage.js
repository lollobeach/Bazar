import React from 'react'
import { Box, Tabs, Tab, TabList, TabPanels, TabPanel} from '@chakra-ui/react'
import SideDrawer from '../components/miscellanous/SideDrawer'
import AddOfferedService from '../components/services/AddOfferedService'
import AddRequiredService from '../components/services/AddRequiredService'
import ErrorPage from './ErrorPage'

const AddServices = () => {

  const [error, setError] = React.useState()
  const [info, setInfo] = React.useState()

  async function fetchInfo() {
    const info = await JSON.parse(localStorage.getItem('userInfo'))
    if (info) setInfo(info.data)
    else setError(401)
  }

  React.useEffect(() => {
    fetchInfo()
  },[])

  if (!info) {
    return (
      <div syle={{ width:'100%'}}>
        <SideDrawer />
        <ErrorPage error={error} />
      </div>
    )
  } else {
    if (info.username) {
      return (
        <div>
          <SideDrawer />
          <Box w="100%" p={4} borderRadius="2xl" color="black">
          <Tabs variant='soft-rounded' colorScheme='green' >
            <TabList mb="1em">
              <Tab width="50%">Offered Service</Tab>
              <Tab width="50%">Required Service</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AddOfferedService info={info} />
              </TabPanel>
              <TabPanel>
                <AddRequiredService info={info} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        </div>
      )
    } else {
      return (
        <div>
          <SideDrawer />
          <Box            
            w="100%"
            m="40px 0 15px 0"
            >
            <AddOfferedService info={info} />
          </Box>
        </div>
      )
    }
  }
}

export default AddServices