import { Text } from '../Text';
import { FlatList } from 'react-native';
import { ProductContainer, ProductDetails, ProductImage, Separator, AddToCartButton } from './styles';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { useState } from 'react';
import { IProduct } from '../../types/Product';

interface IMenuProps {
  onAddToCart: (product: IProduct) => void;
  products: IProduct[];
}

export function Menu({ onAddToCart, products }: IMenuProps) {


  const [isModalVisible, setisModalVisible] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const handleOpenModal = (product: IProduct) => {
    setisModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={() => setisModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}

      />
      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={product => product._id}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleOpenModal(product)}>
            <ProductImage
              source={{
                uri: `http://192.168.0.16:3001/uploads/${product.imagePath}`,
              }}
            />
            <ProductDetails>
              <Text weight="600">{product.name}</Text>
              <Text
                size={14}
                color="#666"
                style={{ marginVertical: 8 }}
              >
                {product.description}
              </Text>
              <Text size={14} weight="600" >{formatCurrency(product.price)}</Text>
            </ProductDetails>

            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>
        )}
      />
    </>
  );
}
