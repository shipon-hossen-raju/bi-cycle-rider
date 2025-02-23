import { useParams } from "react-router";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentStatus() {
  const { paymentStatus, orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!paymentStatus || !orderId) {
      navigate("/"); // Redirect to home if params are missing
    }
  }, [paymentStatus, orderId, navigate]);

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case "success":
        return {
          message: "Your payment was successful! Thank you for your purchase.",
          bgColor: "bg-green-100",
          textColor: "text-green-700",
          borderColor: "border-green-500",
          icon: "✅",
        };
      case "failed":
        return {
          message: "Payment failed. Please try again or contact support.",
          bgColor: "bg-red-100",
          textColor: "text-red-700",
          borderColor: "border-red-500",
          icon: "❌",
        };
      case "cancel":
        return {
          message: "Payment was cancelled. Please try again.",
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-700",
          borderColor: "border-yellow-500",
          icon: "⚠️",
        };

      default:
        return {
          message: "Unknown payment status.",
          bgColor: "bg-gray-100",
          textColor: "text-gray-700",
          borderColor: "border-gray-500",
          icon: "❔",
        };
    }
  };

  const { message, bgColor, textColor, borderColor, icon } = getStatusMessage();

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${bgColor} p-6`}
    >
      <div
        className={`w-full max-w-md p-6 text-center rounded-lg border ${borderColor} shadow-lg`}
      >
        <span className="text-4xl">{icon}</span>
        <h1 className={`text-2xl font-semibold ${textColor} mt-4`}>
          Payment Status
        </h1>
        <p className="mt-2 text-lg font-medium">{message}</p>
        <p className="mt-4 text-sm text-gray-600">
          Order ID: <span className="font-bold">{orderId}</span>
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}

// import { useParams } from "react-router";

// export default function PaymentStatus() {
//   const { paymentStatus, orderId } = useParams();

//   console.log({ paymentStatus, orderId });

//   // Determine the status message and icon based on the payment status
//   const getStatusDetails = (status : string) => {
//     switch (status) {
//       case "success":
//         return {
//           message: "Payment Successful!",
//           icon: "✅",
//           color: "text-green-500",
//         };
//       case "failed":
//         return {
//           message: "Payment Failed!",
//           icon: "❌",
//           color: "text-red-500",
//         };
//       case "pending":
//         return {
//           message: "Payment Pending!",
//           icon: "⏳",
//           color: "text-yellow-500",
//         };
//       default:
//         return {
//           message: "Payment Status Unknown!",
//           icon: "❓",
//           color: "text-gray-500",
//         };
//     }
//   };

//   const statusDetails = getStatusDetails(paymentStatus);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
//         <div className={`text-6xl mb-4 ${statusDetails.color}`}>
//           {statusDetails.icon}
//         </div>
//         <h1 className={`text-2xl font-bold mb-4 ${statusDetails.color}`}>
//           {statusDetails.message}
//         </h1>
//         <p className="text-gray-700 mb-4">
//           Your payment status is:{" "}
//           <span className="font-semibold">{paymentStatus}</span>
//         </p>
//         <p className="text-gray-700">
//           Order ID: <span className="font-semibold">{orderId}</span>
//         </p>
//         <div className="mt-6">
//           <button
//             onClick={() => (window.location.href = "/")}
//             className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
//           >
//             Return to Home
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useParams } from "react-router";

// export default function PaymentStatus() {
//    const { paymentStatus, orderId } = useParams();

//    console.log({paymentStatus, orderId});

//   return (
//     <div>
//       <h1>order status {paymentStatus}</h1>

//       <p>Order Id: {orderId}</p>
//     </div>
//   );
// }
