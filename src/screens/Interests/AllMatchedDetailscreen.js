import React, { Component } from "react";
import {
	View,
	Image,
	Text,
	ScrollView,
	StyleSheet,
	ImageBackground,
	Dimensions
} from "react-native";
import backgroundImage from "../../assets/profileBg.jpg";

class MatchDetail extends Component {
	state = {
		viewMode: "portrait"
	};

	constructor(props) {
		super(props);
		console.ignoredYellowBox = ['Setting a timer' ];
	}
	render() {
		return (
            <ScrollView
			style={[
			styles.container,
			this.state.viewMode === "portrait"
			? styles.portraitContainer
			: styles.landscapeContainer
			]}
			>
				<View style = { styles.MainContainer }>
					<View style={styles.profileInfoBox}>
					<ImageBackground source={backgroundImage} style={styles.profileImageBox}>
                            <Image source={this.props.selectedUser.image} style={styles.profileImageMain}/>
                        </ImageBackground>
                        <View style={styles.textLine}>
                            <Text style={styles.boldText}>Name:</Text>
                            <Text style={styles.placeName}>
                                {this.props.selectedUser.firstName+' '+this.props.selectedUser.lastName}
                            </Text>
                        </View>
						<View style={styles.textLine}>
                            <Text style={styles.boldText}>Phone Number:</Text>
                            <Text style={styles.placeName}>
                                {this.props.selectedUser.phonenumber}
                            </Text>
                        </View>
                        <View style={styles.textLine}>
                            <Text style={styles.boldText}>Birthday:</Text>
                            <Text style={styles.placeName}>
                                {this.props.selectedUser.birthday}
                            </Text>
                        </View>
                        <View style={styles.textLine}>
                            <Text style={styles.boldText}>Height:</Text>
                            <Text style={styles.placeName}>
                                {this.props.selectedUser.height}
                            </Text>
                        </View>
                        <View style={styles.textLine}>
                            <Text style={styles.boldText}>Married Status:</Text>
                            <Text style={styles.placeName}>
                                {this.props.selectedUser.marriedStatus}
                            </Text>
                        </View>
                        <View style={styles.textLine}>
                            <Text style={styles.boldText}>Education:</Text>
                            <Text style={styles.placeName}>
                                {this.props.selectedUser.education}
                            </Text>
                        </View>
                        <View style={styles.textLine}>
                            <Text style={styles.boldText}>State:</Text>
                            <Text style={styles.placeName}>
                                {this.props.selectedUser.state}
                            </Text>
                        </View>
                        <View style={styles.textLine}>
                            <Text style={styles.boldText}>City:</Text>
                            <Text style={styles.placeName}>
                                {this.props.selectedUser.city}
                            </Text>
                        </View>
                        <View style={styles.textLine}>
                            <Text style={styles.boldText}>Religion:</Text>
                            <Text style={styles.placeName}>
                                {this.props.selectedUser.religion}
                            </Text>
                        </View>
                        <View style={styles.textLine}>
                            <Text style={styles.boldText}>Caste:</Text>
                            <Text style={styles.placeName}>
                                {this.props.selectedUser.caste}
                            </Text>
                        </View>
                        <View style={styles.textLine}>
                            <Text style={styles.boldText}>Mother Tounge:</Text>
                            <Text style={styles.placeName}>
                                {this.props.selectedUser.motherTounge}
                            </Text>
                        </View>
					</View>
				</View>
            </ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	MainContainer:{
		flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
	},
	profileImageBox:{
		backgroundColor:'#c5171f',
		width:'100%',
		padding:20,
		justifyContent:'center',
		textAlign:'center',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	profileImageMain:{
		width: 150, 
		height: 150, 
		borderRadius: 150/2,
		borderColor: "#dea732",
		borderWidth: 3,
		padding:10
	},
	profileInfoBox:{
		alignContent:'flex-start',
	},
	
	requestButtonBottom:{	
		width:'100%',
		alignContent:'flex-end',
	},
	container: {
		flex: 1
	},
	portraitContainer: {
		flexDirection: "column"
	},
	landscapeContainer: {
		flexDirection: "row"
	},
	placeImage: {
		width: "100%",
		height: 200,
		marginBottom:10,
	},
	textLine:{
        flex: .5,
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginLeft:10,
		padding:5,
	},
	placeName: {
		textAlign: "left",
		fontSize: 15,
		color:'#000',
		width:'70%',

	},
	boldText:{
		width:'30%',
		fontSize: 15,
		fontWeight:'bold',
		color:'#000',
	},
	
	
	deleteButton: {
		alignItems: "center"
	},
	subContainer: {
		alignItems:"center",
		flexGrow: 1,
		justifyContent:"center"
	},
	requestButtonBottom:{
		  marginBottom:20,
		  marginTop:10,
	}
});



export default (MatchDetail);