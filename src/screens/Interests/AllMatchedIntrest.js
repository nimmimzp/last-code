import React, {Component} from 'react';
import { connect } from "react-redux";
import PlaceList from "../../components/PlaceList/PlaceList";
import {Text} from "react-native";
class AllMatchedIntrest extends Component {
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
       
        const selUser = this.props.userMatched.find(user => {
            return user.key === key;
        });
       
        this.props.navigator.push({
            screen: "FYP.AllMatchedDetailscreen",
            title: selUser.firstName+' '+selUser.lastName,
            passProps: {
                selectedUser: selUser,
                loggedinUser: this.props.loginUser[0].key,
            }
        });
    }

    
    render () {
        if(this.props.userMatched.length>0){
            return <PlaceList
            users={this.props.userMatched}
            onItemSelected={this.userSelectedHandler}
            />
        }
        return <Text>You will find your match soon!</Text>
    }
}

const mapStateToProps = state => {
    return {
        userMatched : state.user.userMatched,
        loginUser: state.user.loginUser
    };
};
  

  
export default connect(mapStateToProps)(AllMatchedIntrest);