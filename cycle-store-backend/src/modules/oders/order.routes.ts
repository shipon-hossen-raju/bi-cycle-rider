import express from 'express';
import { orderController } from './order.controller';
const route = express.Router();

// order create route
route.post('/', orderController.createOrder);

// order n
route.get('/revenue', orderController.revenueFind);

export const orderRoute = route;
