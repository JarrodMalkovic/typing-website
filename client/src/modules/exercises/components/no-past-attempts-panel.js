import { VStack, Heading, Button } from '@chakra-ui/react';
import { NoData } from '../../../common/undraw/undraw-no-data';
import Link from 'next/link';

const NoPastAttemptsPanel = ({ slug }) => {
  return (
    <VStack pt="5">
      <NoData />
      <Heading py="2" size="sm">
        No attempts for this exercise yet
      </Heading>
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

export default NoPastAttemptsPanel;
