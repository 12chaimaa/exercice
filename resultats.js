import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';

export default function Resultats({ route }) {
  const { historique, tentatives, codeSecret } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Résultats des Tentatives</Text>

      <Text style={styles.subtitle}>Code Secret : {codeSecret}</Text>
      <Text style={styles.subtitle}>Nombre de tentatives : {tentatives}</Text>

      {historique.length === 0 ? (
        <Text>Aucune tentative effectuée.</Text>
      ) : (
        historique.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.text}>
              Tentative {index + 1} : {item.prop}  →  {item.resultat}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    backgroundColor: "#eee",
    marginBottom: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});