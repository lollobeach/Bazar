import React from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast, Stack, RadioGroup, Radio } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

    const [value, setValue] = React.useState('1')
    const [name, setName] = React.useState();
    const [lastName, setLastName] = React.useState();
    const [birthday, setBirthday] = React.useState()
    const [username, setUsername] = React.useState()
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [showPass, setShowPass] = React.useState(false);
    const [confirmpassword, setConfirmpassword] = React.useState();
    const [iva,setIva] = React.useState();
    const [showConfirmPass, setShowConfirmPass] = React.useState(false);
    const [plan, setPlan] = React.useState()
    const [pic, setPic] = React.useState();
    const [loading, setLoading] = React.useState(false)

    const toast = useToast()
    const navigate = useNavigate()

    const handleClickPass = () => setShowPass(!showPass)
    const handleClickConfirmPass = () => setShowConfirmPass(!showConfirmPass)
    
    const validEmail = new RegExp('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$')
    const validPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$')
    const validIva = new RegExp('^[A-Z]{2}[0-9]{11}$')

    const validateUser = () => {
      if (!validEmail.test(email)) return
      if (!validPassword.test(password)) return
    }

    const validateCorporate = () => {
      if (!validEmail.test(email)) return
      if (!validPassword.test(password)) return
      if (!validIva.test(iva)) return
    }

    const submitUser = async () => {
      setLoading(true)
      if(!name || !lastName || !birthday || !username || !email || !password || !confirmpassword || !plan){
        toast({
          title: "Please fill all the fields",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        })
        setLoading(false)
        return
      }
      //controllo regex
      if(password !== confirmpassword){
        toast({
          title: "Password do not match",
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
            "Content-type":"application/json",
          },
        }
        const {data} = await axios.post(
          "/user/signup",
          {name, lastName, birthday, username, email, password, plan},
          config
        )
        toast({
          title: "Registration Successful",
          status: "succes",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        })  
        localStorage.setItem('userInfo', JSON.stringify(data))
        setLoading(false)
        navigate('/')
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        })
        setLoading(false)
      }
    }
    
    const submitCorporate = async () => {
      
    }

    const submitHandler = () => {
      {value === '1' ?
        submitUser()
      :
        submitCorporate()
      }
    }

    const userForm = (<>
                      <FormControl id='first-name' isRequired>
                        <FormLabel>Name</FormLabel>
                          <Input 
                            placeholder='Enter your name'
                            onChange={(e) => setName(e.target.value) }
                          />
                      </FormControl>

                      <FormControl id='last-name' isRequired>
                        <FormLabel>Last Name</FormLabel>
                          <Input 
                            placeholder='Enter your lastname'
                            onChange={(e) => setLastName(e.target.value) }
                          />
                      </FormControl>

                      <FormControl id='username' isRequired>
                        <FormLabel>Username</FormLabel>
                          <Input 
                            placeholder='Enter your username'
                            onChange={(e) => setUsername(e.target.value) }
                          />
                      </FormControl>

                      <FormControl id='birthday' isRequired>
                        <FormLabel>Birthday</FormLabel>
                          <Input 
                            placeholder='Enter your birthday'
                            onChange={(e) => setBirthday(e.target.value) }
                          />
                      </FormControl>

                      <FormControl id='email' isRequired>
                        <FormLabel>Email</FormLabel>
                          <Input 
                            placeholder='Enter your email'
                            onChange={(e) => setEmail(e.target.value) }
                          />
                      </FormControl>

                      <FormControl id='password' isRequired>
                        <FormLabel>Password</FormLabel>
                          <InputGroup>
                            <Input 
                              type={showPass ? "text" : "password"}
                              placeholder='Enter your password'
                              onChange={(e) => setPassword(e.target.value) }
                            />
                            <InputRightElement width={"4.5rem"}>
                              <Button h="1.75rem" size="sm" onClick={handleClickPass}>
                                {showPass ? "Hide" : "Show"}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                      </FormControl>

                      <FormControl id='confirmPassword' isRequired>
                        <FormLabel>Confirm Password</FormLabel>
                          <InputGroup>
                            <Input 
                              type={showConfirmPass ? "text" : "password"}
                              placeholder='Confirm password'
                              onChange={(e) => setConfirmpassword(e.target.value) }
                            />
                            <InputRightElement width={"4.5rem"}>
                              <Button h="1.75rem" size="sm" onClick={handleClickConfirmPass}>
                                {showConfirmPass ? "Hide" : "Show"}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel>Choose your plan</FormLabel>
                        <RadioGroup onChange={setPlan} value={plan}>
                          <Stack direction='row'>
                            <Radio value='free'>Free</Radio>
                            <Radio value='cheap'>Cheap</Radio>
                            <Radio value='premium'>Premium</Radio>
                          </Stack>
                        </RadioGroup>
                      </FormControl>

                      <FormControl id='pic'>
                        <FormLabel>Upload your Picture</FormLabel>
                          <Input 
                            type={"file"}
                            p={1.5}
                            accept="image/*"
                            /*onChange={(e) => postDetails(e.target.files[0]) }*/
                          />
                      </FormControl>
                      </>)

    const corporateForm = (<>
                          <FormControl id='corporateName' isRequired>
                            <FormLabel>Corporate Name</FormLabel>
                            <Input 
                              placeholder='Enter your corporate name'
                              onChange={(e) => setName(e.target.value) }
                            />
                          </FormControl>

                          <FormControl id='countryOfResidence' isRequired>
                            <FormLabel>Country of residence</FormLabel>
                            <Input 
                              placeholder='Enter the country of residence'
                              onChange={(e) => setName(e.target.value) }
                            />
                          </FormControl>

                          <FormControl id='address' isRequired>
                            <FormLabel>Address</FormLabel>
                            <Input 
                              placeholder='Enter the address'
                              onChange={(e) => setName(e.target.value) }
                            />
                          </FormControl>

                          <FormControl id='iva' isRequired>
                            <FormLabel>IVA</FormLabel>
                            <Input 
                              placeholder='Enter the iva'
                              onChange={(e) => setName(e.target.value) }
                            />
                          </FormControl>

                          <FormControl id='email' isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input 
                              placeholder='Enter your email'
                              onChange={(e) => setEmail(e.target.value) }
                            />
                          </FormControl>

                          <FormControl id='password' isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                            <Input 
                              type={showPass ? "text" : "password"}
                              placeholder='Enter your password'
                              onChange={(e) => setPassword(e.target.value) }
                            />
                            <InputRightElement width={"4.5rem"}>
                            <Button h="1.75rem" size="sm" onClick={handleClickPass}>
                              {showPass ? "Hide" : "Show"}
                            </Button>
                            </InputRightElement>
                            </InputGroup>
                          </FormControl>

                          <FormControl id='confirmPassword' isRequired>
                            <FormLabel>Confirm Password</FormLabel>
                              <InputGroup>
                                <Input 
                                  type={showConfirmPass ? "text" : "password"}
                                  placeholder='Confirm password'
                                  onChange={(e) => setConfirmpassword(e.target.value) }
                                />
                                <InputRightElement width={"4.5rem"}>
                                  <Button h="1.75rem" size="sm" onClick={handleClickConfirmPass}>
                                    {showConfirmPass ? "Hide" : "Show"}
                                  </Button>
                                </InputRightElement>
                              </InputGroup>
                          </FormControl>
                          </>)
    
    return (
      <VStack spacing="5px" color="black">

      <FormControl>
        <RadioGroup onChange={setValue} value={value}>
          <Stack direction='row'>
            <Radio value='1'>User</Radio>
            <Radio value='2'>Corporate</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      
      {value === '1' ? (userForm) : (corporateForm)}      

      <Button
        colorScheme={"blue"}
        width={"100%"}
        style={{marginTop: 15}}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
    )
}

export default SignUp