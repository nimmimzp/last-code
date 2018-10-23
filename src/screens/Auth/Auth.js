import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";

import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import backgroundImage from "../../assets/bgImage.png";
import logoImage from "../../assets/logo.png";
import validate from "../../utility/validation";
import { tryAuth, authAutoSignedIn } from "../../store/actions/index";

class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
    authMode: "login",
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: "password"
        },
        touched: false
      }
    }
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
    console.ignoredYellowBox = ['Setting a timer' ];
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  componentDidMount(){
  //   this.props.navigator.push({
  //     screen: "FYP.FirstScreen",
  //     title: "About Your Place",
  // });
    this.props.onAutoSingin();
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "login" ? "signup" : "login"
      };
    });
  };

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };

  authHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    this.props.onTryAuth(authData,this.state.authMode);
    
  };

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === "password"
                ? validate(
                    prevState.controls.confirmPassword.value,
                    prevState.controls.confirmPassword.validationRules,
                    connectedValue
                  )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };

  render() {
    let headingText = null;
    let confirmPasswordControl = null;
    let submitButton = <ButtonWithBackground
    color="#dea732"
    onPress={this.authHandler}
    disabled={
      !this.state.controls.confirmPassword.valid && this.state.authMode === "signup" ||
      !this.state.controls.email.valid ||
      !this.state.controls.password.valid
    }
  >
    Submit
  </ButtonWithBackground>
    if (this.state.viewMode === "portrait") {
      headingText = (
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>
      );
    }
    if (this.state.authMode === "signup") {
      confirmPasswordControl = (
        <View
          style={
            this.state.viewMode === "portrait"
              ? styles.portraitPasswordWrapper
              : styles.landscapePasswordWrapper
          }
        >
          <DefaultInput
            placeholder="Confirm Password"
            style={styles.input}
            value={this.state.controls.confirmPassword.value}
            onChangeText={val => this.updateInputState("confirmPassword", val)}
            valid={this.state.controls.confirmPassword.valid}
            touched={this.state.controls.confirmPassword.touched}
            secureTextEntry
          />
        </View>
      );
    }
    if(this.props.isLoading){
      submitButton = <ActivityIndicator size="large" color="orange" />
    }
   
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.logoContainer}>
              {/* {headingText} */}
              <Image style={styles.logo} source={logoImage} />
            </View>
          {/* <ButtonWithBackground
            color="#29aaf4"
            onPress={this.switchAuthModeHandler}
          >
            Switch to {this.state.authMode === "login" ? "Sign Up" : "Login"}
          </ButtonWithBackground> */}
          <View style={styles.formContainer}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <DefaultInput
                placeholder="Your E-Mail Address"
                style={styles.input}
                value={this.state.controls.email.value}
                onChangeText={val => this.updateInputState("email", val)}
                valid={this.state.controls.email.valid}
                touched={this.state.controls.email.touched}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
              <View
                style={
                  this.state.viewMode === "portrait" ||
                  this.state.authMode === "login"
                    ? styles.portraitPasswordContainer
                    : styles.landscapePasswordContainer
                }
              >
                <View
                  style={
                    this.state.viewMode === "portrait" ||
                    this.state.authMode === "login"
                      ? styles.portraitPasswordWrapper
                      : styles.landscapePasswordWrapper
                  }
                >
                  <DefaultInput
                    placeholder="Password"
                    style={styles.input}
                    value={this.state.controls.password.value}
                    onChangeText={val => this.updateInputState("password", val)}
                    valid={this.state.controls.password.valid}
                    touched={this.state.controls.password.touched}
                    secureTextEntry
                  />
                </View>
                {confirmPasswordControl}
              </View>
            </View>
          </TouchableWithoutFeedback>
            {submitButton}
            <Text
                color="#fff"
                onPress={this.switchAuthModeHandler}
                style={styles.loginButton}
              >
                 {this.state.authMode === "login" ? "Don't have an account ? Sign Up" : "Already have an account? Login"}
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    //salignItems: "center"
  },
  backgroundImage: {
    width: "100%",
    flex: 1,
    height: "100%",
  },
  logoContainer: {
    alignItems:"center",
    flexGrow: 1,
    justifyContent:"center"
  },
  logo: {
   width: "70%"
  },
  formContainer: {
    width: "100%",
    padding: 20,
  },
  inputContainer: {
    width: "100%"
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#9d1117",
    color:"#600307",
    borderRadius:4,
    paddingLeft: 15,
  },
  landscapePasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  portraitPasswordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  landscapePasswordWrapper: {
    width: "45%"
  },
  portraitPasswordWrapper: {
    width: "100%"
  },
  loginButton:{
    paddingTop:10,
    paddingBottom:10,
    borderRadius:10,
    borderWidth: 1,
    color:"#dea732",
    fontSize: 18,
    fontWeight: "600",
    borderWidth: 0 ,
    textAlign: 'center'
  },
  submitButton:{
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 18,
    color:"#600307"
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAuth: (authData,authMode) => dispatch(tryAuth(authData,authMode)),
    onAutoSingin : () => dispatch(authAutoSignedIn())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);