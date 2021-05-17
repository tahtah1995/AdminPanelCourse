import React from "react"
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../Screens/User/Login';
import  Register from '../Screens/User/Register.js';
import UserProfile from '../Screens/User/UserProfile';
const Stack = createStackNavigator();

  {/* here user navigate to the login system or register or access his profile */}
function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />
             <Stack.Screen 
                name="Register"
                component={Register}
                options={{
                    headerShown: false
                }}
            />
             <Stack.Screen 
                name="User Profile"
                component={UserProfile}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default function UserNavigator() {
    return <MyStack />
}