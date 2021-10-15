import * as React from 'react';

import {
  Box,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  AlertDialog,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogOverlay,
  AlertDialogHeader,
  useToast,
  AlertDialogFooter,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import { useAuth } from '../../auth/hooks/use-auth';
import { displayErrors } from '../../../common/utils/display-errors';
import { setAuthToken } from '../../auth/utils/set-auth-token';

const deleteAccount = async () => {
  const { data } = await axios.delete(`${BASE_API_URL}/api/user/`);
  return data;
};

const DeleteAccountSettings = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const { dispatch } = useAuth();
  const toast = useToast();

  const { mutate, isLoading, isError, error } = useMutation(deleteAccount, {
    onSuccess: () => {
      dispatch({ type: 'logout' });
      setAuthToken();
      localStorage.removeItem('access-token');
      localStorage.removeItem('refresh-token');
      onClose();
      toast({
        title: 'Deleted account',
        description: 'You have successfully deleted your account',
        status: 'success',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
    },
  });

  return (
    <>
      <Box>
        <SimpleGrid
          display={{ base: 'initial', md: 'grid' }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}>
          <GridItem colSpan={{ md: 1 }}>
            <Box>
              <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                Delete Account
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue('gray.600', 'gray.400')}>
                You can delete your account at any time
              </Text>
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <Box pl={[0, 0, 6]} py={3} textAlign="right">
              <Button
                onClick={() => setIsOpen(true)}
                variant="solid"
                fontWeight="md">
                Delete Account
              </Button>
            </Box>
          </GridItem>
        </SimpleGrid>
      </Box>
      <Box visibility={{ base: 'hidden', sm: 'visible' }} aria-hidden="true">
        <Box py={5}>
          <Box
            borderTop="solid 1px"
            borderTopColor={useColorModeValue(
              'gray.200',
              'whiteAlpha.200',
            )}></Box>
        </Box>
      </Box>
      <AlertDialog
        isCentered
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Account
            </AlertDialogHeader>

            <AlertDialogBody>
              {isError && displayErrors(error)}
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={mutate} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteAccountSettings;
