import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Item, Picker } from "native-base";
import FormContainer from "../../shared/Form/FormContainer";
import Input from "../../shared/Form/Input";
import EasyButton from "../../shared/StyledComponents/EasyButton";
import Error from "../../shared/Error";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-community/async-storage";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import { ScrollView } from "react-native-gesture-handler";

const CourseForm = (props) => {
  const [pickerValue, setPickerValue] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [err, setError] = useState();
  const [isFeatured, setIsFeature] = useState(false);
  const [item, setItem] = useState(null);
//here we set all data needed to create course from images and name and price and add them to courses datbase
  useEffect(() => {
    if (!props.route.params) {
      setItem(null);
    } else {
      setItem(props.route.params.item);
      setName(props.route.params.item.name);
      setPrice(props.route.params.item.price.toString());
      setMainImage(props.route.params.item.image);
      setImage(props.route.params.item.image);
      setCategory(props.route.params.item.category._id);
    }

    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    // Categories
    axios
      .get(`${baseURL}categories`)
      .then((res) => setCategories(res.data))
      .catch((error) => alert("Error to load categories"));

    // Image Picker
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();

    return () => {
      setCategories([]);
    };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setMainImage(result.uri);
      setImage(result.uri);
    }
  };

  const addCourse = () => {
    if (name == "" || price == "" || category == "") {
      setError("Please fill in the form correctly");
    }


    let formData = new FormData();

    const newImageUri = "file:///" + image.split("file:/").join("");

    formData.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("isFeatured" , isFeatured);
    

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    if (item !== null) {
      axios
        .put(`${baseURL}courses/${item.id}`, formData, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Course successfuly updated",
              text2: "",
            });
            setTimeout(() => {
              props.navigation.navigate("Courses");
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
        .post(`${baseURL}courses`, formData, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "New Course added",
              text2: "",
            });
            setTimeout(() => {
              props.navigation.navigate("Courses");
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
    <ScrollView>
    <FormContainer title="Add Course">
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: mainImage }} />
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <Icon style={{ color: "white" }} name="camera" />
        </TouchableOpacity>
      </View>

      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Name</Text>
      </View>
      <Input
        placeholder="Name"
        name="name"
        id="name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Price</Text>
      </View>
      <Input
        placeholder="Price"
        name="price"
        id="price"
        value={price}
        keyboardType={"numeric"}
        onChangeText={(text) => setPrice(text)}
      />

 <View style = {{width:100 , height:100}}>
        <Picker
          mode="dropdown"
          iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
      style={{ width:(Platform.OS === 'ios') ? undefined : 120 }} 
          placeholder="Select your Category"
          selectedValue={pickerValue}
          placeholderStyle={{ color: "#007aff" }}
          placeholderIconColor="#007aff"
          onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
        >
        
          {categories.map((c) => {
            return <Picker.Item key={c.id} label={c.name} value={c.id} />;
          })}
        </Picker>
        </View>
      
    
      {err ? <Error message={err} /> : null}
      <View style={styles.buttonContainer}>
        <EasyButton large primary onPress={() => addCourse()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </EasyButton>
      </View>
    </FormContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    width: "80%",
    marginTop: 10,
  },
  buttonContainer: {
    
    marginBottom: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#E0E0E0",
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "grey",
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
});

export default CourseForm;
