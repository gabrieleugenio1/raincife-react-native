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
  const [textPass, onChangePass] = React.useState("Your Pass");
  const [textPassConfirm, onChangePassConfirm] = React.useState("Confirm Pass");
  const [locale, onChangeLocale] = React.useState("Localização");
  const [number, onChangeNumber] = React.useState("**/**/****");
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
      <SafeAreaView style={styles.safe}>
      <TouchableOpacity style={styles.voltar} onPress={() => {router.back()}}>
        <Text style={styles.textoBotaoVoltar}>Voltar</Text>
      </TouchableOpacity>
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
        <Text style={styles.text}>Confirme sua senha:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassConfirm}
          value={textPassConfirm}
        />
        <Text style={styles.text}>Data de nascimento:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="useless placeholder"
          keyboardType="numbers-and-punctuation"
        />
        <Text style={styles.text}>Localização:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeLocale}
          value={locale}
        />
      </SafeAreaView>
      <TouchableOpacity style={styles.botao} onPress={() => {}}>
        <Text style={styles.textoBotao}>Criar conta</Text>
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
    alignItems: "flex-start",
    marginBottom: 20,
  },
  images: {
    justifyContent: "flex-start",
    height: 80,
    width: 80,
    marginTop: 20,
    marginBottom: 70,
    resizeMode: "contain",
  },
  options: {
    alignItems: "center",
  },
  voltar:{
    width:100,
  },
  textoBotaoVoltar:{
    color: "#F2F2F2",
    fontSize: 19,
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
    color: "rgba(0,0,0,0.5)",
  },
});
