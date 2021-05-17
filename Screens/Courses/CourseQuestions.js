import React, { useState, useEffect ,useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Image,
  View,
  StyleSheet,
  Text,
  Button,
  Dimensions,
} from "react-native";
import baseURL from "../../assets/common/baseUrl";
import Toast from "react-native-toast-message";
import axios from "axios";
import color from "color";
import * as Progress from 'react-native-progress';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const CourseQuestions = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion , setCurrentQuestion]= useState(0);
  const [currentQuestionNumber , setCurrentQuestionNumber]= useState(1);
  const [currentProgress , setCurrentProgress ]= useState(0.0);
  const [currentScore , setCurrentScore] = useState(0);
  const [showScore , setShowScore] = useState(false)

  const handleAnsweButtonClick = () =>{
    const nextQuestion = currentQuestion +1 ;
    const nextProgress =  currentProgress +0.4;
    const nextNumber = currentQuestionNumber+1
    if(nextQuestion < questions.length){
      setCurrentQuestion(nextQuestion);
    setCurrentScore(nextQuestion);
    setCurrentProgress(nextProgress);
    setCurrentQuestionNumber(nextNumber);
    }
    else{
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: ` Congrats your score is ${currentScore} `,
        text2: "Go to View the course"
    })
    setCurrentProgress(nextProgress);
    }
    
  }
  useFocusEffect(
    useCallback(() => {
     
     
   



  axios
    .get(`${baseURL}questions`)
    .then((res) => {
     setQuestions(res.data);
     setAnswers(res.data)
console.log(questions);
     
      
    })
    .catch((error) => {
      console.log("Api call error");
    });

  return () => {
    setQuestions([]);
    setAnswers([]);
  
    
   
  }
    }, [])
  );




return (

    <View style={styles.questions}>
      
      <Progress.Bar progress={currentProgress} width={300} />
        <View style={styles.scoreSection}>
     <Text style={styles.scoreSectionText}>You scored {currentScore} out of {questions.length}</Text>   
        </View>
      
       
        
          <View style={styles.questionSection}>
            <View style={styles.questionCount}>
              <Text style={styles.questionCountText}>Question {currentQuestionNumber} </Text>
              
      
            </View>
            <View style={styles.wrapperQuestionSection}>
            <View style={styles.questionText}>
      

        
           <Text  style={styles.questionTextProp} >{questions[currentQuestion]?.text}</Text>

        
            </View>
            <View style={styles.answerSection}>

          {answers.map((ans,index)=>{
          
          return(
           <View style={styles.buttonView}>  
          <Button 
          key={index}
          title={`${ans.answers[currentQuestion]}`}
          color="#ff5c5c"
          onPress={handleAnsweButtonClick}
          />
          </View>
          )})}
             
          </View>
          </View>
          </View>
          
     
     
    </View>
     


  );  

}


    


const styles = StyleSheet.create({
  questions: {
    backgroundColor: "#272e4e",
    width: width,
    minHeight: height,
    borderRadius: 15,
    height: height,
    padding: 20,
    justifyContent: "space-evenly",
    flex: 1,
  },

  wrapperQuestionSection:{
backgroundColor:'white',
marginTop:-650 ,
width:375 ,
height:480 ,
marginLeft:-10 ,
borderRadius:10


  } ,
questionText:{
marginTop:50 ,
marginLeft:50 ,



} ,
questionTextProp:{
fontSize:18
},
  buttonView:{
    width: 200,
    minHeight: 50,
   
    height: 30,
   marginTop:40 ,
    marginLeft:80
  } ,
  
  scoreSection: {
    flex: 1,
 
   width:200 ,
  
    alignItems: "center",
  },

  scoreSectionText:{
fontSize:20 ,
color:'#8296aa'
  } ,
  questionSection: {
    width: 20,
    position: "relative",
 
  },

  questionCount: {
    width: 100,
marginLeft:5 ,
marginBottom:20,
marginTop:-680

  },
  questionCountText: {
      fontSize:20 ,
      color:'#8296aa'
   
      
  },
 
  answerSection: {
   width:100 ,
   flex:1 ,
   marginTop:20
   
  },


});

export default CourseQuestions;
