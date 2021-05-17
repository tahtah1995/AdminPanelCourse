import React from 'react' ;
import {StyleSheet, TouchableOpacity , ScrollView , Image} from 'react-native' ;
import {ListItem , Badge , Text , Icon , Button } from 'native-base'

const CategoryFilter = (props) =>{

    return(
        <ScrollView
        bounces = {true} 
        horizontal = {true}
        style = {{backgroundColor:"#f2f2f2"}  }
        >
            <ListItem  style ={{margin:10 , padding:0 , borderRadius:0 ,marginTop:20}}> 

                <TouchableOpacity
                
                key = {Math.random()}
                onPress = {() =>{
                    props.categoryFilter('all') ,
                    props.setActive(-1)
                }}
                >
                    
<Badge style = {[styles.center , {margin:15} ,  {scaleX: 1.2, scaleY: 1.2} ,
props.active == -1 ? styles.active : styles.inactive

]}>  

<Image source={{uri: 'https://i.postimg.cc/KcW27vY8/icon-book.png'}}  style = {{width: 30, height: 30 , marginTop:-35}}/>
<Text style ={{color:'white' ,marginTop:0 }}>All</Text>
</Badge>
                </TouchableOpacity>
                {props.categories.map( (item)=>(
  <TouchableOpacity
                
  key = {item.id}
  onPress = {() =>{
      props.categoryFilter(item._id) ,
      
      props.setActive(props.categories.indexOf(item))  
  }}
  >
      
<Badge  style = {[styles.center , {margin:15} , {scaleX: 1.2, scaleY: 1.2} ,

props.active ==  props.categories.indexOf(item)? styles.active :styles.inactive
]}>  



<Image source={{uri: item.image}}  style = {{width: 30, height: 30 , marginTop:-35}}/>  
<Text style ={{color:'white' ,marginTop:0 }}>{item.name}</Text>
</Badge>
  </TouchableOpacity>
                )) }
            </ListItem>
        </ScrollView>
    )
}

const styles = StyleSheet.create({


center:{
    justifyContent: 'center' ,
    alignItems: 'center'
} ,
active :{
    backgroundColor: '#03bafc'
} ,
inactive: {
    backgroundColor: '#a0e1eb'
}

})

export default CategoryFilter ;