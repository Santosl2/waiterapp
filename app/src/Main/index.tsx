import { ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';

import {
  Container,
  CategoriesContainer,
  MenuContainer,
  Footer,
  FooterContainer,
  CenteredContainer
} from './styles';

import { Header } from '../components/Header';


import { Menu } from '../components/Menu';
import { Button } from '../components/Button';
import { TableModal } from '../components/TableModal';
import { Cart } from '../components/Cart';

import { ICartItem } from '../types/CartItems';
import { IProduct } from '../types/Product';


import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';
import { ICategory } from '../types/Category';
import { Categories } from '../components/Categories';
import { api } from '../utils/api';


export function Main() {

  const [isTableModalVisible, setisTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<ICartItem[]>([
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {

    Promise.all([
      api.get('/categories'),
      api.get('/products'),
    ]).then(([categoriesResponse, productsResponse]) => {
      setCategories(categoriesResponse.data);
      setProducts(productsResponse.data);
      setIsLoading(false);
    });

  }, []);

  async function handleSelectCategory(categoryId: string) {
    const route = !categoryId
      ? `products`
      : `/categories/${categoryId}/products`

    setIsLoadingProducts(true);

    const { data } = await api.get(route)
    setProducts(data);
    setIsLoadingProducts(false);
  };


  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCartItems([]);
  }

  function handleAddToCart(product: IProduct) {
    if (!selectedTable) {
      setisTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        cartItems => cartItems.product._id === product._id
      );

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product,
        });
      }

      const newCartItems = [...prevState];

      const item = newCartItems[itemIndex]
      newCartItems[itemIndex] = {
        ...item,
        quantity: newCartItems[itemIndex].quantity + 1,
      };

      return newCartItems;
    });
  }

  function handleDecrementCartItem(product: IProduct) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        cartItems => cartItems.product._id === product._id
      );

      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if (item.quantity === 1) {

        const newCartItems = [...prevState];
        newCartItems.splice(itemIndex, 1);

        return newCartItems;
      }


      newCartItems[itemIndex] = {
        ...item,
        quantity: newCartItems[itemIndex].quantity - 1,
      };

      return newCartItems;
    });
  }
  return (
    <>
      <Container>

        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {isLoading && (
          <CenteredContainer>
            <ActivityIndicator color="#d73035" size="large" />
          </CenteredContainer>
        )}

        {!isLoading && (
          <>
            <CategoriesContainer>
              <Categories
                onSelectedCategory={handleSelectCategory}
                categories={categories}

              />
            </CategoriesContainer>

            {isLoadingProducts ? (
              <CenteredContainer>
                <ActivityIndicator color="#d73035" size="large" />
              </CenteredContainer>
            ) :
              (
                <>
                  {products.length > 0 ?
                    (
                      <MenuContainer>
                        <Menu
                          onAddToCart={handleAddToCart}
                          products={products} />
                      </MenuContainer>
                    )
                    :
                    (
                      <CenteredContainer>
                        <Empty />
                        <Text color="#666" style={{ marginTop: 24 }}>
                          Nenhum produto encontrado
                        </Text>
                      </CenteredContainer>
                    )
                  }
                </>
              )}
          </>
        )}

      </Container>



      <Footer>

        <FooterContainer>
          {!selectedTable && (
            <Button
              onPress={() => setisTableModalVisible(true)}
              disabled={isLoading}>
              Novo Pedido
            </Button>
          )}

          {selectedTable && (
            <Cart
              selectedTable={selectedTable}
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleDecrementCartItem}
              onConfirmOrder={handleResetOrder}
            />
          )}
        </FooterContainer >

      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setisTableModalVisible(false)}
        onSave={handleSaveTable}

      />
    </>
  );
}
