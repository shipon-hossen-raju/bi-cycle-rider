import useUser from "@/hooks/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Button from "../../components/Button";
import MainContainer from "../../components/MainContainer";
import { logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

export default function Account() {
  const dispatch = useAppDispatch();
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) {
      dispatch(logout());
      navigate("/login");
    }
  }, [user]);

  const handleLogout = () => dispatch(logout());

  return (
    <section>
      <MainContainer>
        <Button onClick={handleLogout}>Logout</Button>
      </MainContainer>
    </section>
  );
}
