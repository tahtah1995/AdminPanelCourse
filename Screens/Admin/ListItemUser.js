import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableHighLight,
    TouchableOpacity,
    Dimensions,
    Button,
    Modal
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"
import EasyButton from "../../shared/StyledComponents/EasyButton"

var { width } = Dimensions.get("window");


const ListItemUser = (props) => {

    //styled list passed to the users component  to style all the list and get data arranged 
    const [AdminState, setAdminstate] = useState();
             
    
    const [modalVisible, setModalVisible] = useState(false)
  
    return(
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            underlayColor="#E8E8E8"
                            onPress={() => {
                                setModalVisible(false)
                            }}
                            style={{ 
                                alignSelf: "flex-end",
                                position: "absolute",
                                top: 5,
                                right: 10
                            }}
                        >
                            <Icon name="close" size={20} />
                        </TouchableOpacity>
                        <EasyButton 
                        medium 
                        secondary
                        onPress={() => [
                            props.navigation.navigate("Users" ),
                            setModalVisible(false)
                        ]}
                        >
                            <Text style={styles.textStyle}>close</Text>
                        </EasyButton>
                      
                    </View>
                </View>

            </Modal>
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate("Users", { item: props })
                   
                }}
                onLongPress={() => setModalVisible(true)}
                style={[styles.container, {
                    backgroundColor: props.index % 2 == 0 ? "white" : "gainsboro"
                }]}
            >
              
              
             
               <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">{props.name}</Text>
                <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">{props.phone}</Text>
                <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">{props.apartment}</Text>
                <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">{props.isAdmin.toString()}</Text>
                
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        width: width
    },
    image: {
        borderRadius: 50,
        width: width / 6,
        height: 20,
        margin: 2
    },
    item: {
        flexWrap: "wrap",
        margin: 3,
        width: width / 6
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold"
    }
})

export default ListItemUser;