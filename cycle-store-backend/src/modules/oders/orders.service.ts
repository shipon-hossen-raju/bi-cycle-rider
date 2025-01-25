import ProductModel from "../product/product.model";
import { TOrder } from "./order.interface";
import OrderModel from "./order.model";

const orderCreateDB = async (orderData: TOrder) => {
  const order = new OrderModel(orderData);
  return await order.save();
};

const productQuantityUpdate = async (clientData: TOrder) => {
  // Fetch product details
  const product = await ProductModel.findById(clientData.product);
  if (!product) {
    throw new Error("Product not found!");
  }

  // If quantity becomes zero, update inStock status
  if (product?.quantity === 0) {
    await ProductModel.findByIdAndUpdate(
      clientData.product,
      { inStock: false },
      { new: true },
    );

    throw new Error("Insufficient stock!");
  }

  // Validate total price
  const expectedTotalPrice = product.price * clientData.quantity;
  if (clientData.totalPrice < expectedTotalPrice) {
    throw new Error(
      `Insufficient total price. Your price: ${clientData.totalPrice}, Required price: ${expectedTotalPrice}`,
    );
  }

  // Check product stock
  if (product.quantity < clientData.quantity) {
    throw new Error("Insufficient stock!");
  }

  // Update product quantity
  let updatedProduct = await ProductModel.findByIdAndUpdate(
    clientData.product,
    {
      $inc: { quantity: -clientData.quantity },
    },
    { new: true },
  );

  // If quantity becomes zero, update inStock status
  if (updatedProduct?.quantity === 0) {
    updatedProduct = await ProductModel.findByIdAndUpdate(
      clientData.product,
      { inStock: false },
      { new: true },
    );
  }

  return {
    message: "Product updated successfully!",
    status: true,
    data: updatedProduct,
  };
};

// const productQuantityUpdate = async (clientData: TOrder) => {
//   const productFind = await ProductModel.findById(clientData?.product);
//   if (!productFind) {
//     throw new Error("Product not found!");
//   }
//   // price checking
//   const storeProductCalculate = productFind?.price * clientData.quantity;
//   if (clientData.totalPrice < storeProductCalculate) {
//     throw new Error(
//       `Your price is low. Your price: ${clientData.totalPrice} but Our Product price: ${storeProductCalculate}`,
//     );
//   }

//   // product quantity checking
//   if (productFind?.quantity < clientData.quantity) {
//     throw new Error(`insufficient stock! `);
//   }

//   let productQuantityUpdated;
//   if (productFind?.quantity >= 0) {
//     productQuantityUpdated = await ProductModel.findOneAndUpdate(
//       { _id: clientData.product },
//       {
//         quantity: productFind?.quantity - clientData.quantity,
//       },
//       { new: true },
//     );

//     // if price zero  then inStock false
//     if (productQuantityUpdated?.quantity === 0) {
//       productQuantityUpdated = await ProductModel.findOneAndUpdate(
//         { _id: clientData.product },
//         {
//           inStock: false,
//         },
//         { new: true },
//       );
//     }
//   } else {
//     productQuantityUpdated = await ProductModel.findOneAndUpdate(
//       { _id: clientData.product },
//       {
//         inStock: false,
//       },
//       { new: true },
//     );
//   }

//   return {
//     message: "product updated!",
//     status: true,
//     data: productQuantityUpdated,
//   };
// };

const revenueFindDB = async () => {
  const getTotalAmon = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" },
      },
    },
  ]);

  const totalRevenue =
    getTotalAmon.length > 0 ? getTotalAmon[0].totalRevenue : 0;

  return { totalRevenue };
};

export const orderService = {
  orderCreateDB,
  productQuantityUpdate,
  revenueFindDB,
};
