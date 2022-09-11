import React from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast, Checkbox, Stack, RadioGroup, Radio } from '@chakra-ui/react'

const SignUp = () => {

    const [value, setValue] = React.useState('1')
    const [showPass, setShowPass] = React.useState(false);
    const [showConfirmPass, setShowConfirmPass] = React.useState(false);
    const [name, setName] = React.useState();
    const [lastName, setLastName] = React.useState();
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [confirmpassword, setConfirmpassword] = React.useState();
    const [pic, setPic] = React.useState();
    const [plan, setPlan] = React.useState()
    const [loading, setLoading] = React.useState(false)

    const handleClickPass = () => setShowPass(!showPass)
    const handleClickConfirmPass = () => setShowConfirmPass(!showConfirmPass)

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
                            <Radio value='1'>Free</Radio>
                            <Radio value='2'>Cheap</Radio>
                            <Radio value='3'>Premium</Radio>
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
      
      {/*provare a mettere su una const*/}
      {value == 1 ? (userForm) : (corporateForm)}      

      <Button
        colorScheme={"blue"}
        width={"100%"}
        style={{marginTop: 15}}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
    )
}

export default SignUp