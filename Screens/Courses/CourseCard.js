import React from 'react' ;
import {
    StyleSheet  ,
    View ,
    Dimensions ,
    Image , 
    Text ,
    
} from 'react-native'
import Toast from "react-native-toast-message";

import { Button } from 'react-native-elements';

var {width} = Dimensions.get("window") ;
const CourseCard = (props) =>{
    const {name , price ,image } = props ;
    
return(
    <View style ={styles.container}>
        <Image 
        style ={styles.image}
        
        resizeMode="contain"
        source={{uri: image  ? image:'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'}}
        />
            <View  style={styles.card}/>

           <Text style={styles.title}>
               {name.length > 15 ? name.substring(0,15-3)
               + '...' : name
            }
           </Text>
           <Text style = {styles.price} > ${price}</Text>
       
           
      
    </View>
)
}



const styles = StyleSheet.create({
container: {
    width:width/2 - 20 ,
    height: width / 1.7 ,
    padding:10 ,
    borderRadius:10 ,
    marginTop:55 ,
    marginBottom: 5 ,
    marginLeft:10 ,
    alignItems:'center' ,
    elevation: 8 , 
    backgroundColor:'white' ,

}
,
image: {
    width:width/2-20-10 ,
    height: width/2-20-30 ,
    backgroundColor: 'transparent',
    position:'absolute' ,
    top: -45 
}
, card:{
    marginBottom:10 ,
    height: width/2-20-90 ,
    backgroundColor: 'transparent' ,
    width: width/2-20-10
} ,
price:{
fontSize:20 ,
color:'orange' ,
marginTop: 10
} ,
title:{
  fontWeight: "bold" ,
  fontSize: 14 ,
  textAlign: 'center'

} 

});

export default CourseCard;