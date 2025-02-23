import config from "../../config";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import statusCode from "../../utils/status.code";
import { TOrderPayment } from "./payment.type";
import { paymentService } from "./payments.service";

const productOder = catchAsync(async (req, res) => {
  const bodyData = req.body;

  let payment: any;
  if (bodyData.paymentSystem === "online") {
    payment = await paymentService.makePayment(bodyData);


    if (!payment) {
      throw new AppError(statusCode.badGateway, "Payment Failed!");
    }
  }

  let orderStoreData: TOrderPayment = {
    paymentStatus: "pending",
    orderStatus: "processing",
    productId: bodyData.productId,
    userId: bodyData.userId,
    tranId: payment ? payment.tranId : null,
    paymentSystem: bodyData.paymentSystem,
    address: bodyData.name,
    name: bodyData.name,
    phone: bodyData.phone,
  };

  const orderStore = await paymentService.orderStore(orderStoreData);

  if (!orderStore)
    throw new AppError(statusCode.badGateway, "payment store failed");


  sendResponse(res, {
    success: true,
    statusCode: statusCode.created,
    message: "Order completed",
    data: { ...orderStore?._doc, gatewayPageURL: payment.GatewayPageURL },
  });
});

const paymentSuccess = catchAsync(async (req, res) => {
  const { tranId } = req.params;
  
  if (tranId) {
    const paymentDetails = await paymentService.paymentSuccess(
      tranId as string,
    );
    if (!paymentDetails)
      throw new AppError(statusCode.badGateway, "Payment not found!");

    // redirect to success page
    res.redirect(`${config.frontendUrl}/payment/success/${tranId}`);
  } else {
    throw new AppError(statusCode.badRequest, "TranId required");
  }
});

const paymentFailed = catchAsync(async (req, res) => {
  const { tranId } = req.params;

  if (tranId) {
    const paymentDetails = await paymentService.paymentFailed(tranId as string);

    if (!paymentDetails)
      throw new AppError(statusCode.badGateway, "Payment not found!");

    // redirect to failed page
    res.redirect(`${config.frontendUrl}/payment/failed/${tranId}`);
  } else {
    throw new AppError(statusCode.badRequest, "TranId required");
  }
});

const paymentCancel = catchAsync(async (req, res) => {
  const { tranId } = req.params;

  if (tranId) {
    const paymentDetails = await paymentService.paymentCancel(tranId as string);
    if (!paymentDetails)
      throw new AppError(statusCode.badGateway, "Payment not found!");

    // redirect to cancel page
    res.redirect(`${config.frontendUrl}/payment/cancel/${tranId}`);
  } else {
    throw new AppError(statusCode.badRequest, "TranId required");
  }
});

export const paymentController = {
  productOder,
  paymentSuccess,
  paymentFailed,
  paymentCancel,
};
