import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AdminNavigator from './AdminNavigator'
import HomeNavigator from "./HomeNavigator";
import UserNavigator from './UserNavigator';
import AuthGlobal from "../Context/store/AuthGlobal";
const Tab = createBottomTabNavigator();

     {/* the Main screen of the App where all other navigations Start */}
const Main = () => {
  const context = useContext(AuthGlobal)
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: true,
        activeTintColor: "#e91e63",
      }}
    >
        {/* the screens nivagation here with each component */}
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: "Home",

          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      />

     
        {context.stateUser.user.isAdmin == true ? (
          <Tab.Screen
 name="Admin"
 component={AdminNavigator}
 options={{
   tabBarIcon: ({ color }) => (
     <Icon name="cog" color={color} size={30} />
   ),
 }}
/>
        ): null }
     

      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
