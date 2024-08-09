import {Router} from 'express';

import path from 'node:path';
import multer from 'multer';


//IMPORT FUNCTIONS FROM USECASES
import { createCategories } from './app/useCases/categories/createCategories';
import { listCategories } from './app/useCases/categories/listCategories';
import { listProducts } from './app/useCases/products/listProducts';
import { createProducts } from './app/useCases/products/createProducts';
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory';
import { listOrders } from './app/useCases/orders/listOrders';
import { createOrders } from './app/useCases/orders/createOrders';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { cancelOrder } from './app/useCases/orders/cancelOrder';

export const router = Router();


const upload = multer({
  storage: multer.diskStorage({
    destination(req,file,callback){
      callback(null,path.resolve(__dirname,'..','uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

//LIST CATEGORIES
router.get('/categories',listCategories);
//CREATE CATEGORIES
router.post('/categories',createCategories);
//LIST PRODUCTS
router.get('/products',listProducts);
//CREATE PRODUCTS
router.post('/products',upload.single('image'),createProducts);//usa o upload de um arquivo como middleware, usa dentro do parenteses o nome do campo que vai receber o arquivo
//LIST PRODUCTS BY CATEGORY
router.get('/categories/:categoryId/products',listProductsByCategory);
//LIST ORDERS
router.get('/orders',listOrders);
//CREATE ORDERS
router.post('/orders',createOrders);
//UPDATE ORDERS
router.patch('/orders/:orderId',changeOrderStatus);
//DELETE OR CANCEL ORDERS
router.delete('/orders/:orderId',cancelOrder);
