import useAuthContext from '../hooks/useAuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user} = useAuthContext()
    if(user===null) return <p className='text-center'>Loading......</p>
    return user? children : <Navigate to={'/login'}></Navigate>
    
};

export default PrivateRoute;