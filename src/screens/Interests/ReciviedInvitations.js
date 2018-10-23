import React, {Component} from 'react';
import { connect } from "react-redux";
import PlaceList from "../../components/PlaceList/PlaceList";
import {Text} from "react-native";
import {cancelReceivedRequest,acceptUserRequest} from '../../store/actions/index';
class ReceiveRequestScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: "orange"
    };
    constructor(props) {
		super(props);
        console.ignoredYellowBox = ['Setting a timer' ];
        
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
       
    }

    onNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    };
    userSelectedHandler = (key) =>{
        const selUser = this.props.userReceivedIntrest.find(user => {
            return user.key === key;
        });
       
        this.props.navigator.push({
            screen: "awesome-places.PlaceDetailScreen",
            title: selUser.firstName+' '+selUser.lastName,
            passProps: {
                selectedUser: selUser,
                loggedinUser: this.props.loginUser[0].key,
                buttonText:"Accept",
                cancelRequest:this.cancelRequest,
                acceptRequest:this.acceptRequest
            }
        });
    }

    cancelRequest = (receivedByDetail,loggedinUser) => {
        this.props.cancelUserRequest(receivedByDetail,loggedinUser)
    }
    acceptRequest = (receivedByDetail,loggedinUser) => {
        this.props.acceptUserRequest(receivedByDetail,loggedinUser);
    }
    render () {
        if(this.props.userReceivedIntrest.length>0){
            return <PlaceList
            users={this.props.userReceivedIntrest}
            onItemSelected={this.userSelectedHandler}
        />
        }
        return <Text>You haven't received request</Text>;
    }
}

const mapDispatchToProps = dispatch => {
    return{
        cancelUserRequest: (receivedByDetail,loggedinUser) => dispatch(cancelReceivedRequest(receivedByDetail,loggedinUser)),
        acceptUserRequest: (receivedByDetail,loggedinUser) => dispatch(acceptUserRequest(receivedByDetail,loggedinUser))
    }
}
  
const mapStateToProps = state => {
    
    return {
        userReceivedIntrest : state.user.userReceivedRequest,
        loginUser: state.user.loginUser
    };
}; 

  
export default connect(mapStateToProps,mapDispatchToProps)(ReceiveRequestScreen);