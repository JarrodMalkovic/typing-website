import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Alert,
  AlertIcon,
  useToast,
  Link,
  Flex,
  Spacer,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';

const displayErrors = (error) => {
  console.log(error);
  if (!error || !error.response || !error.response.data) {
    return (
      <Alert marginBottom="6" status="error">
        <AlertIcon /> Internal Server Error
      </Alert>
    );
  }

  if (error.response.data.detail) {
    return (
      <Alert marginBottom="6" status="error">
        <AlertIcon /> {error.response.data.detail}
      </Alert>
    );
  }

  if (
    typeof error.response.data === 'object' &&
    !Array.isArray(error.response.data) &&
    error.response.data != null
  ) {
    return (
      <Alert marginBottom="6" status="error">
        <Stack>
          <HStack ml="0" pl="0">
            <AlertIcon />
            <Text>Errors in the following fields</Text>
          </HStack>
          <UnorderedList>
            {Object.entries(error.response.data).map(([key, value]) => (
              <ListItem ml="14">
                {(key.charAt(0).toUpperCase() + key.slice(1))
                  .split('_')
                  .join(' ')}{' '}
                - {value[0] || 'Unknown Error'}
              </ListItem>
            ))}
          </UnorderedList>
        </Stack>
      </Alert>
    );
  }

  return (
    <Alert marginBottom="6" status="error">
      <AlertIcon /> Internal Server Error
    </Alert>
  );
};

export { displayErrors };
