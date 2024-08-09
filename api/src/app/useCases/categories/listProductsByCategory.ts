import { Request,Response } from 'express';

import { Product } from '../../models/Products';

export async function listProductsByCategory(req:Request,res:Response){
  try {

    const {categoryId} = req.params;
    
    const products = await Product.find().where('category').equals(categoryId);//para listar as categorias com base no id da categoria;

    res.json(products);
  }
  catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
}
