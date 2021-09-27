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
                Everyone learns in different ways. For the first time in history, 
                we can analyze how millions of people learn at once to create the most 
                effective educational system possible and tailor it to each student.
                Our ultimate goal is to give everyone access to a private tutor experience through technology. 
              </Text>
            </Box>
          </Col>
          <Col>
            <Image padding = "20px" align = "right" src="/images/challenge.png" minW="40%" mawW="40%" height={300} borderRadius = "2%"/>
          </Col>
        </Row>
      </Box>

      <Divider></Divider>
      <Box marginTop = "100px" marginBottom = "100px">
        <Row>
          <Col>
            <Image padding = "20px" align = "right" src="/images/challenge.png" minW="40%" mawW="40%" height={300} borderRadius = "2%"/>
          </Col>
          <Col xs={8} margin = "20px">
            <Box textAlign = "center" padding = "20px">
              <Heading paddingBottom = "50px"> 
                Designed For Your Success
              </Heading>
              <Text fontSize = "20px" textAlign = "justify"> 
                Everyone learns in different ways. For the first time in history, 
                we can analyze how millions of people learn at once to create the most 
                effective educational system possible and tailor it to each student.
                Our ultimate goal is to give everyone access to a private tutor experience through technology. 
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
                Enhance Your Korean Skills
              </Heading>
              <Text fontSize = "20px" textAlign = "justify"> 
                Everyone learns in different ways. For the first time in history, 
                we can analyze how millions of people learn at once to create the most 
                effective educational system possible and tailor it to each student.
                Our ultimate goal is to give everyone access to a private tutor experience through technology. 
              </Text>
            </Box>
          </Col>
          <Col>
            <Image padding = "20px" align = "right" src="/images/challenge.png" minW="40%" mawW="40%" height={300} borderRadius = "2%"/>
          </Col>
          
        </Row>
      </Box>
    </Container>

    
{/* 
    <HStack>
      <VStack>
        <Text> 
          Add paragraph here
        </Text>
      </VStack>

      <Image align = "right" src="/images/Mac - Step 2.png" minW="40%" mawW="40%" height={300} borderRadius = "2%"/>

      
    </HStack> */}
      
    </VStack> 
  </>

  );
};

export default Home;
