import axios from 'axios'
import React from 'react'
import SideDrawer from '../components/miscellanous/SideDrawer'
import { VStack, Box, Image, Badge, Button } from '@chakra-ui/react'
import ErrorPage from './ErrorPage'
import { useNavigate } from 'react-router-dom'
import UpdateProfile from '../components/authentication/UpdateProfile'

const MyProfilePage = () => {

    const [user, setUser] = React.useState()

    const [error, setError] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const [update, setUpdate] = React.useState(false)

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
                    setUser({
                        idUser: user.data._id,
                        email: user.data.email,
                        picture: user.data.picture,
                        username: user.data.username,
                        name: user.data.name,
                        lastName: user.data.lastName,
                        birthDate: user.data.birthDate,
                        plan:user.data.plan,
                        residence: user.data.countryOfResidence,
                        address: user.data.address,
                        iva: user.data.iva
                    })
            }
        } else {
            setError(401)
        }
    }

    const handleUpdate = () => setUpdate(!update)

    const del = async () => {
        let config = null
        if (user.username) {
            config = {
                params: { user: user.username}
            }
        } else {
            config = {
                params: { user: user.name}
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
    

    if (!user) {
        return (
            <div style={{ width: '100%' }}>
                <SideDrawer />
                <ErrorPage error={error} />
            </div>
        )
    } else {
        if (update) {
            return (
                <div>
                    <SideDrawer />
                    <UpdateProfile user={user} />
                </div>
            )
        }
        return (
            <div>
                <SideDrawer/>
                <VStack>
                    <Box margin='2%' w='60%' borderWidth='5px' borderRadius='lg' display='flex' overflow='hidden'>
                        <Image height='500px' w='50%' src={user.picture} alt='hi' />
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
                                    {user.idUser}
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
                                    {user.email}
                                </Box>
                            </Box>
                            {user.username ? (
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
                                            {user.username}
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
                                        {user.name}
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
                                        {user.lastName}
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
                                        {user.birthDate.split('T')[0]}
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
                                        {user.plan}
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
                                            {user.name}
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
                                            {user.residence}
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
                                            {user.address}
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
                                            {user.iva}
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                            <Button
                            mt='5%'
                            colorScheme={'red'}
                            width='30%'
                            onClick={del}
                            isLoading={loading}
                            >
                                Delete account
                            </Button>
                            <Button
                            mt='5%'
                            colorScheme={'blue'}
                            width='30%'
                            onClick={handleUpdate}
                            >
                                Update account
                            </Button>
                        </Box>
                    </Box>
                </VStack>
            </div>
        )
    }
}

export default MyProfilePage