import { Request,Response } from 'express';

import { Order } from '../../models/Order';

export async function listOrders(req:Request,res:Response){
  try {
    const orders = await Order.find()
      .sort({createdAt: 1})// como eu quero ordem crescente eu deixo o 1 e nao -1;
      .populate('products.product');//para listar os pedidos com base no id do produto e ;

    res.json(orders);
  }
  catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
}
