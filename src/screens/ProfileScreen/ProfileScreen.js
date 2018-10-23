import React, { Component } from "react";
import {
    View,
    Picker,
    DatePickerAndroid,
    Text,
    StyleSheet,
    Platform,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    Alert
} from "react-native";
import { connect } from "react-redux";
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import validate from '../../utility/validation';
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";

import RadioGroup from 'react-native-radio-buttons-group';
import Icon from "react-native-vector-icons/Ionicons";
import { updateUser } from "../../store/actions/index";
//import AwesomeAlert from 'react-native-awesome-alerts';
class ProfileScreen extends Component{
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
    state = {
        viewMode: "portrait",
        showAlert: false,
        gender:[
            {
                label:"Female",
                value:1,
                selected:(this.props.loginUser[0].gender)?true:false,
                color:'#b3110e',
                labelStyle:{fontSize: 20, color: '#2ecc71'}
            },
            {
                label:"Male",
				value:0,
                selected:(this.props.loginUser[0].gender)?false:true,
                color:'#b3110e',
            }
        ],
        controls:{
            firstName: {
				
                value:(this.props.loginUser[0].firstName)?this.props.loginUser[0].firstName:"",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            lastName:{
                    
                value:(this.props.loginUser[0].lastName)?this.props.loginUser[0].lastName:"",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            phonenumber:{
				value:(this.props.loginUser[0].phonenumber)?this.props.loginUser[0].phonenumber:"",
				valid: false,
				touched: false,
				validationRules: {
                    onlyNumber: true,
                    minLength: 10
				}
			},
            height:{
                    
                value:(this.props.loginUser[0].height)?this.props.loginUser[0].height:"5.0",
                
            },
            
            birthday:{
				value:(this.props.loginUser[0].birthday)?this.props.loginUser[0].birthday:"26-2-1995"
            },
            marriedStatus:{
                value:this.props.loginUser[0].marriedStatus
            },
            education:{
                value:(this.props.loginUser[0].education)?this.props.loginUser[0].education:"Less Than Graduate"
            }
        }
	}
	showAlert = () => {
        this.setState({
          showAlert: true
        });
      };
     
      hideAlert = () => {
        this.setState({
          showAlert: false
        });
      };
	async openAndroidDatePicker() {
		//month start here 0 0-jan
		try {
			const {action, year,month,day} = await DatePickerAndroid.open({
				date: new Date(1995, 1, 26),
				maxDate: new Date()
			});
			if (action === DatePickerAndroid.dismissedAction) {
				return;
			}
			this.setState(prevState => {
            
				customMonth = parseInt(month)+1
				return {
					controls:{
						...prevState.controls,
						birthday:{
							value: day+'-'+customMonth+'-'+ year
						}
					}
				}
			})
		} catch ({code, message}) {
			console.warn('Cannot open date picker', message);
		}
	}

    selectRadionButtonHandler = (data) => {
        data[1].value = 1;
        this.setState((prevState,data) =>{
            return {
                ...prevState,
                data
            }
        })
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
    addBasicInfoOfUser = () =>{
        if (this.state.controls.firstName.value.trim() !== "" && this.state.controls.lastName.value.trim) {
            let gender = (this.state.gender[0].selected)?1:0
            let userData = 
            {
                firstName:this.state.controls.firstName.value,
                lastName:this.state.controls.lastName.value,
                phonenumber:this.state.controls.phonenumber.value,
                height:this.state.controls.height.value,
                gender:gender,
                birthday:this.state.controls.birthday.value,
                education:this.state.controls.education.value,
				marriedStatus:this.state.controls.marriedStatus.value,
				key: this.props.loginUser[0].key
            }
            this.props.updateUserInfo(userData);
            
		}
    }
    
    render(){
        let selectedButton = this.state.gender.find(e => e.selected == true);
        
        
        let submitButton = <ButtonWithBackground 
            color="#dea732" 
            onPress={this.addBasicInfoOfUser} 
            >
            Update
        </ButtonWithBackground>
        if(this.props.isLoading){
            submitButton = <ActivityIndicator size="large" color="orange" />
        }
        
        return(
			<ScrollView contentContainerStyle={styles.contentContainer}>
                
            <DefaultInput 
                value={this.state.controls.firstName.value} 
                placeholder="Enter Your First Name"
                onChangeText={val => this.updateInputState("firstName", val)}
                valid={this.state.controls.firstName.valid}
                touched={this.state.controls.firstName.touched}
            />
            <DefaultInput 
                value={this.state.controls.lastName.value} 
                placeholder="Enter Your Last Name"
                onChangeText={val => this.updateInputState("lastName", val)}
                valid={this.state.controls.lastName.valid}
                touched={this.state.controls.lastName.touched}
            />
            <DefaultInput 
                value={this.state.controls.phonenumber.value} 
                placeholder="Enter Your Phone Number"
                keyboardType="numeric"
                onChangeText={val => this.updateInputState("phonenumber", val)}
                valid={this.state.controls.phonenumber.valid}
                touched={this.state.controls.phonenumber.touched}
            />
            <View style={styles.radioButtonstyle}>
                <RadioGroup radioButtons={this.state.gender} onPress={this.selectRadionButtonHandler} flexDirection='row' color='#fff'/>
            </View>
            <View style={styles.datepickerBox}>
                <View style={{flex:1,alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>this.openAndroidDatePicker()}>
                        <Icon size={30} name={Platform.OS === "android" ? "md-calendar" : "ios-calendar"} color="orange"/>
                    </TouchableOpacity>
                </View>
                <View style={{flex:4,justifyContent: 'flex-start',alignItems:'flex-start'}}>
                  <DefaultInput value={this.state.controls.birthday.value} editable = {false} />
                </View>
            </View>
            <View style={styles.selectpickerBox}>
                <View style={{flex:5}}>
                  <Text style={styles.slectPickerText}>Height</Text>
                </View>
                <View style={{flex:5,justifyContent: 'flex-end',alignItems:'flex-end'}}>
                  <Picker
                    selectedValue={this.state.controls.height.value}
                    style={{width: 90,height:35 }}
                    onValueChange={(itemValue, itemIndex) => this.setState(prevState=> {
                        return {
                            controls:{
                                ...prevState.controls,
                                height:{
                                    value:itemValue
                                }
                            }
                        }
                        
                        })}>
                    <Picker.Item label="<4.0" value="<4.0" />
                    <Picker.Item label="4.0" value="4.0" />
                    <Picker.Item label="4.1" value="4.1" />
                    <Picker.Item label="4.2" value="4.2" />
                    <Picker.Item label="4.3" value="4.3" />
                    <Picker.Item label="4.4" value="4.4" />
                    <Picker.Item label="4.5" value="4.5" />
                    <Picker.Item label="4.6" value="4.6" />
                    <Picker.Item label="4.7" value="4.7" />
                    <Picker.Item label="4.8" value="4.8" />
                    <Picker.Item label="4.9" value="4.9" />
                    <Picker.Item label="4.10" value="4.10" />
                    <Picker.Item label="4.11" value="4.11" />
                    <Picker.Item label="5.0" value="5.0" />
                    <Picker.Item label="5.1" value="5.1" />
                    <Picker.Item label="5.2" value="5.2" />
                    <Picker.Item label="5.3" value="5.3" />
                    <Picker.Item label="5.4" value="5.4" />
                    <Picker.Item label="5.5" value="5.5" />
                    <Picker.Item label="5.6" value="5.6" />
                    <Picker.Item label="5.7" value="5.7" />
                    <Picker.Item label="5.8" value="5.8" />
                    <Picker.Item label="5.9" value="5.9" />
                    <Picker.Item label="5.10" value="5.10" />
                    <Picker.Item label="5.11" value="5.11" />
                    <Picker.Item label="6.0" value="6.0" />
                    <Picker.Item label="6.1" value="6.1" />
                    <Picker.Item label="6.2" value="6.2" />
                    <Picker.Item label="6.3" value="6.3" />
                    <Picker.Item label="6.4" value="6.4" />
                    <Picker.Item label="6.5" value="6.5" />
                    <Picker.Item label="6.6" value="6.6" />
                    <Picker.Item label="> 6.6" value="> 6.6" />
                </Picker>
                </View>
            </View>

            <View style={styles.selectpickerBox}>
                <View style={{flex:3}}>
                   <Text>Married Status</Text>
                </View>
                <View style={{flex:3,justifyContent: 'flex-end',alignItems:'flex-end'}}>
                    <Picker
                        selectedValue={this.state.controls.marriedStatus.value}
                        style={{width: 180,height:35 }}
                        onValueChange={(itemValue, itemIndex) => this.setState(prevState=> {
                            return {
                                controls:{
                                    ...prevState.controls,
                                    marriedStatus:{
                                        value:itemValue
                                    }
                                }
                            }
                            
                            })}>
                        <Picker.Item label="Never Married" value="Never Married" />
                        <Picker.Item label="Divorced" value="Divorced" />
                    </Picker>
                </View>
            </View>

            <View style={styles.selectpickerBox}>
               <View style={{flex:3}}>
                  <Text>Highest Education</Text>
                </View>
                <View style={{flex:4,justifyContent: 'flex-end',alignItems:'flex-end'}}>
                <Picker
                    selectedValue={this.state.controls.education.value}
                    style={{width: 180,height:35 }}
                    onValueChange={(itemValue, itemIndex) => this.setState(prevState=> {
                        return {
                            controls:{
                                ...prevState.controls,
                                education:{
                                    value:itemValue
                                }
                            }
                        }
                        
                        })}>
                    <Picker.Item label="Less Than Graduate" value="Less Than Graduate" />
                    <Picker.Item label="Gradute" value="Gradute" />
                    <Picker.Item label="Post Gradute" value="Post Graduate" />
                </Picker>
                </View>
            </View>
            {submitButton}
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    contentContainer: {
       padding:20,
       backgroundColor:"#fff",
       textAlign:'left'
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
        
        
    },
    datepickerBox:{
        flexDirection: 'row', 
        alignItems: 'center',
    },
    slectPickerText:{
        fontWeight:'bold',
        fontSize:16,
        color:'#000',
    },
    radioButtonstyle:{
        margin:10,
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
		isLoading: state.ui.isLoading,
        loginUser: state.user.loginUser
	}
};

const mapDispatchToProps = dispatch => {
	return {
		updateUserInfo: (userData) => dispatch(updateUser(userData)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
 