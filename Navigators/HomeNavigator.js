import {createStackNavigator} from '@react-navigation/stack'
import React from 'react' ;
import CourseContainer  from '../Screens/Courses/CourseContainer' ;
import courseQuestions from '../Screens/Courses/CourseQuestions' ;
const Stack  = createStackNavigator()
//home Screens navigation here happens
function Mystack () {
return(
    <Stack.Navigator>
        <Stack.Screen
        
        name= 'Home'
        component = {CourseContainer}
        options = {{
            headerShown: false ,

        }}
        
        />
           <Stack.Screen
        
        name= 'Course Detail'
        component = {courseQuestions}
        options = {{
            headerShown: false ,

        }}
        
        />


       
    </Stack.Navigator>
)
}
export default  function HomeNavigator() {
    return <Mystack />
}