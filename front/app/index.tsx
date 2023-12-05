import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';



export default function App() {
  const router = useRouter();
   function index() {
    router.replace('./raincife/options');
  }

  useEffect(() =>  {
    setTimeout(() => {
      index()
    }, 3000);
  }, [])

  return (
    <View style={styles.container}>
      <View >
        <Image
            source={require('../assets/img/logo-branca.png')}
            accessibilityLabel="Logo de raincife"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34A0A4',
    alignItems: 'center',
    justifyContent: 'center',
  }

});
