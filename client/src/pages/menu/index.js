import React from 'react';
import {Container, 
        Flex, 
        Heading, 
        Box, 
        HStack,
        VStack,
        Divider,
        Image,
        Wrap,
        Button,
        } from "@chakra-ui/react";


const ColoredLine = ({ color }) => (
    <hr style={{backgroundColor: color,height: 2}}/>
);

const Menu = () => {
    return (
        <>
            <Container maxW = "xl" centerContent mt = "50px">

                <VStack>
                    <Heading fontSize = "25px" padding = "20px"> 
                        Begin Your Journey! 
                    </Heading>

                    <Divider/>

                    <Wrap spacing="30px" justify="center">
                        <HStack>    
                            <Container padding = "10px" justify="center">
                                <Image src="/images/alphabet-course.png"  boxSize="100px"/>
                                <p> Keyboard Setup</p>
                            </Container>
                        </HStack>

                        <HStack>
                            <Container  padding = "10px" justify="center">
                                <Image src="/images/greetings-course.png"  boxSize="100px"/>
                                <p> Practice Mode</p>
                            </Container>
                        </HStack>

                        <HStack>
                            <Container padding = "10px" justify="center">
                                <Image src="/images/why.png"  boxSize="100px"/>
                                <p> Challenge Mode</p>
                            </Container>
                        </HStack>
                    </Wrap>

                </VStack>

            </Container>
        </>
    )
}

export default Menu;

