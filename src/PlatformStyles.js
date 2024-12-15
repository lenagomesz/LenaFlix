// Página solicitada pelo professor para alternar entr Android e IOS algumas estilizações conforme solicitado na última entrega do Assesment //
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

const PlatformStyles = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Este texto tem estilos condicionais dependendo da plataforma.
      </Text>
      <Text style={styles.description}>
        A aparência deste componente muda com base na plataforma (iOS ou
        Android).
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    backgroundColor: Platform.OS === "ios" ? "#f0f0f0" : "#ffffff",
  },
  text: {
    fontSize: Platform.OS === "ios" ? 18 : 16,
    color: Platform.OS === "ios" ? "blue" : "green",
  },
  description: {
    fontSize: 14,
    color: "gray",
  },
});

export default PlatformStyles;
