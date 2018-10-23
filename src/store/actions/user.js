import React, { Component } from "react";
import {
    Alert
} from "react-native";
import { AsyncStorage } from 'react-native';
import { SET_USER_INTREST,REMOVE_INTREST_REQUEST,SET_USER_RECEIVED_INTREST, REMOVE_USER_RECEIVED_INTREST, SET_USER_MATCH } from './actionTypes';
import { Navigation } from "react-native-navigation";
import { uiStartLoading,uiStopLoading, authGetToken, authGetUserId,authSetLoginUser,authUserKey, setPlaces, removeUser } from './index';
import startMainTabs, {matchTabs} from '../../screens/MainTabs/startMainTabs'
import * as firebase from 'firebase';

import _ from 'lodash';

const firebaseConfig = {
    apiKey: "AIzaSyBhUyFsb_fRSct-Aw_plWtNxOfWCY4XPig",
    authDomain: "react-native-1536905661123.firebaseapp.com",
    databaseURL: "https://react-native-1536905661123.firebaseio.com",
    projectId: "react-native-1536905661123",
    storageBucket: "react-native-1536905661123.appspot.com",   
}


//const firebaseApp1 = firebase.initializeApp(firebaseConfig);
const userRef  = firebase.database().ref("users");


export const addUserInfo = (updatedUserData,userStateData,userReligionData) => {
    let authUserId;
    let saveUserData;
    let authToken;
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
                        console.log('Auth Token not found')
                    })
                    .then(authToken => {
                        authToken = authToken;
                        
                        let userDetail = userRef.orderByChild("userId").equalTo(authUserId);
                        userDetail.once('value',(snap) =>{
                            let userData = [];
                            snap.forEach((child) => {
                                userData.push({
                                    firstName: child.val().firstName,
                                    lastName: child.val().lastName,
                                    key: child.key
                                })
                            })
                            saveUserData = {
                                firstName:updatedUserData.firstName,
                                lastName:updatedUserData.lastName,
                                phonenumber:updatedUserData.phonenumber,
                                height:updatedUserData.height,
                                gender:updatedUserData.gender,
                                birthday:updatedUserData.birthday,
                                education:updatedUserData.education,
                                marriedStatus:updatedUserData.marriedStatus,
                                state:userStateData.state,
                                city:userStateData.city,
                                pincode:userStateData.pincode,
                                religion: userReligionData.religion,
                                motherTounge: userReligionData.motherTounge,
                                caste: userReligionData.caste,
                                userId:authUserId
        
                            }
                            if(userData.length === 0){
                        
                                return fetch("https://react-native-1536905661123.firebaseio.com/users.json?auth=" + authToken,{
                                    method:"POST",
                                    body:JSON.stringify(saveUserData)
                                })
                            }else{
                                return firebase.database().ref('users/' + userData[0].key).update(saveUserData);
                                
                            }
                        })
                    })
                    .then(parsedRes => {
                        dispatch(uiStopLoading());
                        Navigation.startSingleScreenApp({
                            screen: {
                                screen: "FYP.UploadProfile",
                                title: "Upload A Profile Picture"
                            },
                            passProps:{
                                userId:authUserId,
                            }
                        });
                    })
            })
            .catch(err => {
                dispatch(uiStopLoading());
                console.warn(err);
            });     
    }
};


export const updateProfile = (image,userId) => {
    

    
    let authToken
    return  dispatch => {
        dispatch(uiStartLoading());
        dispatch(authGetToken())
            .catch(err => {
                alert('Invalid token ')
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
                    let imageUrl = imageRes.imageUrl;
                    let userDetail = userRef.orderByChild("userId").equalTo(userId);
                    userDetail.once('value',(snap) =>{
                        let userData = [];
                        snap.forEach((child) => {
                            userData.push({
                                key: child.key
                            })
                        })
                        userUpdatedData = {
                            image:imageUrl
                        }
                        return firebase.database().ref('users/' + userData[0].key).update(userUpdatedData);
                    })
                })
                .then(parsedRes =>{
                    dispatch(uiStopLoading());
                    let userDetail = userRef.orderByChild("userId").equalTo(userId);
                    userDetail.once('value',(snap) =>{
                        let userData = [];
                        snap.forEach((child) => {
                            userData.push({
                                firstName: child.val().firstName,
                                lastName: child.val().lastName,
                                phonenumber:child.val().phonenumber,
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
                                key: child.key
                            })
                            
                        })
                        dispatch(authSetLoginUser(userData));
                        startMainTabs(userData);
                    })
                })               
            })
    }
};



export const updateUser = (userData) => {
    return  dispatch => {   
        dispatch(uiStartLoading());
        dispatch(authGetUserId())
            .catch(err => {
                console.log("Invalid")
            })
            .then(userId => {
                firebase.database().ref('users/' + userData.key).update(userData)
                .then(parsedRes =>{
                    dispatch(uiStopLoading());
                    Alert.alert(
                        'Profile Updated',
                        "",
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ]
                        
                    )
                })
                
            })
    }
}



export const requestUser = (requestedToDetail,requestByDetail) => {
    return (dispatch,getState) => {
        dispatch(authGetUserId())
            .catch(err => {
                console.log('Userid not found');
            })
            .then(userId => {

                firebase.database().ref('users/' + requestByDetail.requestedById +'/requestedUserData').push(requestedToDetail)
                    .then(updateRes => {
                        firebase.database().ref('users/' + requestedToDetail.requestedUser +'/requestedByUserData').push(requestByDetail)
                            .then(updateRes1=>{
                                dispatch(removeUser(requestedToDetail.requestedUser))
                                
                            })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    })
                    .catch(err =>{
                        console.log(err)
                    })
    }
};

export const openMatchTab = (requestedUser = null,
    receivedFromUser = null, allYourMatched = null) => {
    let authLoggedInUserKey;
    return (dispatch,getState) => {
        dispatch(authUserKey())
            .catch(err => {
                console.log("User Key is not define");
            })
            .then(userKey => {

                authLoggedInUserKey = userKey;

                let sentRequestDetail = userRef.child(authLoggedInUserKey).child('requestedUserData');
                sentRequestDetail.once('value',(sentRequestDetailSnap) => {
                    requestedUser = [];
                    sentRequestDetailSnap.forEach((sentRequestDetailChild) => {
                        let requestedUserKey = sentRequestDetailChild.val().requestedUser;
                        let requestedUserDetail = userRef.orderByKey().equalTo(requestedUserKey);
                        requestedUserDetail.once('value',(requestedUserDetailSnap)=>{
                            requestedUserDetailSnap.forEach((requestedUserDetailChild)=>{
                                requestedUser.push({
                                    firstName: requestedUserDetailChild.val().firstName,
                                    lastName: requestedUserDetailChild.val().lastName,
                                    image:{
                                        uri:requestedUserDetailChild.val().image
                                    },
                                    birthday: requestedUserDetailChild.val().birthday,
                                    key: requestedUserDetailChild.key,
                                    height:requestedUserDetailChild.val().height,
                                    gender:requestedUserDetailChild.val().gender,
                                    birthday:requestedUserDetailChild.val().birthday,
                                    education:requestedUserDetailChild.val().education,
                                    marriedStatus:requestedUserDetailChild.val().marriedStatus,
                                    state:requestedUserDetailChild.val().state,
                                    city:requestedUserDetailChild.val().city,
                                    pincode:requestedUserDetailChild.val().pincode,
                                    religion: requestedUserDetailChild.val().religion,
                                    motherTounge: requestedUserDetailChild.val().motherTounge,
                                    caste: requestedUserDetailChild.val().caste,
                                    requestId:sentRequestDetailChild.key
                                })
                            })
                        })
                    })
                })
                dispatch(setUserIntrest(requestedUser))

                //Get All received match 
                let receivedRequestDetail = userRef.child(authLoggedInUserKey).child('requestedByUserData');
                receivedRequestDetail.once('value',(receivedRequestDetailSnap) => {
                    receivedFromUser = [];
                    receivedRequestDetailSnap.forEach((receivedRequestDetailChild) => {
                        let receivedUserKey = receivedRequestDetailChild.val().requestedById;
                        let receivedByUserDetail = userRef.orderByKey().equalTo(receivedUserKey);
                        receivedByUserDetail.once('value',(receivedUserDetailSnap)=>{
                            receivedUserDetailSnap.forEach((receivedUserDetailChild)=>{
                                receivedFromUser.push({
                                    firstName: receivedUserDetailChild.val().firstName,
                                    lastName: receivedUserDetailChild.val().lastName,
                                    image:{
                                        uri:receivedUserDetailChild.val().image
                                    },
                                    birthday: receivedUserDetailChild.val().birthday,
                                    key: receivedUserDetailChild.key,
                                    height:receivedUserDetailChild.val().height,
                                    gender:receivedUserDetailChild.val().gender,
                                    birthday:receivedUserDetailChild.val().birthday,
                                    education:receivedUserDetailChild.val().education,
                                    marriedStatus:receivedUserDetailChild.val().marriedStatus,
                                    state:receivedUserDetailChild.val().state,
                                    city:receivedUserDetailChild.val().city,
                                    pincode:receivedUserDetailChild.val().pincode,
                                    religion: receivedUserDetailChild.val().religion,
                                    motherTounge: receivedUserDetailChild.val().motherTounge,
                                    caste: receivedUserDetailChild.val().caste,
                                    requestedById:receivedRequestDetailChild.key
                                })
                            })
                        })
                    })
                })
                dispatch(setUserReceivedIntrest(receivedFromUser))
                dispatch(allUserMatched())
                matchTabs();
            })   
    }
}
   

export const cancelIntrestRequest = (requestedToDetail,requestByDetail) =>{

    return dispatch => {
        
        firebase.database().ref('users/' + requestByDetail.requestedById +'/requestedUserData/'+requestedToDetail.requestedId).remove()
            .then(delRes => {
                let requestUserID = requestedToDetail.requestedUser;
                let userDetail = userRef.child(requestUserID).child('requestedByUserData'); 
                userDetail.once('value',(snap) =>{
                    snap.forEach((child) => {
                        if(child.val().requestedById===requestByDetail.requestedById){
                            firebase.database().ref('users/' + requestUserID +'/requestedByUserData/'+child.key).remove()
                                .then(delRes => {
                                    dispatch(removeIntrestRequest(requestedToDetail.requestedUser))
                                })
                                .catch(err => console.log(err))
                        }
                    })
                })
            })
    }
}


export const cancelReceivedRequest = (receivedByDetail,userId) => {
    return dispatch => {
       
        firebase.database().ref('users/' + userId +'/requestedByUserData/'+receivedByDetail.requestedById).remove()
            .then(delRes =>{
                let sentByUserID = receivedByDetail.sentBy;
                let userDetail = userRef.child(sentByUserID).child('requestedUserData');
                userDetail.once('value',(snap) =>{
                    snap.forEach((child) => {
                        if(child.val().requestedUser === userId){
                            firebase.database().ref('users/' + sentByUserID +'/requestedUserData/'+child.key).remove()
                                .then(delRes1 => {
                                    dispatch(removeUserReceivedIntrest(receivedByDetail.sentBy));
                                })
                                .catch(err => console.log(err))
                        }
                        
                    })
                })
            })
    }
}

export const acceptUserRequest = (receivedByDetail,userId) => {
    return dispatch => {
        
       

        let friendDetail = {
            friend:receivedByDetail.sentBy
        }
        firebase.database().ref('users/' + userId +'/friendList').push(friendDetail)
        .then(aceptRes => {
            dispatch(cancelReceivedRequest(receivedByDetail,userId))
            let friendDetail1 = {
                friend:userId
            }
            let sentByUserId = receivedByDetail.sentBy;
            firebase.database().ref('users/' + sentByUserId +'/friendList').push(friendDetail1)
            .then(res2 => {
                dispatch(allUserMatched())
                
                
            })
            .catch(error=>{
                console.log(error)
            });

        })
        .catch(err => {
            console.log(err)
        });
    }
    
};

export const setUserIntrest = (userIntrest) => {
    return {
        type : SET_USER_INTREST,
        setUserIntrest: userIntrest
    }
};

export const removeIntrestRequest = (key) => {
    return {
        type : REMOVE_INTREST_REQUEST,
        userKey : key
    }
};

export const setUserReceivedIntrest = (userReceivedIntrest) => {
    return {
        type : SET_USER_RECEIVED_INTREST,
        setUserReceivedRequest : userReceivedIntrest
    }
};

export const removeUserReceivedIntrest = (key) => {
    return {
        type : REMOVE_USER_RECEIVED_INTREST,
        userKey : key
    }
};

export const allUserMatched = (allYourMatched = null) => {
    return dispatch =>{
        let authLoggedInUserKey;
        dispatch(authUserKey())
            .catch(err => {
                console.log("User Key is not define");
            })
            .then(userKey => {
                let userFriendDetail = userRef.child(userKey).child('friendList');
                userFriendDetail.on('value',(allYourMatchedsnap) =>{
                    allYourMatched = [];
                    allYourMatchedsnap.forEach((friendChild) => {
                        let friendId = friendChild.val().friend
                        let friendDetail = userRef.orderByKey().equalTo(friendId);
                        friendDetail.on('value',(allYourMatchedsnap2)=>{
                            
                            allYourMatchedsnap2.forEach((child2) => {
                                allYourMatched.push({
                                    firstName: child2.val().firstName,
                                    lastName: child2.val().lastName,
                                    image:{
                                        uri:child2.val().image
                                    },
                                    birthday: child2.val().birthday,
                                    phonenumber: child2.val().phonenumber,
                                    key: child2.key,
                                    height:child2.val().height,
                                    gender:child2.val().gender,
                                    education:child2.val().education,
                                    marriedStatus:child2.val().marriedStatus,
                                    state:child2.val().state,
                                    city:child2.val().city,
                                    pincode:child2.val().pincode,
                                    religion: child2.val().religion,
                                    motherTounge: child2.val().motherTounge,
                                    caste: child2.val().caste
                                });
                                
                            })
                        })
                   });
                });
                dispatch(setUserMatch(allYourMatched))
            }) 
    }  
};

export const setUserMatch = (allYourMatched) => {
    return {
        type : SET_USER_MATCH,
        allYourMatch : allYourMatched
    }    
}

