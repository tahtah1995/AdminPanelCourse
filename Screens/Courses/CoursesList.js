import React from 'react';
import { TouchableOpacity , View , Dimensions, Touchable} from  'react-native';
import CourseCard from './CourseCard' ;

var {width} = Dimensions.get("window") ;
const CoursesList = (props) =>{
    const {item} = props ;
    return(
        <TouchableOpacity 
        style={{width: '50%'}}
        
        onPress= {
            () => {
                props.navigation.navigate("Course Detail" , {item: item})
            }
        } 
        >
            <View style = {{width: width/2 , backgroundColor:'gainsboro'}}>
<CourseCard {...item}   />


            </View>

        </TouchableOpacity>
    )
}
export default CoursesList ;