import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox, ScrollView } from "react-native";
import Header from "./shared/Header";
//Screens
import CourseContainer from "./Screens/Courses/CourseContainer";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./Navigators/Main";
import {Provider} from 'react-redux' ;

import Toast from "react-native-toast-message";
import Auth from "./Context/store/Auth";

export default function App() {
  return (
//Here all the App components set on the authrouzation system
    <Auth>
    
     {/* Nivigation to other Screnns will begin from header component and main which have the main 
     
     screen and the logo and all parts */}
      <NavigationContainer>
        <Header />
        <Main />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
   
  </Auth>
  );
}



