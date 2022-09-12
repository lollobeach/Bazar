import SideDrawer from '../components/miscellanous/SideDrawer'
import { Container, Box, Text, Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react'
import React from 'react'

const ServicesPage = () => {
  return (
    <div>
      <SideDrawer />
      <Container maxW='55%'>
        <Box
          bgGradient="linear(to-r, blue.500, purple.200)"
          w="52%"
          h="100%"
          m="40px 0 15px 0"
          borderRadius="full"
          borderWidth="1px"
        >
          <Text fontSize="20px" fontFamily="monospace">Add Offered Service</Text>
        </Box>
        <Box
          bgGradient="linear(to-r, blue.500, purple.200)"
          w="52%"
          h="100%"
          m="40px 0 15px 0"
          borderRadius="full"
          borderWidth="1px"
        >
          <Text fontSize="20px" fontFamily="monospace">Update Offered Service</Text>
        </Box>
        <Box
          bgGradient="linear(to-r, blue.500, purple.200)"
          w="52%"
          h="100%"
          m="40px 0 15px 0"
          borderRadius="full"
          borderWidth="1px"
        >
          <Text fontSize="20px" fontFamily="monospace">Delete Offered Service</Text>
        </Box>
      </Container>
    </div>
  )
}

export default ServicesPage