import React, { Component } from "react";
import {
	View,
	Image,
	Text,
	ScrollView,
	StyleSheet,
	ImageBackground,
	Dimensions,
	Alert
} from "react-native";
import  ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImage from "../../assets/profileBg.jpg";

class PlaceDetail extends Component {
	state = {
		viewMode: "portrait"
	};

	constructor(props) {

		super(props);
		
		console.ignoredYellowBox = ['Setting a timer' ];
		Dimensions.addEventListener("change", this.updateStyles);
	}

	componentWillUnmount() {
		Dimensions.removeEventListener("change", this.updateStyles);
	}

	updateStyles = dims => {
		this.setState({
			viewMode: dims.window.height > 500 ? "portrait" : "landscape"
		});
	};

	cancelReceivedRequest = () => {
		
		let receivedByDetail = {
			sentBy:this.props.selectedUser.key,
			requestedById:this.props.selectedUser.requestedById
		}
		this.props.cancelRequest(receivedByDetail,this.props.loggedinUser);
		this.props.navigator.pop({
			animated: true,
			animationType: 'fade', 
		});
	}

	acceptReceiveRequest = () => {
		let receivedByData = {
			sentBy:this.props.selectedUser.key,
			requestedById:this.props.selectedUser.requestedById
		}
		this.props.acceptRequest(receivedByData,this.props.loggedinUser);
		this.props.navigator.pop({
			animated: true,
			animationType: 'fade', 
		});
		
	}
	manageUserRequest = () => {

		let requestedToDetail = {
			requestedUser:this.props.selectedUser.key,
			status:0,
			requestedId:this.props.selectedUser.requestId
		}
		let requestByDetail = {
			requestedById:this.props.loggedinUser,
			status:0
		}
		this.props.manageUserRequest(requestedToDetail,requestByDetail);
		this.props.navigator.pop({
			animated: true,
			animationType: 'fade', 
		});
	};

	render() {
		let manageRequest =  <ButtonWithBackground  color="#dea732" onPress={this.manageUserRequest}>{this.props.buttonText}</ButtonWithBackground>
		let acceptButton ;
		if(this.props.buttonText === 'Accept'){

			manageRequest = <ButtonWithBackground  color="#dea732" onPress={this.cancelReceivedRequest}>Cancel</ButtonWithBackground>
			acceptButton = <ButtonWithBackground  color="#dea732" onPress={this.acceptReceiveRequest}>{this.props.buttonText}</ButtonWithBackground>
		}

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
				    <View style={styles.requestButtonBottom}>
					  	{acceptButton}{manageRequest}
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
export default (PlaceDetail);