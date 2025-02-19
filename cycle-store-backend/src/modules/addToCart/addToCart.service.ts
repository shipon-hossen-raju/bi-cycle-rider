import { productService } from '../product/product.service';
import  AddToCart from './addToCart.model';
import { TAddToCart } from './addToCart.type';

const addToCart = async (data: TAddToCart) => {
  const findProduct = await productService.getSpecificProducts(data.productId);

  if (!findProduct) {
    throw new Error('Product not found');
  }

  const existingCartItem = await AddToCart.findOne({ userId: data.userId, productId: data.productId }).exec();

  if (existingCartItem) {
    existingCartItem.quantity += data.quantity;
    return await existingCartItem.save();
  } else {
    const cartItem = new AddToCart(data);
    return await cartItem.save();
  }
};

 const getCartItems = async (userId: string): Promise<TAddToCart[]> => {
   return await AddToCart.find({ userId }).exec();
};

 const updateCartItem = async (cartItemId: string, quantity: number): Promise<TAddToCart | null> => {
   return await AddToCart.findByIdAndUpdate(cartItemId, { quantity }, { new: true }).exec();
};

 const removeCartItem = async (cartItemId: string): Promise<TAddToCart | null> => {
   return await AddToCart.findByIdAndDelete(cartItemId).exec();
};

export const addToCartService = {
  addToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
};