import React,{ useState, useEffect } from "react";
import { useRouter} from "expo-router";
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Options() {
  const abrigos = [
    [1,"Escola Municipal Diná de Oliveira (ABRIGO)","ABRIGO","MUNICIPAL - LIBERADO","Rua São Mateus, s/n, Iputinga","IPUTINGA",-8.030336,-34.93478],
    [2,"Escola Municipal Casarão do Barbalho (ABRIGO)","ABRIGO","MUNICIPAL - LIBERADO","Estrada do Barbalho, nº 1595, Iputinga","DETRAN",-8.028799,-34.934646],
    [3,"Escola Municipal Maria de Sampaio Lucena (ABRIGO)","ABRIGO","MUNICIPAL - LIBERADO","Av. Pernambuco, s/n, UR 01, Cohab","COHAB/IBURA",-8.12141479466924,-34.9464331973288],
    [4,"Escola Municipal Poeta Paulo Bandeira da Cruz (ABRIGO)","ABRIGO","MUNICIPAL - LIBERADO","Rua das Panelas, nº 28, UR 02, Cohab","COHAB/IBURA",-8.12172498360443,-34.9553219621932],
    [5,"Escola Municipal Adauto Pontes (ABRIGO)","ABRIGO","MUNICIPAL - LIBERADO","R. Sertânia, 35 - Jordão Alto, Recife - PE, 51260-390","JORDÃO",-8.13530104806725,-34.94484631864155],
    [6,"E.M. 27 de Novembro (ABRIGO)","ABRIGO","MUNICIPAL - LIBERADO","Av. Doze de Junho, nº 1120, UR 05, Cohab","COHAB",-8.11154560034305,-34.9537506787609],
    [7,"CENTRO DE APOIO SOCIAL ESPORTIVO E CULTURAL DO IBURA (PONTO DE APOIO)","PONTO DE APOIO","CENTRO SOCIAL - LIBERADO","Rua Rio da Prata, s/n","IBURA",-8.121217,-34.934046],
    [8,"IGREJA POÇO DA PANELA (PONTO DE APOIO)","PONTO DE APOIO","IGREJA - LIBERADO","R. Antônio Vitrúvio, 71","POÇO DA PANELA",-8.04002248516449,-34.91883563935709],
    [9,"IGREJA ORAI (ABRIGO)","ABRIGO","IGREJA - LIBERADO","R. Tucumã, 127 - Ibura","IBURA",-8.11394402985265,-34.93198040329792],
    [10,"ASSOCIAÇÃO ASA BRANCA (PONTO DE APOIO)","PONTO DE APOIO","ASSOCIAÇÃO - LIBERADO","Travessa Benigno Jordão de Vasconcelos, n 41","LAGOA ENCANTADA",-8.127664525588713,-34.94966677446167],
    [11,"CASA DE DONA ÉRICA (PONTO DE APOIO)","PONTO DE APOIO","LIBERADO","Rua Tinto, 153","LINHA DO TIRO",-8.00693942149902,-34.90726200329927],
    [12,"ASSOCIAÇÃO DE MORADORES VILA VINTÉM II (PONTO DE APOIO)","PONTO DE APOIO","ASSOCIAÇÃO - LIBERADO","Avenida Vereador Otacílio de Azevedo, 730","VASCO DA GAMA",-8.003627845570552,-34.9174202456272],
    [13,"IGREJA BATISTA DO CAÇOTE (ABRIGO)","ABRIGO","IGREJA - LIBERADO","R. Dona Ana Aurora, 2042 - Areias","AREIAS",-8.103488607323246,-34.934963303297906],
    [14,"ESCOLA MUNICIPAL CAMPINA DO BARRETO - CAJUEIRO (ABRIGO)","ABRIGO","","Rua Virgílio de Melo Franco, nº 28","CAJUEIRO",-8.009495021697209,-34.886512303299156],
    [15,"PARÓQUIA NOSSA SRA. DOS REMÉDIOS (CARANGUEJO-TABAIARES) (PONTO DE APOIO)","PONTO DE APOIO","","Estrada dos Remédios, 1603","AFOGADOS",-8.065737426075472,-34.908335474462476],
    [16,"ESCOLA MUNICIPAL RICARDO GAMA (ABRIGO)","ABRIGO","","R. Guaíra, 148","LINHA DO TIRO",-8.007459145767697,-34.904254903299154],
    [17,"IGREJA BATISTA CÓRREGO DO TIRO (ABRIGO)","ABRIGO","","Rua Prof. José Amarino dos Reis, 392","ÁGUA FRIA",-8.018066594217876,-34.90642103213498]
];

  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [closestAbrigo, setClosestAbrigo] = useState(null);
  
  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg('Erro ao obter a localização');
      }
    })();
  }, []);

  const haversine = (lat1: number, lon1:number, lat2:number, lon2:number) => {
    const R = 6371; // Raio da Terra em quilômetros
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distância em quilômetros
    return distance;
  };

  useEffect(() => {
    if (location) {
      findClosestAbrigo(location.coords.latitude, location.coords.longitude);
    }
  }, [location]);
  
  const findClosestAbrigo = (userLat:number, userLng:number) => {
    let closestAbrigo = null;
    let closestDistance = Infinity;
  
    abrigos.forEach(abrigo => {
      const abrigoLat = abrigo[6];
      const abrigoLng = abrigo[7];
      const distance = haversine(userLat, userLng, Number(abrigoLat), Number(abrigoLng));
  
  
      if (distance < closestDistance) {
        closestDistance = distance;
        closestAbrigo = abrigo;
      }
    });
    
    setClosestAbrigo(closestAbrigo);
  };

  return (
    <View style={styles.container}>
              <View style={styles.legendContainer}>
      <View style={styles.legendItem}>
        <View style={[styles.legendIcon, { backgroundColor: 'blue' }]} />
        <Text>Abrigos</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.legendIcon, { backgroundColor: 'red' }]} />
        <Text>Localização Atual</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.legendIcon, { backgroundColor: 'green' }]} />
        <Text>Abrigo Mais Próximo</Text>
      </View>
    </View>
           {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : location ? (
        <React.Fragment>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Minha Localização"
            description="Estou aqui!"
          />
      {abrigos.map((abrigo) => (
        <Marker
          key={abrigo[0]}
          coordinate={{
            latitude: Number(abrigo[6]),
            longitude: Number(abrigo[7]),
          }}
          title={String(abrigo[1])}
          description={String(abrigo[3])}
          pinColor="blue" // ícone azulzinho
        />
      ))}
            {closestAbrigo && (
        <Marker
          coordinate={{
            latitude: closestAbrigo[6],
            longitude: closestAbrigo[7],
          }}
          title={closestAbrigo[1]}
          description={closestAbrigo[3]}
          pinColor="green"
        />
      )}

        </MapView>
        </React.Fragment>
      ) : (
        <Text>Obtendo a localização...</Text>
      )}
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5EBE0",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  legendContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'column',
    alignItems: 'flex-end',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    zIndex: 999,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  legendIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 4,
  },
});
