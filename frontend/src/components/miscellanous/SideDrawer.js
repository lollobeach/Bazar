import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerFooter, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast} from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import axios from 'axios'
import SearchLoading from './SearchLoading'
import OfferedServices from './OfferedServices'

const SideDrawer = () => {

  const [searchOfferedServices, setSearchOfferedServices] = React.useState()
  const [offeredServices, setOfferedServices] = React.useState()
  const [loading, setLoading] = React.useState(false)

  const toast = useToast()
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  let user = null
  if (localStorage.getItem("userInfo")) {
    user = JSON.parse(localStorage.getItem("userInfo"))
  } else {
    user = JSON.parse(sessionStorage.getItem("userInfo"))
  }

  const logoutHandler = () => {
    sessionStorage.removeItem("userInfo")
    localStorage.removeItem("userInfo")
    navigate('/')
  }

  const accessService = (itemId) => {

  }

  const handleSearchOfferedService = async () => {
    if(!searchOfferedServices){
      toast({
        title: "Please enter something",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      })
      return
    }
    try{
      setLoading(true)
      const {data} = await axios.get('/api/user?search=${searchOfferedService}') 
      setLoading(false)
      setSearchOfferedServices(data)
    } catch(err) { 
      toast({
        title: "Error occurred",
        description: "Failed to load search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      })
    }
  }

  return (
    <Box
      display="flex"
      justifyContent={"space-between"}
      alignItems={"center"}
      bgGradient="linear(to-r, blue.500, purple.200)"
      p="10px 50px"
      borderWidth={"5px"}
      borderColor="00FFFF"
      boxShadow='dark-lg'
      width="100%"
      >
        <Box
        display={"grid"}
        >
          <Tooltip label="Search Service" hasArrow placement='bottom-end'>
            <Button variant={"ghost"} ref={btnRef} onClick={onOpen}>
              <i className="fas fa-search"></i>
                <Text d={{base: "none"}} px="4">
                  Search Offered Service
                </Text>
            </Button>
          </Tooltip>
        <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Search Offered Service</DrawerHeader>
            <DrawerBody display={'flex'}>
              <Input 
              placeholder='Type here...'
              value={searchOfferedServices}
              onChange={e => setSearchOfferedServices(e.target.value)}
              />
              <Button
              onClick={handleSearchOfferedService}
              >
                search
              </Button>
              {loading? (
              <SearchLoading/>
                ):(
                  offeredServices?.map(item => (
                    <OfferedServices
                      key={item._id}
                      item={item}
                      handleFunction={() => accessService(item._id)}
                    />
                  ))
                )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Tooltip label="Search Service" hasArrow placement='bottom-end'>
          <Button variant={"ghost"} >
            <i className="fas fa-search"></i>
              <Text d={{base: "none"}} px="4">
                Search Required Service
              </Text>
          </Button>
        </Tooltip>
        </Box>
      <Link to="/">
        <Text as='button' fontSize={"5xl"} fontFamily="Work sans">
          Bazar
        </Text>
      </Link>
      <div>
        <Menu>
          <MenuButton p={1}> 
            <BellIcon fontSize="1.5rem" m={1}/>
          </MenuButton>
        </Menu>
        {user ? (
        <Menu >
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} height={"100%"}>
            {user.data.username ? (<Text>{user.data.username}</Text>)
            : <Text>{user.data.name}</Text>}
            <Avatar size={'sm'} cursor='pointer' name={user.data.username} src={user.data.pic} />
          </MenuButton>
          <MenuList>
            <Link to='/my-profile'>
              <MenuItem>My Profile</MenuItem>
            </Link>
            <MenuDivider />
              <Link to='/services'>
                <MenuItem>Services</MenuItem>
              </Link>
            <MenuDivider />
            <Link to='/chats'>
                <MenuItem>Chat</MenuItem>
              </Link>
            <MenuDivider />
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        </Menu>
        ):(
          <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <Avatar size={'sm'} cursor='pointer' />
          </MenuButton>
          <MenuList>
            <Link to='/auth'>
                <MenuItem>Registrati</MenuItem>
            </Link>
            <MenuDivider />
            <Link to='/auth'>
              <MenuItem>Accedi</MenuItem>
            </Link>
            <MenuDivider />
          </MenuList>
        </Menu>
        )}
      </div>
    </Box>

  )
}

export default SideDrawer