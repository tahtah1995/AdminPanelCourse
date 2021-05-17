import React from "react";
import { StyleSheet, Image, SafeAreaView, View } from "react-native";
//the Top part of screen
const Header = () => {
  return (
    <SafeAreaView style = {styles.header}>
      <Image
        source={require("../assets/Data/Logo.png")}
        resizeMode="contain"
        style={{ height: 80 }}
      />
    </SafeAreaView>
  )
  }
  const styles = StyleSheet.create({
    header: {
      width: "100%",
    
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "center",
      padding: 20 ,
      

    },
  });

export default Header ;