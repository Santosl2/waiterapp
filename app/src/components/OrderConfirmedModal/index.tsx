import { StatusBar } from "expo-status-bar";
import { Modal } from "react-native";
import { CheckCircle } from "../Icons/CheckCircle";
import { Text } from "../Text";
import { Container, OkButton } from "./styles";

interface IOrderConfirmedModalProps {
  visible: boolean;
  onOk: () => void;
}

export function OrderConfirmedModal({ visible, onOk }: IOrderConfirmedModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
    >
      <StatusBar style="light" translucent />
      <Container>
        <CheckCircle />
        <Text size={20} weight="600" color="#fff" style={{ marginTop: 12 }}>Pedido confirmado</Text>
        <Text opacity={0.9} color="#fff" style={{ marginTop: 4 }}>O pedido já entrou na linha de produção!</Text>
        <Text color="#fff" style={{ marginTop: 4 }}>Agora é só esperar :)</Text>
        <OkButton onPress={onOk}>
          <Text weight="600" color="#d73035">OK</Text>
        </OkButton>
      </Container>
    </Modal>
  )
}
