import * as React from 'react';
import { Field, Form, Formik } from 'formik';
import {
  Container,
  Heading,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Portal,
  Text,
} from '@chakra-ui/react';
import ProfileSettings from '../modules/settings/components/profile-settings';
import PreferenceSettings from '../modules/settings/components/preference-settings';
import ChangePasswordSettings from '../modules/settings/components/change-password-settings';
import DeleteAccountSettings from '../modules/settings/components/delete-account-settings';
import { useUnauthorizedRedirect } from '../modules/auth/hooks/use-unauthorized-redirect';
import Spinner from '../common/components/spinner';
import { useTitle } from 'react-use';

const tabs = [
  {
    heading: 'General Settings',
    name: 'General',
    content: (
      <>
        <ProfileSettings />
      </>
    ),
  },
  {
    heading: 'Security and Privacy Settings',
    name: 'Security and Privacy',
    content: (
      <>
        <ChangePasswordSettings />
        <DeleteAccountSettings />
      </>
    ),
  },
  {
    heading: 'Website Preferences',
    name: 'Website Preferences',
    content: <PreferenceSettings />,
  },
];

const Dashboard = () => {
  useTitle('KeyKorea - Settings');
  const { isLoading: isAuthLoading } = useUnauthorizedRedirect('/auth/sign-in');
  const headingRef = React.useRef();

  if (isAuthLoading) {
    return <Spinner />;
  }

  return (
    <Container pt="8" maxW="container.xl">
      <VStack spacing={2} width="100%" align="stretch">
        <Heading ref={headingRef} />
        <Tabs isLazy variant="enclosed">
          <TabList>
            {tabs.map((tab, idx) => (
              <Tab key={idx}>{tab.name}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {tabs.map((tab, idx) => (
              <TabPanel paddingX="0" key={idx}>
                <Portal containerRef={headingRef}>{tab.heading}</Portal>
                {tab.content}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

export default Dashboard;
