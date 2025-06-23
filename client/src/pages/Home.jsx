import AuthUserScreen from '../components/common/AuthUserScreen';
import UnauthUserScreen from '../components/common/UnauthUserScreen';
import { useAuthCheck } from '../hooks/useAuthCheck';

const Home = () => {
  const { user, isAuthenticated, loading } = useAuthCheck()

  return (
    <div className='min-h-screen'>
      {user ? (
        <AuthUserScreen/>
      ) : (
        <UnauthUserScreen />
      )}
    </div>
  );
};

export default Home;