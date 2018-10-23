import React, {Component} from 'react';
import { connect } from "react-redux";
import {Text} from "react-native";
import PlaceList from "../../components/PlaceList/PlaceList";
import {cancelIntrestRequest} from '../../store/actions/index';
class SendInterestScreen extends Component {
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
        const selUser = this.props.userIntrest.find(user => {
            return user.key === key;
        });
       
        this.props.navigator.push({
            screen: "awesome-places.PlaceDetailScreen",
            title: selUser.firstName+' '+selUser.lastName,
            passProps: {
                selectedUser: selUser,
                loggedinUser: this.props.loginUser[0].key,
                buttonText:"Cancel",
                manageUserRequest:this.cancelRequest
            }
        });
    }

    cancelRequest = (requestedToDetail,requestByDetail) => {
        this.props.cancelUserRequest(requestedToDetail,requestByDetail)
    }
    render () {
        if(this.props.userIntrest.length>0){
            return <PlaceList
            users={this.props.userIntrest}
            onItemSelected={this.userSelectedHandler}
            />
        }
        return <Text>You haven't sent any request</Text>
     
    }
}

const mapDispatchToProps = dispatch => {
    return{
        cancelUserRequest: (requestedToDetail,loggedinUser) => dispatch(cancelIntrestRequest(requestedToDetail,loggedinUser))
    }
};

const mapStateToProps = state => {
    
    return {
        userIntrest : state.user.userIntrest,
        loginUser: state.user.loginUser
    };
};
  

  
export default connect(mapStateToProps,mapDispatchToProps)(SendInterestScreen);