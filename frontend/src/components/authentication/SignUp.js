import React from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'

const SignUp = () => {

    const [showPass, setShowPass] = React.useState(false);
    const [showConfirmPass, setShowConfirmPass] = React.useState(false);
    const [name, setName] = React.useState();
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [confirmpassword, setConfirmpassword] = React.useState();
    const [pic, setPic] = React.useState();
    const [loading, setLoading] = React.useState(false)

    const handleClickPass = () => setShowPass(!showPass)
    const handleClickConfirmPass = () => setShowConfirmPass(!showConfirmPass)


    return (
        <VStack spacing="5px" color="black">

      <FormControl id='first-name' isRequired>
        <FormLabel>Name</FormLabel>
          <Input 
            placeholder='Enter your name'
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

      <FormControl id='pic'>
        <FormLabel>Upload your Picture</FormLabel>
          <Input 
            type={"file"}
            p={1.5}
            accept="image/*"
            /*onChange={(e) => postDetails(e.target.files[0]) }*/
          />
      </FormControl>

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