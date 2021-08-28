import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {Flex, Heading, Box, HStack, Button} from "@chakra-ui/react";
import * as FaIcons from 'react-icons/Fa';




const ColoredLine = ({ color }) => (
    <hr
        style={{
            backgroundColor: color,
            height: 2
        }}
    />
);

const Menu = () => {
    return (
        <>

        

        
            <Flex background = "white" height = 'auto'>
                <Flex  margin = "auto" padding = "50"  height = '300' align
                       boxShadow= "lg" direction ="column" background = "black" p = {70} rounded = {50} color = "white">
                    
                    <Heading mb = {3}> Begin Your Journey </Heading>
                    <ColoredLine color="white" />

                    <HStack> 


                            <Box as = "button" className = "KeyboardSetup" alignitems = "center" 
                                    margin = "10px" padding = "20px" border>
                                    <img src="/images/Keyboard.png"  height={100} width={100}/>
                                    <Box fontWeight = "extrabold" alignitems = "center" > Keyboard Setup </Box>
                            </Box>

                            

                            <Box className = "KeyboardSetup" alignitems = "center" 
                                    margin = "10px" padding = "20px" border>
                                    <img src="/images/greetings-course.png"  height={100} width={100}/>
                                    <Box fontWeight = "extrabold"> Practice Mode </Box>
                            </Box>

                            <Box className = "KeyboardSetup" alignitems = "center" 
                                    margin = "10px" padding = "20px" border>
                                    <img src="/images/why.png"  height={100} width={100}/>
                                    <Box fontWeight = "extrabold"> Challenge Mode </Box>
                            </Box>
                        

                    </HStack>
                </Flex>
            </Flex>
        </>
    )
}

export default Menu;
