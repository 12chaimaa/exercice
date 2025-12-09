import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';

export default function Jeu({ navigation }) {
  const [codeSecret, setCodeSecret] = useState(genererCode());
  const [proposition, setProposition] = useState('');
  const [historique, setHistorique] = useState([]);
  const [tentatives, setTentatives] = useState(0);

  function genererCode() {
    return Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');
  }

  function analyserProposition(prop, code) {
    let feedback = "";

    for (let i = 0; i < 4; i++) {
      if (prop[i] === code[i]) feedback += "+";
      else if (code.includes(prop[i])) feedback += "-";
      else feedback += " ";
    }

    return feedback;
  }

  function validerProposition() {
    if (proposition.length !== 4) return;

    const feedback = analyserProposition(proposition, codeSecret);

    const tentative = {
      prop: proposition,
      resultat: feedback,
    };

    const historiqueMisAJour = [...historique, tentative];
    setHistorique(historiqueMisAJour);
    setTentatives(tentatives + 1);

    if (proposition === codeSecret) {
      Alert.alert(
        "🎉 Bravo !",
        `Tu as trouvé le code secret en ${tentatives + 1} tentatives !`
      );
    }

    setProposition('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jeu du Code Secret (4 chiffres)</Text>

      <TextInput
        style={styles.input}
        placeholder="Entrez 4 chiffres"
        keyboardType="numeric"
        maxLength={4}
        value={proposition}
        onChangeText={setProposition}
      />

      <Button
        title="Valider"
        onPress={validerProposition}
        disabled={proposition.length !== 4}
      />

      {/* ➤ Affichage du nombre de tentatives */}
      <Text style={styles.tentatives}>
        Tentatives : {tentatives}
      </Text>

      {/* ➤ Affichage de l'historique */}
      <ScrollView style={styles.historiqueBox}>
        {historique.map((t, index) => (
          <Text key={index} style={styles.historiqueItem}>
            {index + 1}. {t.prop} → {t.resultat}
          </Text>
        ))}
      </ScrollView>

      <View style={{ marginTop: 20 }}>
        <Button
          title="Voir les Résultats"
          color="green"
          onPress={() =>
            navigation.navigate("Resultats", {
              historique,
              tentatives,
              codeSecret,
            })
          }
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Button
          title="Rejouer"
          color="red"
          onPress={() => {
            setCodeSecret(genererCode());
            setHistorique([]);
            setTentatives(0);
            setProposition('');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  tentatives: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "600",
  },
  historiqueBox: {
    marginTop: 20,
    maxHeight: 200,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  historiqueItem: {
    fontSize: 16,
    marginBottom: 5,
  }
});
