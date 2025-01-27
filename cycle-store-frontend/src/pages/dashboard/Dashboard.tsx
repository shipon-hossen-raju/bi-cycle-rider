import Button from "@/components/Button";
import MainContainer from "@/components/MainContainer";
import { logout, useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);
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
        <div>
          dashboard
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </MainContainer>
    </section>
  );
}
