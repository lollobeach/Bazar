import axios from 'axios'
import React from 'react'
import SideDrawer from '../components/miscellanous/SideDrawer'
import { VStack, Box, Image, Badge, Button } from '@chakra-ui/react'
import ErrorPage from './ErrorPage'
import { useNavigate } from 'react-router-dom'

const MyProfilePage = () => {

    const [idUser, setIdUser] = React.useState()
    const [email, setEmail] = React.useState()
    const [picture, setPicture] = React.useState()

    const [username, setUsername] = React.useState()
    const [nameUser, setNameUser] = React.useState()
    const [lastName, setLastName] = React.useState()
    const [birthDate, setBirthDate] = React.useState()
    const [plan, setPlan] = React.useState()

    const [nameCorporate, setNameCorporate] = React.useState()
    const [residence, setResidence] = React.useState()
    const [address, setAddress] = React.useState()
    const [iva, setIva] = React.useState()

    const [error, setError] = React.useState()
    const [loading, setLoading] = React.useState(false)

    const navigate = useNavigate()

    async function fetchInfo() {
        const info = JSON.parse(localStorage.getItem('userInfo'))
        if (info) {
            const idUser = info.data.id
            const config = {
                params: { idUser: idUser }
            }
            const user = await axios.get('/get-user', config)
            if (user) {
                setIdUser(user.data._id)
                setEmail(user.data.email)
                setPicture(user.data.picture)
                if (user.data.username) {
                    setUsername(user.data.username)
                    setNameUser(user.data.name)
                    setLastName(user.data.lastName)
                    setBirthDate(user.data.birthDate)
                    setPlan(user.data.plan)
                } else {
                    setNameCorporate(user.data.name)
                    setResidence(user.data.countryOfResidence)
                    setAddress(user.data.address)
                    setIva(user.data.iva)
                }
            }
        } else {
            setError(401)
        }
    }

    const del = async () => {
        let config = null
        if (username) {
            config = {
                params: { user: username}
            }
        } else {
            config = {
                params: { user: nameCorporate}
            }
        }
        setLoading(true)
        await axios.delete('/delete_account', config)
        localStorage.removeItem('userInfo')
        setLoading(false)
        navigate('/')
    }

    React.useEffect(() => {
        fetchInfo()
    },[])
    

    if (!email) {
        return (
            <div style={{ width: '100%' }}>
                <SideDrawer />
                <ErrorPage error={error} />
            </div>
        )
    } else {
        return (
            <div>
                <SideDrawer/>
                <VStack>
                    <Box margin='2%' w='60%' borderWidth='5px' borderRadius='lg' display='flex' overflow='hidden'>
                        <Image height='500px' w='50%' src={picture} alt='hi' />
                        <Box w='50%'>
                            <Box mt='5%' alignItems='baseline'>
                                <Badge borderRadius='full' px='10' colorScheme='teal'>
                                    ID
                                </Badge>
                                <Box
                                    color='gray.500'
                                    fontWeight='semibold'
                                    letterSpacing='wide'
                                    fontSize='xs'
                                    ml='2'
                                >
                                    {idUser}
                                </Box>
                            </Box>
                            <Box mt='2%' alignItems='baseline'>
                                <Badge borderRadius='full' px='10' colorScheme='teal'>
                                    Email
                                </Badge>
                                <Box
                                    color='gray.500'
                                    fontWeight='semibold'
                                    letterSpacing='wide'
                                    fontSize='xs'
                                    ml='2'
                                >
                                    {email}
                                </Box>
                            </Box>
                            {username ? (
                                <Box>
                                    <Box mt='2%' alignItems='baseline'>
                                        <Badge borderRadius='full' px='10' colorScheme='teal'>
                                            Username
                                        </Badge>
                                        <Box
                                            color='gray.500'
                                            fontWeight='semibold'
                                            letterSpacing='wide'
                                            fontSize='xs'
                                            ml='2'
                                        >
                                            {username}
                                        </Box>
                                    </Box>
                                <Box mt='2%' alignItems='baseline'>
                                    <Badge borderRadius='full' px='10' colorScheme='teal'>
                                        Name
                                    </Badge>
                                    <Box
                                        color='gray.500'
                                        fontWeight='semibold'
                                        letterSpacing='wide'
                                        fontSize='xs'
                                        ml='2'
                                    >
                                        {nameUser}
                                    </Box>
                                </Box>
                                <Box mt='2%' alignItems='baseline'>
                                    <Badge borderRadius='full' px='10' colorScheme='teal'>
                                        Lastname
                                    </Badge>
                                    <Box
                                        color='gray.500'
                                        fontWeight='semibold'
                                        letterSpacing='wide'
                                        fontSize='xs'
                                        ml='2'
                                    >
                                        {lastName}
                                    </Box>
                                </Box>
                                <Box mt='2%' alignItems='baseline'>
                                    <Badge borderRadius='full' px='10' colorScheme='teal'>
                                        Brithdate
                                    </Badge>
                                    <Box
                                        color='gray.500'
                                        fontWeight='semibold'
                                        letterSpacing='wide'
                                        fontSize='xs'
                                        ml='2'
                                    >
                                        {birthDate.split('T')[0]}
                                    </Box>
                                </Box>
                                <Box mt='2%' alignItems='baseline'>
                                    <Badge borderRadius='full' px='10' colorScheme='teal'>
                                        Plan
                                    </Badge>
                                    <Box
                                        color='gray.500'
                                        fontWeight='semibold'
                                        letterSpacing='wide'
                                        fontSize='xs'
                                        ml='2'
                                    >
                                        {plan}
                                    </Box>
                                </Box>
                            </Box>
                            ) : (
                                <Box>
                                    <Box mt='2%' alignItems='baseline'>
                                        <Badge borderRadius='full' px='10' colorScheme='teal'>
                                            Corporate name
                                        </Badge>
                                        <Box
                                            color='gray.500'
                                            fontWeight='semibold'
                                            letterSpacing='wide'
                                            fontSize='xs'
                                            textTransform='uppercase'
                                            ml='2'
                                        >
                                            {nameCorporate}
                                    </Box>
                                    </Box>
                                    <Box mt='2%' alignItems='baseline'>
                                        <Badge borderRadius='full' px='10' colorScheme='teal'>
                                            Residence
                                        </Badge>
                                        <Box
                                            color='gray.500'
                                            fontWeight='semibold'
                                            letterSpacing='wide'
                                            fontSize='xs'
                                            ml='2'
                                        >
                                            {residence}
                                        </Box>
                                    </Box>
                                    <Box mt='2%' alignItems='baseline'>
                                        <Badge borderRadius='full' px='10' colorScheme='teal'>
                                            Address
                                        </Badge>
                                        <Box
                                            color='gray.500'
                                            fontWeight='semibold'
                                            letterSpacing='wide'
                                            fontSize='xs'
                                            ml='2'
                                        >
                                            {address}
                                        </Box>
                                    </Box>
                                    <Box mt='2%' alignItems='baseline'>
                                        <Badge borderRadius='full' px='10' colorScheme='teal'>
                                            IVA
                                        </Badge>
                                        <Box
                                            color='gray.500'
                                            fontWeight='semibold'
                                            letterSpacing='wide'
                                            fontSize='xs'
                                            ml='2'
                                        >
                                            {iva}
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                            <Button
                            mt='5%'
                            colorScheme={'red'}
                            width='50%'
                            onClick={del}
                            isLoading={loading}
                            >
                                Delete account
                            </Button>
                        </Box>
                    </Box>
                </VStack>
            </div>
        )
    }
}

export default MyProfilePage