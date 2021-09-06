import React from 'react';
import {Container, 
        Heading, 
        HStack,
        VStack,
        Divider,
        Image,
        Wrap,
        Text,
        Center
        } from "@chakra-ui/react";

import Link from 'next/link';

const Menu = () => {
    return (
        
            <Container mt = "50px" maxW="container.lg" centerContent>
                <VStack>
                    <Heading fontSize = "45px" padding = "20px"> 
                        Begin Your Journey!
                    </Heading>
                    <Divider/>
                    
                    <Wrap spacing="30px" justify="center" mt = "50px">
                        <HStack >
                            <Link href = "/setup">
                                <a>
                                <Container padding = "20px">
                                    <Image src="/images/alphabet-course.png"  boxSize="150px"/>
                                    <Text textAlign="center" mt="10px" fontWeight =  "bold" fontSize = "2xl"> 
                                        Keyboard Setup
                                    </Text>
                                </Container>
                                </a>
                            </Link>
                        </HStack>
                      

                        <HStack>
                            <Link href = "/practice">
                                <a>
                                    <Container  padding = "10px" justify="center">
                                        <Image src="/images/greetings-course.png"  boxSize="150px"/>
                                        <Text textAlign="center" mt="10px" fontWeight =  "bold" fontSize = "2xl"> 
                                            Practice
                                        </Text>
                                    </Container>
                                </a>
                            </Link>
                        </HStack>

                        <HStack>

                            <Link href = "/challenge">
                                <a>
                                    <Container padding = "10px" justify="center">
                                        <Image src="/images/why.png"  boxSize="150px"/>
                                        <Text textAlign="center" mt="10px" fontWeight =  "bold" fontSize = "2xl"> 
                                            Challenge
                                        </Text>
                                    </Container>
                                </a>
                            </Link>

                        </HStack>
                    </Wrap>

                </VStack>

            </Container>
        
    )
}

export default Menu;

