"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCartController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const status_code_1 = __importDefault(require("../../utils/status.code"));
const addToCart_service_1 = require("./addToCart.service");
const addToCart = (0, catchAsync_1.default)(async (req, res) => {
    const addToCartData = {
        productId: req?.body?.productId,
        quantity: req?.body?.quantity,
        userId: req?.body?.userId,
    };
    const item = await addToCart_service_1.addToCartService.addToCart(addToCartData);
    // res.status(201).json(item);
    (0, sendResponse_1.default)(res, {
        message: "Item added to cart successfully",
        data: item,
        statusCode: status_code_1.default.created,
        success: true,
    });
});
exports.addToCartController = { addToCart };
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
