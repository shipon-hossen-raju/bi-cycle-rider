import { Router } from "express";
import { productRoute } from "../modules/product/product.routes";
import { UserRoutes } from "../modules/users/user.route";
import { authRoute } from "../modules/auth/auth.route";
import { paymentRoute } from "../modules/payments/payments.route";
import { addToCartRoute } from "../modules/addToCart/addToCart.route";

const appRouter = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/admin/products",
    route: productRoute,
  },
  {
    path: "/payments",
    route: paymentRoute,
  },
  {
    path: "/add-to-cart",
    route: addToCartRoute,
  },
];

moduleRoutes.forEach((route) => appRouter.use(route.path, route.route));

export default appRouter;
