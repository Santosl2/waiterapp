import { ActivityIndicator } from 'react-native';
import { Text } from '../Text';
import { Container } from './styles';

interface IButtonProps {
  children: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({ children, onPress, disabled, loading }: IButtonProps) {
  return (
    <Container onPress={onPress} disabled={disabled || loading}>
      {!loading && (<Text weight="600" color="#fff">{children}</Text>)}

      {loading && (
        <ActivityIndicator color="#fff" />
      )}
    </Container >
  );
}
