import React, { useEffect, useState ,  useCallback } from "react"
import { 
    View, 
    Text,
    FlatList,
    Dimensions,
    TextInput,
    StyleSheet  ,
    ActivityIndicator,
} from "react-native"
import ListItemUser from "./ListItemUser"
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage"
import EasyButton from "../../shared/StyledComponents/EasyButton"
import { useFocusEffect } from "@react-navigation/native"
import Icon from "react-native-vector-icons/FontAwesome"
import { Header, Item, Input } from "native-base"
import Toast from "react-native-toast-message";
var { width , height } = Dimensions.get("window")

//here we see all users and all info and get them and post data to make new admins 

const ListHeader = () => {
    return(
        <View
            elevation={1}
            style={styles.listHeader}
        >
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600'}}>Name</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600'}}>Phone</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600'}}>street</Text>
            </View>

            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600'}}>Admin</Text>
            </View>
        </View>
    )
}
const Users = (props) =>{
    const [UserList, setUserList] = useState();
    const [UserFilter, setUserFilter] = useState();
    const [loading, setLoading] = useState(true);
    const [IsAdmin , setIsAdmin] = useState(true);
    const [token, setToken] = useState();
    const [item, setItem] = useState(null);
    useFocusEffect(
        useCallback(
            () => {
                // Get Token
                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        setToken(res)
                    })
                    .catch((error) => console.log(error))

                axios
                    .get(`${baseURL}users`)
                    .then((res) => {
                        setUserList(res.data);
                        setUserFilter(res.data);
                        setLoading(false);
                    })

                return () => {
                    setUserList();
                    setUserFilter();
                    setLoading(true);
                }
            },
            [],
        )
    )

    const searchUsers = (text) => {
        if (text == "") {
            setUserList(UserList);
        }
        setUserList(
            UserList.filter((i) => 
                i.name.toLowerCase().includes(text.toLowerCase())
            )
        )
    }

    const MakeUserAdmin = () => {


        let formData = new FormData();

 formData.append("isAdmin", IsAdmin);

 const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  if (item !== null) {
    axios
      .put(`${baseURL}users/${item.id}`, formData, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Admin added successfuly updated",
            text2: "",
          });
          setTimeout(() => {
            props.navigation.navigate("users");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  } else {
    axios
      .post(`${baseURL}users`, formData, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "New Admin is added",
            text2: "",
          });
          setTimeout(() => {
            props.navigation.navigate("users");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  }
};
 
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <EasyButton
                    secondary
                    medium
                    onPress={() => props.navigation.navigate("Courses")}
                >
                    <Icon name="user" size={18} color="white" />
                    <Text style={styles.buttonText}>Courses</Text>
                </EasyButton>


                <EasyButton 
                        medium 
                        danger
                        onPress={() => props.navigation.navigate("AddAdmin")}
                        >
                             <Icon name="plus" size={18} color="white" />
                    <Text style={styles.buttonText}>Add New Admin</Text>
                        </EasyButton>
               
                <EasyButton
                    secondary
                    medium
                    onPress={() => props.navigation.navigate("Categories")}
                >
                    <Icon name="plus" size={18} color="white" />
                    <Text style={styles.buttonText}>Categories</Text>
                </EasyButton>

              
            </View>
          <View>
              <Header searchBar rounded>
                  <Item style={{ padding: 5 }}>
                      <Icon name="search" />
                      <Input 
                        placeholder="Search"
                        onChangeText={(text) => searchUsers(text)}
                      />
                  </Item>
              </Header>
          </View>
    
          {loading ? (
              <View style={styles.spinner}> 
                  <ActivityIndicator size="large" color="red" />
              </View>
          ) : (
              <FlatList 
                data={UserFilter}
                ListHeaderComponent={ListHeader}
                renderItem={({ item, index }) => (
                    <ListItemUser
                        {...item}
                        navigation={props.navigation}
                        index={index}
                        MakeAdmin={MakeUserAdmin}
                    />
                )}
                keyExtractor={(item) => item.id}
              />
          )}
        </View>
      );
    };
    
    const styles = StyleSheet.create({
        listHeader: {
            flexDirection: 'row',
            padding: 5,
            backgroundColor: 'gainsboro'
        },
        headerItem: {
            margin: 3,
            width: width / 6
        },
        spinner: {
            height: height / 2,
            alignItems: 'center',
            justifyContent: 'center'
        },
        container: {
            marginBottom: 160,
            backgroundColor: 'white'
        },
        buttonContainer: {
            margin: 20,
            alignSelf: 'center',
            flexDirection: 'row'
        },
        buttonText: {
            marginLeft: 4,
            color: 'white'
        }
    })
export default Users;