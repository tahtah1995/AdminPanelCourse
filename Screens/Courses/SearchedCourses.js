import React from 'react';
import {View , StyleSheet , Dimensions} from 'react-native' ;
import {Content , Left , body , ListItem , Thumbnail , Text, Body} from 'native-base' ;

var {width} = Dimensions.get("window"); 

const SearchedCourses = (props) =>{
    const {CoursesFiltered} = props ;
    return (
        <Content style = {{width:width}}>
            {CoursesFiltered.length > 0 ? (
                CoursesFiltered.map((item)=>(
                    <ListItem
                    onPress  = {() =>{
                        props.navigation.navigate("Course Detail" , {item:item})
                    }}
                    key={item._id.$oid}
                    avatar
                    >
                        <Left>

                            <Thumbnail
                            source={{uri:item.image ? item.image:'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'}}
                            />
                        </Left>
                        <Body>
                            <Text>{item.name}</Text>
                            <Text note>{item.description}</Text>
                        </Body>
                        </ListItem>
                ))
            ): (
                <View style={StyleSheet.center}>
                    <Text style = {{alignSelf:'center'}}>

                        NO COURSES Matched
                    </Text>
                </View>
            )}
        </Content>
    )
};
const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100
    }
})
export default SearchedCourses;