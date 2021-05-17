import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Courses from "../Screens/Admin/Courses";
import CourseForm from "../Screens/Admin/CourseForm";
import Categories from "../Screens/Admin/Categories";
import Users from '../Screens/Admin/Users';
import AddAdmin from '../Screens/Admin/AddAdmin';
import AddQuestions from '../Screens/Admin/AddQuestions';

//Admin Screens navigation here happens
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Courses"
        component={Courses}
        options={{
          title: "Courses",
        }}
      />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="CourseForm" component={CourseForm} />
      <Stack.Screen name="AddAdmin" component={AddAdmin} />
      <Stack.Screen name="AddQuestions" component={AddQuestions} />
    </Stack.Navigator>
  );
}
export default function AdminNavigator() {
  return <MyStack />;
}
