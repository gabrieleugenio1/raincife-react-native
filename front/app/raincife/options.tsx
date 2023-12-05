import { useRouter } from "expo-router";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Options() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.images}>
        <Image
          source={require("../../assets/img/logo-branca.png")}
          accessibilityLabel="Logo de raincife"
        />
      </View>
      <View style={styles.options}>
        <TouchableOpacity style={styles.botao} onPress={() => { return router.push('./signUp');}}>
          <Text style={styles.textoBotao}>Cadastrar-se</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Já possui uma conta?</Text>
        <TouchableOpacity >
          <Text style={[styles.text, { fontWeight: 'bold', fontSize:16 }]} onPress={() => { return router.push('./login');}}>Faça login</Text>
        </TouchableOpacity>
      </View>
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
  images: {
    justifyContent: "flex-start",
    marginTop: 100,
    marginBottom: 100,
  },
  options:{
    alignItems: "center",
  },
  botao: {
    backgroundColor: "#F2F2F2",
    width: 180,
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 3,
    borderRadius: 14,
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
  text: {
    color: "#F2F2F2",
    marginTop: 5,
  }
});
