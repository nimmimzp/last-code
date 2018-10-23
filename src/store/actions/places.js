import { AsyncStorage } from 'react-native';
import { SET_PLACES, REMOVE_PLACE,AUTH_LOGIN_USER,REMOVE_USER } from './actionTypes';
import { uiStartLoading,uiStopLoading, authGetToken, authGetUserId, authUserKey } from './index';
import * as firebase from 'firebase';
import _ from 'lodash';
const firebaseConfig = {
    apiKey: "AIzaSyBhUyFsb_fRSct-Aw_plWtNxOfWCY4XPig",
    authDomain: "react-native-1536905661123.firebaseapp.com",
    databaseURL: "https://react-native-1536905661123.firebaseio.com",
    projectId: "react-native-1536905661123",
    storageBucket: "react-native-1536905661123.appspot.com",   
}


const firebaseApp = firebase.initializeApp(firebaseConfig);
const userRef  = firebase.database().ref("users");
export const addPlace = (firstName,image,lastName,birthday,phonenumber) => {
    let authToken
    let authUserId
    return  dispatch => {   
        dispatch(uiStartLoading());
        dispatch(authGetUserId())
            .catch(err => {
                alert('Invalid User Id')
            })
            .then(userId =>{
                authUserId = userId;
                dispatch(authGetToken())
                    .catch(err => {
                        console.log("Invalid Token")
                    })
                    .then(token => {
                        authToken = token
                        fetch("https://us-central1-react-native-1536905661123.cloudfunctions.net/storeImage",{
                            method:"POST",
                            body:JSON.stringify({
                                image:image.base64
                            }),
                            headers:{
                                "Authorization": "Bearer " + token
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            alert("Something went wrong, please try again!");
                            dispatch(uiStopLoading());
                        })
                        .then(res => res.json())
                        .then(imageRes => {
                            console.log(imageRes)
                        })
                    })
                })
                .catch(err => {
                    dispatch(uiStopLoading());
                    console.warn(err);
                })
    }
};


export const getUser = (filter, remainUserData = null) => {
    
    return dispatch => {
        dispatch(authUserKey())
            .then(loggedInUserKey => {
                userRef.on('value',(snap) =>{
                    let userData = [];
                    snap.forEach((child) => {
                        userKey = child.key;
                        if((filter.userId !== child.val().userId) && (filter.userGender !== child.val().gender)){
                            userData.push({
                                userKey:child.key, 
                                firstName: child.val().firstName,
                                lastName: child.val().lastName,
                                image:{
                                    uri:child.val().image
                                },
                                birthday: child.val().birthday,
                                key: child.key,
                                height:child.val().height,
                                gender:child.val().gender,
                                birthday:child.val().birthday,
                                education:child.val().education,
                                marriedStatus:child.val().marriedStatus,
                                state:child.val().state,
                                city:child.val().city,
                                pincode:child.val().pincode,
                                religion: child.val().religion,
                                motherTounge: child.val().motherTounge,
                                caste: child.val().caste,
                                requestId:""
                            })   
                        }  
                    })
                    dispatch(setPlaces(userData));
                    let userFriend = userRef.child(loggedInUserKey).child('friendList');
                    userFriend.on('value',(friendSnap) =>{
                        friendSnap.forEach((friendChild) => {
                            dispatch(removeUser(friendChild.val().friend))
                            // for (var friendkey in userData){
                                
                            //     if(userData[friendkey].userKey === friendChild.val().friend){
                            //         userData = _.omit(userData,friendkey);
                            //     }
                            // }
                        })
                    })
                   
                    let userSendRequest = userRef.child(loggedInUserKey).child('requestedUserData');
                    userSendRequest.on('value',(sendRequestSnap) =>{
                        sendRequestSnap.forEach((sendRequestChild)=>{
                            dispatch(removeUser(sendRequestChild.val().requestedUser))
                            // for (var sentRequestkey in userData){
                            //     if(userData[sentRequestkey].userKey === sendRequestChild.val().requestedUser){
                                    
                            //         userData = _.omit(userData,sentRequestkey);
                            //     }
                            // }
                        })
                    })
                    
                    let userReceiveRequest = userRef.child(loggedInUserKey).child('requestedByUserData');
                    userReceiveRequest.on('value',(receiveRequestSnap) =>{
                        receiveRequestSnap.forEach((receiveRequestChild)=>{
                            dispatch(removeUser(receiveRequestChild.val().requestedById))
                            // for (var receiveRequestkey in userData){
                                
                            //     if(userData[receiveRequestkey].userKey === receiveRequestChild.val().requestedById){
                            //         userData = _.omit(userData,receiveRequestkey);
                            //     }
                            // }
                        })
                    })
                    
                })
            })
            .catch(() => {
                alert("No Valid Token");
            }) 
    }
}

export const setPlaces = places =>{
    return{
        type: SET_PLACES,
        places:places
    }
}

export const deletePlace = (key) => {
    
    return dispatch=>{
        dispatch(authGetToken())
            .catch(()=>{
                alert("Invalid Token");
            })
            .then(token => {

                dispatch(removeUser(key));
                return fetch("https://react-native-1536905661123.firebaseio.com/users/"+key+".json?auth="+token,{
                    method:"DELETE"
                })
            })            
            .then(res => res.json())
            .then(parsedRes => { 
                Console.log("Deleted")
            })
            .catch(err => {
                alert("Something went wrong");
                console.log(err)
            });
    }
};


export const removeUser = key => {
    return {
        type : REMOVE_USER,
        key: key
    }
};


export const setLoginUser = userData => {
    return {
        type : AUTH_LOGIN_USER,
        userData: userData
    }
};

export const getUserLoginData = () => {
    return dispatch =>{
        dispatch(authGetUserId())
            .catch(err => {
                console.log("Invalid User Id")
            })
            .then(authUserId => {
                
                let userDetail = userRef.orderByChild("userId").equalTo(authUserId);
                userDetail.on('value',(snap) =>{
                    let userData = [];
                    snap.forEach((child) => {
                        userData.push({
                            firstName: child.val().firstName,
                            lastName: child.val().lastName,
                            image:{
                                uri:child.val().image
                            },
                            phonenumber: child.val().phonenumber,
                            birthday: child.val().birthday,
                            key: child.key,
                            userId:child.val().userId
                        })
                    })
                    dispatch(setLoginUser(userData))
                })
            })
    }
};


export const addUserDetail = (firstName,lastName,city,state,phonenumber) => {
    let authUserId;
    return dispatch =>{
        dispatch(uiStartLoading());
        dispatch(authGetUserId())
            .catch(err=>{
                console.log(err)
            })
            .then(userId=>{
                console.log(userId)
            })
    }
}