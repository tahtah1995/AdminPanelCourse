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
import ListItem from "./ListItem"
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage"
import { add } from "react-native-reanimated";
import EasyButton from "../../shared/StyledComponents/EasyButton"
import { useFocusEffect } from "@react-navigation/native"
import Icon from "react-native-vector-icons/FontAwesome"
import { Header, Item, Input } from "native-base"
var { width , height } = Dimensions.get("window")

//here where all courses info appear you can long press so you can delete or edit any of these course with style of the list come form list item file next

const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600"  , marginLeft:40}}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" , marginLeft:20}}>Category</Text>
      </View>
      <View style={{  marginLeft: -20,
    width:100}}>
        <Text style={{ fontWeight: "600" , marginLeft:60}}>Price</Text>
      </View>
    </View>
  );
};
const Courses = (props) => {
  const [CourseList, setCourseList] = useState();
  const [CourseFilter, setCourseFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  useFocusEffect(
    useCallback(() => {
      // Get Token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      axios.get(`${baseURL}courses`).then((res) => {
        setCourseList(res.data);
        setCourseFilter(res.data);
        setLoading(false);
      });

      return () => {
        setCourseList();
        setCourseFilter();
        setLoading(true);
      };
    }, [])
  );

  const searchCourses = (text) => {
    if (text == "") {
      setCourseList(CourseList);
    }
    setCourseList(
      CourseList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const deleteCourse = (id) => {
    axios
      .delete(`${baseURL}courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const courses = CourseFilter.filter((item) => item.id !== id);
        setCourseFilter(courses);
      })
      .catch((error) => console.log(error));
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate("Users")}
        >
          <Icon name="user" size={18} color="white" />
          <Text style={styles.buttonText}>Users</Text>
        </EasyButton>
        <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate("CourseForm")}
        >
          <Icon name="plus" size={18} color="white" />
          <Text style={styles.buttonText}>Courses</Text>
        </EasyButton>
        <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate("Categories")}
        >
          <Icon name="plus" size={18} color="white" />
          <Text style={styles.buttonText}>Categories</Text>
        </EasyButton>

        <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate("AddQuestions")}
        >
          <Icon name="plus" size={18} color="white" />
          <Text style={styles.buttonText}>Questions</Text>
        </EasyButton>
      </View>
      <View>
        <Header searchBar rounded>
          <Item style={{ padding: 5 }}>
            <Icon name="search" />
            <Input
              placeholder="Search"
              onChangeText={(text) => searchCourses(text)}
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
          data={CourseFilter}
          ListHeaderComponent={ListHeader}
          renderItem={({ item, index }) => (
            <ListItem
              {...item}
              navigation={props.navigation}
              index={index}
              delete={deleteCourse}
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
    flexDirection: "row",
    padding: 1,
    backgroundColor: "gainsboro",
  },
  headerItem: {
    marginLeft: 20,
    width:120,
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    marginBottom: 160,
    backgroundColor: "white",
  },
  buttonContainer: {
    margin: 20,
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonText: {
    marginLeft: 4,
    color: "white",
  },
});
export default Courses;
