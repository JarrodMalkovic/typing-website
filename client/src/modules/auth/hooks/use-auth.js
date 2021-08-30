import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';

// Used to get the user object from any component
const useAuth = () => useContext(AuthContext);

export { useAuth };
