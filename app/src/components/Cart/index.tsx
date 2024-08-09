import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { ICartItem } from "../../types/CartItems";
import { IProduct } from "../../types/Product";
import { api } from "../../utils/api";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../Button";
import { MinusCircle } from "../Icons/MinusCircle";
import { PlusCircle } from "../Icons/PlusCircle";
import { OrderConfirmedModal } from "../OrderConfirmedModal";
import { Text } from "../Text";
import {
  Item,
  ProductContainer,
  Action,
  Image,
  QuantityContainer,
  ProductDetails,
  Summary,
  TotalContainer
} from "./style";

interface ICartProps {
  cartItems: ICartItem[];
  onAdd: (product: IProduct) => void;
  onDecrement: (product: IProduct) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
}

export function Cart({ cartItems, onAdd, onDecrement, onConfirmOrder, selectedTable }: ICartProps) {

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.product.price * cartItem.quantity;
  }, 0);

  const [isLoading, setIsLoading] = useState(false);

  const [isModalVisible, setisModalVisible] = useState(false);

  async function handleConfirmOrder() {
    setIsLoading(true);
    const payload = {
      table: selectedTable,
      products: cartItems.map(cartItem => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity
      }))
    };
    await api.post('/orders', payload);
    setIsLoading(false);
    setisModalVisible(true);

  }

  function handleOk() {
    setisModalVisible(false);
    onConfirmOrder();
  }

  return (
    <>
      <OrderConfirmedModal
        visible={isModalVisible}
        onOk={handleOk}
      />

      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={(cartItem) => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.0.16:3001/uploads/${cartItem.product.imagePath}`,
                  }}
                />
                <QuantityContainer>
                  <Text size={14} color="#666">{cartItem.quantity}x</Text>
                </QuantityContainer>
                <ProductDetails>
                  <Text size={14} weight="600" >{cartItem.product.name}</Text>
                  <Text size={14} color="#666" style={{ marginTop: 4 }}>{formatCurrency(cartItem.product.price)}</Text>
                </ProductDetails>
              </ProductContainer>

              <Action>
                <TouchableOpacity
                  onPress={() => onAdd(cartItem.product)}
                  style={{ marginRight: 24 }}>
                  <PlusCircle />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => (onDecrement(cartItem.product))}>
                  <MinusCircle />
                </TouchableOpacity>
              </Action>
            </Item>
          )}
        />
      )}


      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ?
            (
              <>
                <Text color="#666">Total</Text>
                <Text size={20} weight="600" >{formatCurrency(total)}</Text>
              </>
            ) :
            (
              (
                <Text color="#999">Seu carrinho está vazio</Text>
              )
            )}
        </TotalContainer>
        <Button
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}
          loading={isLoading}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  )
}
