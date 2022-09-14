import React from 'react'
import { VStack, Box, Button, Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react'
import SideDrawer from '../miscellanous/SideDrawer'

const addOfferedService = () => {
    console.log('Hello')
}

const addRequiredService = () => {
  console.log('Hi')
}

const AddServices = () => {
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
            <VStack spacing="5px" color="black">  
            <Button
              colorScheme={"blue"}
              width={"50%"}
              style={{marginTop: 15}}
            >
              Sign Up
            </Button>
            </VStack>
          </TabPanel>
          <TabPanel>
            <div>
              Hello
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
    </div>
  )
}

export default AddServices