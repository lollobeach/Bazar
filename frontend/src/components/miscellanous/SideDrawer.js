import React from 'react'
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'

const SideDrawer = () => {
  return (
    <>
        <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems={"center"}
            bg="white"
            w="100%"
            p="5px 10px 5px 10px"
            borderWidth={"5px"}
        >
        <Tooltip label="Search User" hasArrow placement='bottom-end'>
          <Button variant={"ghost"} >
            <i className="fas fa-search"></i>
              <Text d={{base: "none", md: "flex"}} px="4">
                Search User
              </Text>
          </Button>
        </Tooltip>
        <Text fontSize={"2xl"} fontFamily="Work sans">
          Bazar
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}> 
              <BellIcon fontSize="1.5rem" m={1}/>
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar size={'sm'} cursor='pointer' />
            </MenuButton>
            <MenuList>
                <MenuItem>My Profile</MenuItem>
              <MenuDivider />
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  )
}

export default SideDrawer