import React, { Component } from "react";
import {
    ActivityIndicator,ScrollView,StyleSheet,View,Text
} from "react-native";
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import validate from '../../utility/validation';
import { connect } from "react-redux";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import {updateUser} from "../../store/actions/index";
import CountryItem from "../../components/Country/Country";
class StateScreen extends Component{
    static navigatorStyle = {
        navBarButtonColor: "orange"
    };
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
        console.ignoredYellowBox = ['Setting a timer' ];
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
    state = {
        controls:{
            country:{
                value:(this.props.loginUser[0].country)?this.props.loginUser[0].country:"IN"
            },
            state:{
                    
                value:(this.props.loginUser[0].state)?this.props.loginUser[0].state:"",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            city:{
                    
                value:(this.props.loginUser[0].city)?this.props.loginUser[0].city:"",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
        
            pincode:{
                value:(this.props.loginUser[0].pincode)?this.props.loginUser[0].pincode:"",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            }
        }
    }

    updateInputState = (key,val) =>{
		this.setState(prevState => {
			return {
				controls:{
				...prevState.controls,
					[key]:{
						...prevState.controls[key],
						value: val,
						valid: validate(val, prevState.controls[key].validationRules),
						touched: true
					}
				}
			}
		});
    } 

    updateUserInfo = () => {
        let userUpdatedData = {
            state: this.state.controls.state.value,
            city: this.state.controls.city.value,
            pincode: this.state.controls.pincode.value,
            country:this.state.controls.country.value,
            key: this.props.loginUser[0].key
        }
        this.props.updateUserInfo(userUpdatedData);
    }
    render() {
        let submitButton =  <ButtonWithBackground color="#dea732" onPress={this.updateUserInfo} >Update</ButtonWithBackground>
        if(this.props.isLoading){
            submitButton = <ActivityIndicator size="large" color="orange" />
        }
        return(
            <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.selectpickerBox}>
                <View style={{flex:5}}>
                  <Text style={styles.slectPickerText}>Country</Text>
                </View>
                <CountryItem selectedCountry={this.state.controls.country.value}
                changeCountry={(itemValue, itemIndex) => this.setState(prevState=> {
                    return {
                        controls:{
                            ...prevState.controls,
                            country:{
                                value:itemValue
                            }
                        }
                    }
                    
                    })}/>
            </View>
                <DefaultInput 
                    value={this.state.controls.state.value} 
                    placeholder="State" 
                    onChangeText={val => this.updateInputState("state", val)}
                />
                <DefaultInput 
                    value={this.state.controls.city.value} 
                    placeholder="City"
                    onChangeText={val => this.updateInputState("city", val)}
                />
                <DefaultInput 
                    value={this.state.controls.pincode.value} 
                    placeholder="Pincode"
                    onChangeText={val => this.updateInputState("pincode", val)}
                    keyboardType="numeric"
                />
                {submitButton}
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    contentContainer: {
       padding:20,
       backgroundColor:"#fff"
    },
    submitButton:{
        textAlign: 'center', 
        fontWeight: 'bold',
        fontSize: 18,
        color:"#600307"
    },
    selectpickerBox:{
        flexDirection: 'row', 
        alignItems: 'center',
        backgroundColor:'#fff', 
        width: "100%",
        borderWidth: 2,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth:0,
        borderColor: "#b3110e",
        padding: 5,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 4,
        paddingHorizontal:10,
        
        fontWeight:'bold',
    },
    slectPickerText:{
        fontWeight:'bold',
        fontSize:16,
        color:'#000',
    }
});
const mapStateToProps = state => {
	
	return {
		isLoading: state.ui.isLoading,
        loginUser: state.user.loginUser
	}
};

const mapDispatchToProps = dispatch => {
	return {
		updateUserInfo: (userData) => dispatch(updateUser(userData)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(StateScreen);
