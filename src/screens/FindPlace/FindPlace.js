import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated
} from "react-native";
import { connect } from "react-redux";
import { getUser,requestUser } from "../../store/actions/index";
import PlaceList from "../../components/PlaceList/PlaceList";
import logoImage from "../../assets/logo-icon.png";

class FindPlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  };

  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    placesAnim: new Animated.Value(0)
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

  placesLoadedHandler = () => {
    Animated.timing(this.state.placesAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  placesSearchHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        placesLoaded: true
      });
      this.placesLoadedHandler();
    });
  };

  itemSelectedHandler = key => {
    
    const selUser = this.props.allUser.find(user => {
      return user.key === key;
    });
    
    this.props.navigator.push({
      screen: "awesome-places.PlaceDetailScreen",
      title: selUser.firstName+' '+selUser.lastName,
      passProps: {
        selectedUser: selUser,
        loggedinUser: this.props.loginUser[0].key,
        buttonText:"Send Request",
        manageUserRequest:this.props.addUserRequest,
        alertText:"Intrest has been sent to the user"
      }
    });
  };

  componentDidMount() {
    let userData = {
      userId: this.props.loginUser[0].userId,
      userGender:this.props.loginUser[0].gender
    }
    this.props.onLoadPlaces(userData);
  }

  render() {
    
    let content = (
      <Animated.View
        style={{
          opacity: this.state.removeAnim,
          transform: [
            {
              scale: this.state.removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1]
              })
            }
          ]
        }}
      >
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.container}>
            <View>
              <Image style={styles.logo} source={logoImage} />
            </View>
            <View style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Find Your Match</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
    if (this.state.placesLoaded) {
      content = (
        <Animated.View
          style={{
            opacity: this.state.placesAnim
          }}
        >
          <PlaceList
            users={this.props.allUser}
            onItemSelected={this.itemSelectedHandler}
          />
        </Animated.View>
      );
    }
    return (
      <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  searchButton: {
    borderColor: "#5c040a",
    borderWidth: 2,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor:'#dea732',
    marginTop:5,
  },
  searchButtonText: {
    color: "#5c040a",
    fontWeight: "bold",
    fontSize: 26
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width:'100%'
  },
});

const mapDispatchToProps = dispatch => {
  return{
    onLoadPlaces: (userData) => dispatch(getUser(userData)),
    addUserRequest: (requestedToDetail,requestByDetail,loggedinUser) => dispatch(requestUser(requestedToDetail,requestByDetail,loggedinUser))
  }
}

const mapStateToProps = state => {
  return {
    allUser: state.places.places,
    loginUser: state.user.loginUser
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(FindPlaceScreen);
