import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import statusCode from "../../utils/status.code";
import { TOrderPayment } from "./payment.type";
import { paymentService } from "./payments.service";

const productOder = catchAsync(async (req, res) => {
  const bodyData = req.body;
  console.log("req.body => ", req.body);

  let payment: any;
  if (bodyData.paymentSystem === "online") {
    payment = await paymentService.makePayment(bodyData);

    if (!payment) {
      throw new AppError(statusCode.badGateway, "Payment Failed!");
    }
  }

  console.log("payment 21 ", payment);

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

  console.log(" orderStoreData ", orderStoreData);

  const orderStore = await paymentService.orderStore(orderStoreData);

  console.log("orderStored ", orderStore);

  if (!orderStore)
    throw new AppError(statusCode.badGateway, "payment store failed");

  // console.log("payment controller : ", payment);

  sendResponse(res, {
    success: true,
    statusCode: statusCode.created,
    message: "Order completed",
    data: orderStore,
  });
});

const paymentSuccess = catchAsync(async (req, res) => {
  const { tranId } = req.params;
  console.log("payment success ", tranId);

  if (tranId) {
    // const paymentDetails = await paymentService.findPaymentData({ tranId });
    // console.log(" payment success paymentDetails ", paymentDetails);
  }
});

const paymentFailed = catchAsync(async (req, res) => {
  const { tranId } = req.params;
  console.log("payment success ", tranId);

  if (tranId) {
    // const paymentDetails = await paymentService.findPaymentData({ tranId });
    // console.log("Failed paymentDetails ", paymentDetails);
  }
});

const paymentCancel = catchAsync(async (req, res) => {
  const { tranId } = req.params;
  console.log("payment success ", tranId);

  if (tranId) {
    // const paymentDetails = await paymentService.findPaymentData({ tranId });
    // console.log("Cancel paymentDetails ", paymentDetails);
  }
});

export const paymentController = {
  productOder,
  paymentSuccess,
  paymentFailed,
  paymentCancel,
};
