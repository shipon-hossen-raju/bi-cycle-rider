import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import statusCode from "../../utils/status.code";
import { addToCartService } from "./addToCart.service";
import { TAddToCart } from "./addToCart.type";

const addToCart = catchAsync(async (req, res) => {
  const addToCartData: TAddToCart = {
    productId: req?.body?.productId,
    quantity: req?.body?.quantity,
    userId: req?.body?.userId,
  };

  const item = await addToCartService.addToCart(addToCartData);

  // res.status(201).json(item);
  sendResponse(res, {
    message: "Item added to cart successfully",
    data: item,
    statusCode: statusCode.created,
    success: true,
  });
});

export const addToCartController = { addToCart };

// export const addToCartController = (cartService: CartService) => {

//    const getCartItems = async (req: Request, res: Response): Promise<void> => {
//       try {
//          const items = await cartService.getItems();
//          res.status(200).json(items);
//       } catch (error) {
//          res.status(500).json({ message: error.message });
//       }
//    };

//    const updateCartItem = async (req: Request, res: Response): Promise<void> => {
//       try {
//          const item = await cartService.updateItem(req.params.id, req.body);
//          res.status(200).json(item);
//       } catch (error) {
//          res.status(500).json({ message: error.message });
//       }
//    };

//    const deleteCartItem = async (req: Request, res: Response): Promise<void> => {
//       try {
//          await cartService.deleteItem(req.params.id);
//          res.status(204).send();
//       } catch (error) {
//          res.status(500).json({ message: error.message });
//       }
//    };

//    return {
//       addToCart,
//       getCartItems,
//       updateCartItem,
//       deleteCartItem
//    };
// };
