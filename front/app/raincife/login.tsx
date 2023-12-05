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
import axios from "axios";

export default function Options() {
  const [email, onChangeEmail] = React.useState<string>("");
  const [password, onChangePassword] = React.useState<string>("");
  const router = useRouter();

  async function handleLogin() {
    if (email === "" || password === "") {
      alert("Preencha os campos");
      return;
    }
    await axios
      .post(`http://192.168.0.169:3000/login`, {
        emailCel: email,
        senha: password,
      })
      .then((response) => {
        if (response.status === 200) {
          router.push("./autenticado/home");
        }
      })
      .catch((error) => {
        alert("Email ou senha incorretos");
        console.log(error.response?.data
        )});
  }

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.images}
          source={require("../../assets/img/logo-branca.png")}
          accessibilityLabel="Logo de raincife"
        />
      </View>
      <Text style={styles.textTitle}>Bem-vindo(a) ao Raincife</Text>
      <SafeAreaView style={styles.safe}>
        <TouchableOpacity
          style={styles.voltar}
          onPress={() => {
            router.back();
          }}
        >
          <Text style={styles.textoBotaoVoltar}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Digite seu email ou número de telefone:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email ou número de telefone"
          onChangeText={onChangeEmail}
          value={email}
        />
        <Text style={styles.text}>Digite sua senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          onChangeText={onChangePassword}
          secureTextEntry={true}
          value={password}
        />
      </SafeAreaView>
      <TouchableOpacity style={styles.botao} onPress={() => handleLogin()}>
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
  voltar: {
    width: 100,
  },
  textoBotaoVoltar: {
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
