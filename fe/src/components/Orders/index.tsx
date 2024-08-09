import { useEffect, useState } from 'react'
import { IOrder } from '../../types/Order'
import { api } from '../../utils/api'
import { OrdersBoard } from '../OrdersBoard'
import { Container } from './styles'
import socketIo from 'socket.io-client';
export function Orders() {

  const [orders, setOrders] = useState<IOrder[]>([])


  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket'],
    });
    socket.on('order@new', (order) => {
      setOrders((prevState) => prevState.concat(order));
    })
  }, [])

  useEffect(() => {
    api.get('/orders')
      .then(({ data }) => {
        setOrders(data)
      })
  }, [])


  const waiting = orders.filter((order) => {
    return order.status === 'WAITING'
  })

  const inProduction = orders.filter((order) => {
    return order.status === 'IN_PRODUCTION'
  })

  const done = orders.filter((order) => {
    return order.status === 'DONE'
  })

  function handleCancelOrder(orderId: string) {
    setOrders((prevState) => prevState.filter(order => order._id !== orderId));
  }

  function handleOrderStatusChange(orderId: string, status: IOrder['status']) {
    setOrders((prevState) => prevState.map((order) => (
      order._id === orderId
        ? { ...order, status }
        : order
    )));
  }

  return (
    <Container>
      <OrdersBoard
        icon="🕓"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        icon="👩‍🍳"
        title="Em produção"
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}

      />
      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={done}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}

      />
    </Container>
  )
}
