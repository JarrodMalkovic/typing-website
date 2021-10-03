import * as React from 'react';


import {
  VStack,
  Image,
  Box,
  useColorModeValue,
  Text,
  Button,
  Heading,
  HStack,
  Divider
} from '@chakra-ui/react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col} from 'react-bootstrap';

import { ArrowForwardIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { useAuth } from '../modules/auth/hooks/use-auth';


const Home = (props) => {
  const { state } = useAuth();

const mystyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial"
};

  return (

    <>
    <Box>
      <VStack spacing={5} width="100%">
        <Box position="relative">
          <Image
            maxW="100vw"
            opacity="85%"
            linear-gradient="(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.25))"
            src={useColorModeValue(
              '/images/HomeDay.png',
              '/images/Korea_Background.jpg',
            )}
          />
          <Text
            position="absolute"
            fontSize="8vw"
            fontWeight="bold"
            top="20%"
            left="5%"
            transform="translate(-50% -50%)">

            <h1> Key Korea </h1>
            <h2>안녕하십니까 </h2>
          </Text>



          <Text
            position="absolute"
            fontSize="6vw"
            fontWeight="bold"
            top="40%"
            left="5%"
            trasnform="translate(-50% -50%)"
            textColor="white"
          >
            {state.isAuthenticated ? state.username : ''}
          </Text>
          <Link href="/menu">
            <Button
              bgColor="#f52d56"
              position="absolute"
              top="70%"
              left="6%"
              size="lg"
              _hover={{
                bg: "#39aae1",
              }}
              color="white"
              rightIcon={<ArrowForwardIcon />}>
              Get Started!
            </Button>
          </Link>
        </Box>
      </VStack>
    </Box>

    <VStack height = "1500px" margin = "100px">

    <Heading fontSize="60px" padding="50px">
          About Us
    </Heading>

    <br></br>

    
    <Container>
      <Divider></Divider>
      <Box marginTop = "100px" marginBottom = "100px">
        <Row>
          <Col xs={8} margin = "20px">
            <Box textAlign = "center" padding = "20px">
              <Heading paddingBottom = "50px"> 
                Who We Are
              </Heading>
              <Text fontSize = "20px" textAlign = "justify"> 
              KeyKorea is a tool designed for students, by students, to help them practice their Korean Typing Skills. 
              Learning a new language can be exciting and challenging, and there are many aspects that come with it; 
              it involves more than speaking and listening; being able to type has a far-reaching impact in today's digital world. 
              </Text>
            </Box>
          </Col>
          <Col>
            <Image padding = "20px" align = "right" src="/images/logo.png" minW="40%" mawW="40%" height={300} borderRadius = "2%"/>
          </Col>
        </Row>
      </Box>
      <Divider></Divider>
      <Divider></Divider>
      <Box marginTop = "100px" marginBottom = "100px">
        <Row>
          <Col>
            <Image padding = "20px" align = "right" src="/images/world.png" minW="40%" mawW="40%" height={300} borderRadius = "2%"/>
          </Col>
          <Col xs={8} margin = "20px">
            <Box textAlign = "center" padding = "20px">
              <Heading paddingBottom = "50px"> 
                Enhance Your Korean Skills
              </Heading>
              <Text fontSize = "20px" textAlign = "justify"> 
                This website includes all relevant resources to help students get started on their Korean-typing journey. 
                By including the practice and challenge modes, we hope that the users of this platform feel both comfortable and confident practicing their skills. 
                Our aim is to create an application that is easy to use and understand, and resourceful at the same time. 
                We really hope all the users of this platform find it applicable to their study of the Korean language. 
              </Text>
            </Box>
          </Col>
        </Row>
      </Box>

      <Divider></Divider>
      <Box marginTop = "100px" marginBottom = "100px">
        <Row>
          <Col xs={8} margin = "20px">
            <Box textAlign = "center" padding = "20px">
              <Heading paddingBottom = "50px"> 
                Designed For Your Success
              </Heading>
              <Text fontSize = "20px" textAlign = "justify"> 

                The website features an easy-to-follow keyboard set up page, designed for anyone who wants to set up their own keyboard. 
                We have also incorporated the practice and challenge modes. The practice mode is designed for users to practice their 
                skills at their own pace after which they can compete with their peers using the challenge mode. 
                The profile page holds information about past attempts, and statistics related to the user's performance. 
                The leaderboard can be used by users to compare abilities and compete to beat other users of the platform.
              </Text>
            </Box>
          </Col>
          <Col>
            <Image padding = "20px" align = "right" src="/images/practice.png" minW="40%" mawW="40%" height={300} borderRadius = "2%"/>
          </Col>
        </Row>

      </Box>
      <Divider></Divider>

    </Container>
    </VStack> 
  </>

  );
};

export default Home;
