import { useGetSingleUserQuery } from "@/redux/features/users/usersApi";
import { TUser } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { SkewLoader } from "react-spinners";

export default function UserDetails() {
  const { userId } = useParams();
  const { data, isLoading } = useGetSingleUserQuery(userId);
  const [userData, setUserData] = useState<TUser | null>(null);

  useEffect(() => {
    setUserData(data?.data);
  }, [data]);

  if (isLoading) {
    return (
      <div className="py-10 px-6 flex items-center justify-center">
        <SkewLoader />
      </div>
    );
  }

  console.log("userData ", userData);

  return (
    <div>
      {userData && (
        <div className="user-details">
          <h1 className="text-2xl font-bold mb-4">User Update</h1>

          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Phone:</strong> {userData.phone}
          </p>
        </div>
      )}
    </div>
  );
}
