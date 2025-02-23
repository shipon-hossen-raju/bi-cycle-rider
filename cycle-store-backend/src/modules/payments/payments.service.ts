import SSLCommerzPayment from "sslcommerz-lts";
import config from "../../config";
import AppError from "../../errors/AppError";
import statusCode from "../../utils/status.code";
import { productService } from "../product/product.service";
import { userService } from "../users/user.service";
import { paymentOrder } from "./payment.model";
import { TOrderPayment } from "./payment.type";

// single product payment
const makePayment = async (data: TOrderPayment) => {
  const { userId, productId } = data;

  // find user details find by userId
  const user = await userService.getSingleUser(userId);
  if (!user) throw new AppError(statusCode.notFound, "User Not Found!");

  // find user details find by userId
  const productData = await productService.getSpecificProducts(productId);
  if (!productData)
    throw new AppError(statusCode.notFound, "Product not found!");

  // generate unique tran_id
  const tranId = `${new Date().getTime().toString()}`;
  const totalAmount = Number(productData?.prices.sale);

  const dataPayment = {
    total_amount: totalAmount,
    currency: "BDT",
    tran_id: tranId, // use unique tran_id for each api call
    success_url: `${config.paymentRedirectUrl}/success/${tranId}`,
    fail_url: `${config.paymentRedirectUrl}/fail/${tranId}`,
    cancel_url: `${config.paymentRedirectUrl}/cancel/${tranId}`,
    ipn_url: `${config.paymentRedirectUrl}/ipn/${tranId}`,
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: user.name,
    cus_email: user.email,
    cus_add1: user.address,
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: user.phone,
    cus_fax: "01711111111",
    ship_name: data.name,
    ship_add1: data.address,
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  try {
    const sslcz = new SSLCommerzPayment(
      config.paymentStoreId,
      config.paymentStorePassword,
      config.paymentIsLive,
    );
    // sslcz.init(dataPayment).then((apiResponse: any) => {
    //   // Redirect the user to payment gateway
    //   console.log("apiResponse ", apiResponse);
    //   let GatewayPageURL = apiResponse.GatewayPageURL;
    //   // res.redirect(GatewayPageURL);
    //   console.log("Redirecting to: ", GatewayPageURL);
    //    return {
    //      GatewayPageURL,
    //      user,
    //      productData,
    //      tranId,
    //    };
    // });

    // Await the initialization of the payment

    const apiResponse = await sslcz.init(dataPayment);

    // Redirect the user to payment gateway
    console.log("apiResponse ", apiResponse);
    let GatewayPageURL = apiResponse.GatewayPageURL;
    console.log("Redirecting to: ", GatewayPageURL);

    // Return the data
    return {
      GatewayPageURL,
      user,
      productData,
      tranId,
    };
  } catch (error: any) {
    console.error("Payment initialization failed:", error.message);
    throw new AppError(
      statusCode.internalServerError,
      "Payment initialization failed",
    );
  }
};

// payment success paymentStatus update
const paymentSuccess = async (tranId: string) => {
  const paymentData = await paymentOrder.findOne(
    { tranId },
    { paymentStatus: 1 },
  );
  if (!paymentData)
    throw new AppError(statusCode.notFound, "Payment not found!");

  if (paymentData.paymentStatus === "pending") {
    const payment = await paymentOrder.findOneAndUpdate(
      { tranId },
      { paymentStatus: "successful" },
      { new: true },
    );
    return payment;
  } else {
    throw new AppError(statusCode.badRequest, "Payment already successful");
  }
};

// payment failed paymentStatus update
const paymentFailed = async (tranId: string) => {
  const paymentData = await paymentOrder.findOne(
    { tranId },
    { paymentStatus: 1 },
  );
  if (!paymentData)
    throw new AppError(statusCode.notFound, "Payment not found!");

  if (paymentData.paymentStatus === "pending") {
    const payment = await paymentOrder.findOneAndUpdate(
      { tranId },
      { paymentStatus: "failed" },
      { new: true },
    );
    return payment;
  } else {
    throw new AppError(statusCode.badRequest, "Payment already successful"); // write right ans
  }
};

// payment cancel paymentStatus update
const paymentCancel = async (tranId: string) => {
  const paymentData = await paymentOrder.findOne(
    { tranId },
    { paymentStatus: 1 },
  );
  if (!paymentData) throw new AppError(statusCode.notFound, "Payment not found!");

  if (paymentData.paymentStatus === "pending") {
    const payment = await paymentOrder.findOneAndUpdate(
      { tranId },
      { paymentStatus: "cancel" },
      { new: true },
    );
    return payment;
  }
  throw new AppError(statusCode.badRequest, "Payment already successful");
}

const orderStore = async (data: TOrderPayment) => {
  const product = new paymentOrder(data);
  return await product.save();
};

const findPaymentData = async (data: TOrderPayment) => {
  return await paymentOrder.findOne(data);
};

export const paymentService = { makePayment, orderStore, findPaymentData, paymentSuccess, paymentFailed, paymentCancel };
