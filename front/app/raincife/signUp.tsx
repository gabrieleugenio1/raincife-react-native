import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";
import React, {useState} from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

export default function Options() {
  const [text, onChangeText] = React.useState("");
  const [textPass, onChangePass] = React.useState("");
  const [textPassConfirm, onChangePassConfirm] = React.useState("");
  const router = useRouter();

  const handleSignUp = async() => {
    if (textPass !== textPassConfirm) {
      alert("As senhas não são iguais");
    } else {
      await axios.post(`http://192.168.0.169:3000/criar-conta`, {
        emailCel: text,
        senha: textPass,
        confirmarSenha: textPassConfirm,
      }).then((response) => {
        console.log(response);
        if (response.status === 201) {
          alert("Conta criada com sucesso.");
          router.push('./autenticado/home');
        }
      }).catch((error) => console.log( error.response?.data));
    }
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
      <SafeAreaView style={styles.safe}>
      <TouchableOpacity style={styles.voltar} onPress={() => {router.back()}}>
        <Text style={styles.textoBotaoVoltar}>Voltar</Text>
      </TouchableOpacity>
        <Text style={styles.text}>Digite seu email ou número de telefone:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email ou número de telefone"
          onChangeText={onChangeText}
          keyboardType="email-address"
          value={text} 
        />
        <Text style={styles.text}>Digite sua senha:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePass}
          placeholder="********"
          secureTextEntry={true}
          value={textPass}
        />
        <Text style={styles.text}>Confirme sua senha:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassConfirm}
          placeholder="********"
          secureTextEntry={true}
          value={textPassConfirm}
        />
      </SafeAreaView>
      <TouchableOpacity style={styles.botao} onPress={() => {handleSignUp()}}>
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
