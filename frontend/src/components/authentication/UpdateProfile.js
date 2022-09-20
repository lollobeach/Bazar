import React from 'react'
import { useToast, Image, Input, Button, VStack, Box, Badge } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UpdateProfile = (props) => {

    const [email, setEmail] = React.useState(props.user.email)
    const [picture, setPicture] = React.useState(props.user.picture)
    const [username, setUsername] = React.useState(props.user.username)
    const [name, setName] = React.useState(props.user.name)
    const [lastName, setLastName] = React.useState(props.user.lastName)
    const [birthDate, setBirthDate] = React.useState(props.user.birthDate)
    const [residence, setResidence] = React.useState(props.user.residence)
    const [address, setAddress] = React.useState(props.user.address)
    const [iva, setIva] = React.useState(props.user.iva)
    
    const [loading, setLoading] = React.useState(false)

    const navigate = useNavigate()
    const toast = useToast()

    const postDetails = async (pics) => {
        setLoading(true)
        if(pics.type === "image/jpg" || pics.type === "image/png" || pics.type === "image/jpeg") {
            const data = new FormData()
            data.append("file", pics)
            data.append("upload_preset", "bazar_")
            data.append("cloud_name", "paw2022")
            fetch("https://api.cloudinary.com/v1_1/paw2022/image/upload", {
                method: 'post',
                body: data,
            }).then((res) => res.json())
            .then(data => {
            setPicture(data.url.toString())
            setLoading(false)
            })
            .catch((err) => {
            console.log(err)
            setLoading(false)
            })
        }
    }

    const denie = () => navigate('/services')

    const updateProfile = async () => {
        const validIva = new RegExp('^[A-Z]{2}[0-9]{11}$')
        const date = new Date().getTime()
        const birth = new Date(birthDate).getTime()
        if (!validIva.test(iva)) {
            toast({
                title: "Email format not correct",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
            setLoading(false)
            return
        }
        if (birth > date) {
            toast({
                title: "Birthdate is not valid",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            setLoading(false)
            return
        }
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                },
                params: {
                    idUser: props.user.idUser
                }
            }
            if (username) {
                const data = {
                    picture: picture,
                    name: name,
                    lastName: lastName,
                    birthDate: birthDate,
                    username: username,
                    email: email
                }
                await axios.patch('/update-user',
                    data,
                    config
                    )
            } else {
                const data = {
                    email: email,
                    picture: picture,
                    name: name,
                    countryOfResidence: residence,
                    address: address,
                    iva: iva
                }
                await axios.patch('/update-user',
                data,
                config
                )
            }
            toast({
                title: "User updated correctly",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
                })
            setLoading(false)
            navigate('/services')
        } catch (err) {
            toast({
                title: "Error Occured!",
                description: err.response.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            setLoading(false)
        }
    }

    const form = (
        <Box margin='2%' w='60%' borderWidth='5px' borderRadius='lg' display='flex' overflow='hidden'>
            <Image height='560px' w='50%' src={picture} alt='hi' />
            <Box w='50%'>
                <Box mt='3%' display='grid'>
                    <Badge ml='25%' w='50%' borderRadius='full' px='10' colorScheme='teal'>
                        Email
                    </Badge>
                        <Input
                        mt='2%'
                        ml='15%'
                        placeholder={email}
                        color='gray.500'
                        fontWeight='semibold'
                        letterSpacing='wide'
                        fontSize='xs'
                        w='70%'
                        onChange={(e) => setEmail(e.target.value)}
                        />
                </Box>
                <Box display='grid' mt='5%'>
                    <Badge w='50%' ml='25%' borderRadius='full' px='10' colorScheme='teal'>
                        Name
                    </Badge>
                    <Input
                        placeholder={name}
                        color='gray.500'
                        fontWeight='semibold'
                        letterSpacing='wide'
                        fontSize='xs'
                        w='70%'
                        ml='15%'
                        mt='2%'
                        onChange={(e) => setName(e.target.value)}
                    />
                </Box>
                {username ? (
                    <Box>
                        <Box display='grid' mt='5%'>
                            <Badge w='50%' ml='25%' borderRadius='full' px='10' colorScheme='teal'>
                                Lastname
                            </Badge>
                            <Input
                            placeholder={lastName}
                            color='gray.500'
                            fontWeight='semibold'
                            letterSpacing='wide'
                            w='70%'
                            fontSize='xs'
                            ml='15%'
                            mt='2%'
                            onChange={(e) => setLastName(e.target.value)}
                            />
                        </Box>
                        <Box display='grid' mt='5%'>
                            <Badge w='50%' ml='25%' borderRadius='full' px='10' colorScheme='teal'>
                                Username
                            </Badge>
                            <Input
                            placeholder={username}
                            color='gray.500'
                            fontWeight='semibold'
                            letterSpacing='wide'
                            w='70%'
                            fontSize='xs'
                            ml='15%'
                            mt='2%'
                            onChange={(e) => setUsername(e.target.value)}
                            />
                        </Box>
                        <Box display='grid' mt='5%'>
                            <Badge w='50%' ml='25%' borderRadius='full' px='10' colorScheme='teal'>
                                Birthdate
                            </Badge>
                            <Input
                            type='date'
                            color='gray.500'
                            fontWeight='semibold'
                            letterSpacing='wide'
                            w='70%'
                            fontSize='xs'
                            ml='15%'
                            mt='2%'
                            onChange={(e) => setBirthDate(e.target.value)}
                            />
                        </Box>
                    </Box>
                ) : (
                    <Box>
                        <Box display='grid' mt='5%'>
                            <Badge w='50%' ml='25%' borderRadius='full' px='10' colorScheme='teal'>
                                Residence
                            </Badge>
                            <Input
                            placeholder={residence}
                            color='gray.500'
                            fontWeight='semibold'
                            letterSpacing='wide'
                            w='70%'
                            fontSize='xs'
                            ml='15%'
                            mt='2%'
                            onChange={(e) => setResidence(e.target.value)}
                            />
                        </Box>
                        <Box display='grid' mt='5%'>
                            <Badge w='50%' ml='25%' borderRadius='full' px='10' colorScheme='teal'>
                                Address
                            </Badge>
                            <Input
                            placeholder={address}
                            color='gray.500'
                            fontWeight='semibold'
                            letterSpacing='wide'
                            w='70%'
                            fontSize='xs'
                            ml='15%'
                            mt='2%'
                            onChange={(e) => setAddress(e.target.value)}
                            />
                        </Box>
                        <Box display='grid' mt='5%'>
                            <Badge w='50%' ml='25%' borderRadius='full' px='10' colorScheme='teal'>
                                IVA
                            </Badge>
                            <Input
                            placeholder={iva}
                            color='gray.500'
                            fontWeight='semibold'
                            letterSpacing='wide'
                            w='70%'
                            fontSize='xs'
                            ml='15%'
                            mt='2%'
                            onChange={(e) => setIva(e.target.value)}
                            />
                        </Box>
                    </Box>
                )}
                <Box mt='5%'>
                        <Badge borderRadius='full' px='10' colorScheme='teal'>
                            Upload your picture
                        </Badge>
                        <Input
                        mt='2%'
                        type={'file'}
                        p={1.5}
                        accept='image/*'
                        onChange={(e) => postDetails(e.target.files[0])}
                        />
                </Box>
                <Box display='flex'>
                    <Button
                    colorScheme={"blue"}
                    width={"50%"}
                    style={{marginTop: 15}}
                    onClick={updateProfile}
                    isLoading={loading}
                    >
                        Update
                    </Button>
                    <Button
                    colorScheme={"red"}
                    width={"50%"}
                    style={{marginTop: 15}}
                    onClick={denie}
                    isLoading={loading}
                    >
                        Denie
                    </Button>
                </Box>
            </Box>
        </Box>
)

    return (
        <VStack>
            {form}
        </VStack>
    )
}

export default UpdateProfile