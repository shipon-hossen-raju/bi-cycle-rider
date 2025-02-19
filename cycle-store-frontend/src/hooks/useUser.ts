import { useCurrentUser } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';

export default function useUser() {
   const user = useAppSelector(useCurrentUser);
   
  return user
}
