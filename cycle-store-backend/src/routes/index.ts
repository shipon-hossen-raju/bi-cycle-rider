import { Router } from "express";
import { orderRoute } from "../modules/oders/order.routes";
import { productRoute } from "../modules/product/product.routes";
import { UserRoutes } from "../modules/users/user.route";
import { authRoute } from "../modules/auth/auth.route";

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
    path: "/products",
    route: productRoute,
  },
  {
    path: "/products",
    route: orderRoute,
  },
];

moduleRoutes.forEach((route) => appRouter.use(route.path, route.route));

export default appRouter;
