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
      <Button size="sm" bgColor="blue.400" color="white" variant="solid">
        Go to Practice Mode
      </Button>
    </VStack>
  );
};

export default NoPastAttemptsPanel;
