import jwt_decode from "jwt-decode"
import AsyncStorage from "@react-native-community/async-storage"
import Toast from "react-native-toast-message"
import baseURL from "../../assets/common/baseUrl"


export const SET_CURRENT_USER = "SET_CURRENT_USER";

  {/* here is all the authrization system happen and work the login  and getting the token to enter

Through reducers and actions that help fetch the data and token

*/}
export const loginUser = (user , dispatch) =>{
    fetch(`${baseURL}users/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data) {
            const token = data.token;
            AsyncStorage.setItem("jwt", token)
            const decoded = jwt_decode(token)
            dispatch(setCurrentUser(decoded, user))
        } else {
           logoutUser(dispatch)
        }
})
.catch((err) => {
    Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please provide correct credentials",
        text2: ""
    });
    logoutUser(dispatch)
});
}
 {/* getting authrization to the profile after login */}
export const getUserProfile = (id) => {
    fetch(`${baseURL}users/${id}`, {
        method: "GET",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
}


{/* Changing current user to null until other come throgh our reducer */}
export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("jwt");
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded, user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}