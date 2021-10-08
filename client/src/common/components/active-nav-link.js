import * as React from 'react';

import { Link, useColorModeValue } from '@chakra-ui/react';

import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const isActive = (path, href) => path === href;

const ActiveNavLink = ({ name, href }) => {
  const router = useRouter();

  return (
    <NextLink href={href}>
      <Link
        px={2}
        py={1}
        color={
          isActive(router.pathname, href)
            ? useColorModeValue('#39aae1', '#39aae1')
            : useColorModeValue('black', 'white')
        }
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('gray.200', 'gray.700'),
          color: useColorModeValue('#39aae1', '#39aae1'),
        }}>
        {name}
      </Link>
    </NextLink>
  );
};

ActiveNavLink.propTypes = {
  name: PropTypes.string,
  href: PropTypes.string,
};

export default ActiveNavLink;
