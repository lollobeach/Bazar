import {
    Box,
    chakra,
    Container,
    Image,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
  } from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import Logo from "../../assets/store.ico";

const Footer = () => {

    const SocialButton = ({
        children,
        label,
        href,
      }) => {
        return (
          <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
              bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
          </chakra.button>
        );
      };

    return (
        <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
        width="100%"
        position="fixed"
        bottom="0"
        mt="1rem"
        padding="1rem"
        >
        <Container
            as={Stack}
            maxW={'6xl'}
            py={4}
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
            justify={{ base: 'center', md: 'space-between' }}
            align={{ base: 'center', md: 'center' }}>
            <Image src={Logo} alt="logo" h={"32px"}/>
            <Text>© 2022 Lorenzo Verducci. Giorgio Saldana. Lorenzo Spina. All rights reserved</Text>
            <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Twitter'} href={'#'}>
                <FaTwitter />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'#'}>
                <FaYoutube />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
                <FaInstagram />
            </SocialButton>
            </Stack>
        </Container>
        </Box>
    );
}
