import { useGetSingleUserQuery } from "@/redux/features/users/usersApi";
import { useParams } from "react-router";
import { SkewLoader } from "react-spinners";

export default function UserDetails() {
  const { userId } = useParams();
  const { data: {data}, isLoading } = useGetSingleUserQuery(userId);

  if (isLoading) {
    return (
      <div className="py-10 px-6 flex items-center justify-center">
        <SkewLoader />
      </div>
    );
   }
   
   console.log('data ', data)

   return <div>
   {data && (
      <div className="user-details">
         <h1 className="text-2xl font-bold mb-4">User Details</h1>
         <p><strong>Name:</strong> {data.name}</p>
         <p><strong>Email:</strong> {data.email}</p>
         <p><strong>Phone:</strong> {data.phone}</p>
      </div>
   )}
  </div>;
}
