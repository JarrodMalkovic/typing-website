import { VStack, Heading, Button, Text } from '@chakra-ui/react';
import { NoData } from '../../../common/undraw/undraw-no-data';
import Link from 'next/link';

const NoAttemptsPanel = ({ slug }) => {
  return (
    <VStack pt="5">
      <Heading pt="2" size="sm">
        No attempts for this category
      </Heading>
      <Text pb="2">Why not be first to take the #1 position?</Text>
      <Link href="/practice">
        <a>
          <Button
            size="sm"
            bgColor="blue.400"
            color="white"
            variant="solid"
            _hover={{
              backgroundColor: 'blue.500',
            }}>
            Go to Practice Mode
          </Button>
        </a>
      </Link>
    </VStack>
  );
};

export default NoAttemptsPanel;
