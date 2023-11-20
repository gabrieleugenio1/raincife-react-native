import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Options() {
  const [text, onChangeText] = React.useState("Exemple@email.com");
  const [textPass, onChangePass] = React.useState("yourPass");
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.images}
          source={require("../../../assets/img/logo-branca.png")}
          accessibilityLabel="Logo de raincife"
        />
      </View>
      <Text style={styles.textTitle}>Bem-vindo(a) ao Raincife</Text>
      <SafeAreaView style={styles.safe}>
        <Text style={styles.text}>Digite seu email ou número de telefone:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <Text style={styles.text}>Digite sua senha:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePass}
          value={textPass}
        />
      </SafeAreaView>
      <TouchableOpacity style={styles.botao} onPress={() => {}}>
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34A0A4",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  safe: {
    marginTop: 65,
    alignItems: "flex-start",
    marginBottom: 20,
  },
  images: {
    justifyContent: "flex-start",
    height: 80,
    width: 80,
    marginTop: 20,
    marginBottom: 80,
    resizeMode: "contain",
  },
  options: {
    alignItems: "center",
  },
  botao: {
    backgroundColor: "#F2F2F2",
    width: 180,
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 3,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#F2F2F2",
    cursor: "pointer",
  },
  textoBotao: {
    textAlign: "center",
    color: "#34A0A4",
    fontSize: 19,
    fontWeight: "bold",
  },
  textTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#F2F2F2",
  },
  text: {
    fontSize: 16,
    paddingLeft: 10,
    color: "#F2F2F2",
    marginTop: 5,
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: 300,
    marginBottom: 20,
    borderWidth: 0,
    backgroundColor: "#F2F2F2",
    borderRadius: 15,
    padding: 10,
    color: 'rgba(0,0,0,0.5)',
  },
});
