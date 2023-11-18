import { useRouter } from "expo-router";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Options() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.images}>
        <Image
          source={require("../../../assets/img/logo-branca.png")}
          accessibilityLabel="Logo de raincife"
        />
      </View>
      <View style={styles.options}>
        <TouchableOpacity style={styles.botao} onPress={() => { return router.replace('./sign-up');}}>
          <Text style={styles.textoBotao}>Cadastre-se</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Text>Faça login</Text>
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
    paddingVertical: 1,
    paddingHorizontal: 3,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#F2F2F2",
    cursor: "pointer",
  },
  textoBotao: {
    color: "#34A0A4",
    fontSize: 19,
    fontWeight: "bold",
  },
});
