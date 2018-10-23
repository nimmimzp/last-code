import React, { Component } from "react";
import {
   ScrollView,
   StyleSheet,View,Text
} from "react-native";

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import validate from '../../utility/validation';
import CountryItem from "../../components/Country/Country";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
class SecondScreen extends Component{
    constructor(props) {
        super(props);
        console.ignoredYellowBox = ['Setting a timer' ];
    }
    state = {
        controls:{
            country:{
                value:"IN"
            },
            state:{
                    
                value:"",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            city:{
                    
                value:"",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            pincode:{
                value:"",
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
    
    addBasicInfoOfUser = () => {
        let newUserData ={
            country:this.state.controls.country.value,
            state:this.state.controls.state.value,
            city:this.state.controls.city.value,
            pincode:this.state.controls.pincode.value
        };
        this.props.navigator.push({
            screen: "FYP.ThirdScreen",
            title: "About Your Religion",
            passProps: {
                userData: this.props.userData,
                userStateData: newUserData
            }
        });
    }
    render(){
        return(
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.selectpickerBox}>
                <View style={{flex:5}}>
                  <Text style={styles.slectPickerText}>Country</Text>
                </View>
                <View style={{flex:3,justifyContent: 'flex-end',alignItems:'flex-end'}}>
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
            </View>
                <DefaultInput 
                    value={this.state.controls.state.value} 
                    placeholder="State" 
                    onChangeText={val => this.updateInputState("state", val)}
                    valid={this.state.controls.state.valid}
                    touched={this.state.controls.state.touched}
                />
                <DefaultInput 
                    Value={this.state.controls.city.value} 
                    placeholder="City"
                    onChangeText={val => this.updateInputState("city", val)}
                    valid={this.state.controls.city.valid}
                    touched={this.state.controls.city.touched}
                />
                <DefaultInput 
                    Value={this.state.controls.pincode.value} 
                    placeholder="Pincode"
                    onChangeText={val => this.updateInputState("pincode", val)}
                    keyboardType="numeric"
                    valid={this.state.controls.pincode.valid}
                    touched={this.state.controls.pincode.touched}
                />
                <ButtonWithBackground color="#dea732" onPress={this.addBasicInfoOfUser} 
                    disabled={
                        !this.state.controls.state.valid ||
                        !this.state.controls.city.valid ||
                        !this.state.controls.pincode.valid
                    }
                >Next</ButtonWithBackground>
            </ScrollView>
        )
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
        color:'#000',
        fontWeight:'bold',
    },
    slectPickerText:{
        fontWeight:'bold',
        fontSize:16,
        color:'#000',
    }
});

export default SecondScreen;