import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import CoursesList from "./CoursesList";
import { Container, Header, Icon, Item, Input, Text } from "native-base";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import { SearchBar } from "react-native-elements";
import SearchedCourses from "./SearchedCourses";
import Banner from "../../shared/Banner";
import CategoryFilter from "./CategoryFilter";


var { height } = Dimensions.get("window");

const CourseContainer = (props) => {
  const [Courses, setCourses] = useState([]);
  const [CoursesFiltered, setCoursesFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState([]);
  const [CoursesCtg, setCoursesCtg] = useState([]);
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);
      axios
    .get(`${baseURL}categories`)
    .then((res) => {
      setCategories(res.data);
    })
    .catch((error) => {
      console.log("Api call error");
    });

  //categories

  axios
    .get(`${baseURL}courses`)
    .then((res) => {
      setCourses(res.data);
      setCoursesFiltered(res.data);
      setCoursesCtg(res.data);
      setInitialState(res.data);
      setLoading(false);
    })
    .catch((error) => {
      console.log("Api call error");
    });

  return () => {
    setCourses([]);
    setCoursesFiltered([]);
    setFocus();
    setCategories([]);
    setActive();
    setInitialState();
  }
    }, [])
  );

  //Courses

  

  const searchCourse = (text) => {
    setCoursesFiltered(
     Courses.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  {
    /*Categories*/
  }
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setCoursesCtg(initialState), setActive(true)]
        : [
          setCoursesCtg(
             courses.filter((i) => i.category._id === ctg),

              setActive(true)
            ),
          ];
    }
  };

  return (
    <>
    {loading == false ? (

<Container>
      <SearchBar
        placeholder="Type Here..."
        onFocus={openList}
        onChangeText={(text) => searchCourse(text)}
        cancelButtonTitle="Cancel"
        platform="android"
        onCancel={onBlur}
      ></SearchBar>

      {focus == true ? (
        <SearchedCourses
        CoursesFiltered={CoursesFiltered}
          navigation={props.navigation}
        />
      ) : (
        <ScrollView>
          <View>
            <View>
              <Banner />
            </View>
            <View>
              <CategoryFilter
                categories={categories}
                categoryFilter={changeCtg}
                CoursesCtg={CoursesCtg}
                active={active}
                setActive={setActive}
              />
            </View>
            {CoursesCtg.length > 0 ? (
              <View style={styles.listContainer}>
                {CoursesCtg.map((item) => {
                  return (
                    <CoursesList
                      key={item.name}
                      item={item}
                      navigation={props.navigation}
                    />
                  );
                })}
              </View>
            ) : (
              <View style={[styles.center, { height: height / 2 }]}>
                <Text>No Courses found</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </Container>
    ):(

      <Container style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
      <ActivityIndicator size="large" color="red" />
    </Container>
  )}
 </>
);
};
const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  listContainer: {
    height: 1800,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
export default CourseContainer;
