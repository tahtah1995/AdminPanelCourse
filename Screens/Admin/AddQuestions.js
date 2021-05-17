import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../shared/Form/FormContainer";
import Input from "../../shared/Form/Input";
import Error from "../../shared/Error";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import Toast from "react-native-toast-message";

const AddQuestion = (props) => {
   
   {/* here we add all the questions of the new course and set to the database */}
    const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [answers, setAnswers] = useState(['']);
  const [error, setError] = useState("");
  const registerQuestion = () => {
    if (text === "" || answers=== "") {
      setError("Please fill in the form correctly");
    }

    let question = {
      text: text,
      answers:answers
    };
    axios
      .post(`${baseURL}questions`,question)
      .then((res) => {
        if (res.status == 200) {
            console.log(question);
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "New Question Added Succeeded",
            text2: "Please see new questions",
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
  };
  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >

       {/* the form where we write question text and answers and send it back to database  */}
      <FormContainer title={"question"} onPress={() => registerQuestion()}>
     
        <Input
          placeholder={"text"}
          name={"text"}
          id={"text"}
          onChangeText={(text) => setText(text)  }
        />

        <Input
          placeholder={"first answer"}
          name={"first answer"}
          id={"first answer"}
        
          onChangeText={(text) => setAnswers(text) }
        />

<Input
          placeholder={"second answer"}
          name={"second answer"}
          id={"second answer"}
          onChangeText={(text) => setAnswers(text)}
        />
        <Input
          placeholder={"third answer"}
          name={"third  answer"}
          id={"third  answer"}
        
          onChangeText={(text) => setAnswers(text) }
        />

        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>

        <View style={{ margin: 10 }}>
          <Button title={"Add Question"} onPress={() => registerQuestion() }/>
        </View>
      
      </FormContainer>
    </KeyboardAwareScrollView>
    
  );
  
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    margin: 10,
    alignItems: "center",
  },
});
export default AddQuestion;