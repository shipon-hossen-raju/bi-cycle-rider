import SSLCommerzPayment from "sslcommerz-lts";
import config from "../../config";
import AppError from "../../errors/AppError";
import statusCode from "../../utils/status.code";
import { productService } from "../product/product.service";
import { userService } from "../users/user.service";
import { paymentOrder } from "./payment.model";
import { TOrderPayment } from "./payment.type";

// single product payment
const makePayment = async (data: any) => {
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

  const sslcommerz = new SSLCommerzPayment(
    config.paymentStoreId,
    config.paymentStorePassword,
    config.paymentIsLive,
  );

  const storePaymentData = {
    total_amount: totalAmount,
    currency: "BDT",
    tran_id: tranId,
    success_url: `${config.paymentRedirectUrl}/success/${tranId}`,
    fail_url: `${config.paymentRedirectUrl}/fail/${tranId}`,
    cancel_url: `${config.paymentRedirectUrl}/cancel/${tranId}`,
    ipn_url: `${config.paymentRedirectUrl}/ipn/${tranId}`,
    shipping_method: "Courier",
    product_name: productData._id,
    product_category: productData.productName,
    product_profile: "general",
    cus_name: user.name,
    cus_email: user.email,
    cus_phone: user.phone,
    cus_add1: data.address,
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_fax: "01711111111",
    ship_name: "ship_name",
    ship_add1: data.address || user.address,
    ship_add2: user.address,
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  try {
    const resData = await sslcommerz.init(storePaymentData);
    console.log("resData 65 ", resData);

    return { resData, user, productData, tranId };
  } catch (error: any) {
    console.error("Payment initialization failed:", error.message);
    throw new AppError(
      statusCode.internalServerError,
      "Payment initialization failed",
    );
  }
};

const orderStore = async (data: TOrderPayment) => {
  const product = new paymentOrder(data);
  return await product.save();
};

const findPaymentData = async (data: TOrderPayment) => {
  return await paymentOrder.findOne(data);
};

export const paymentService = { makePayment, orderStore, findPaymentData };
