import { 
	SET_USER_INFO, 
	SET_USER_INTREST,
	REMOVE_INTREST_REQUEST,
	SET_USER_RECEIVED_INTREST,
	REMOVE_USER_RECEIVED_INTREST,
	SET_USER_MATCH
} from "../actions/actionTypes";

const initialState = {
	places: [],
	userData: [],
	loginUser:[],
	userIntrest:[],
	userReceivedRequest:[],
	userMatched:[]
};

const reducer = (state = initialState, action) => {
	
	switch (action.type) {
		case SET_USER_INFO:
			return{
				...state,
				loginUser:action.loginUserInfo
			};
		case SET_USER_INTREST:
			return{
				...state,
				userIntrest:action.setUserIntrest
			};
		case REMOVE_INTREST_REQUEST:

			return{
				...state,
				userIntrest: state.userIntrest.filter(user => {
					return user.key !== action.userKey;
				})
			};

		case SET_USER_RECEIVED_INTREST:
			return{
				...state,
				userReceivedRequest:action.setUserReceivedRequest
			}
		case REMOVE_USER_RECEIVED_INTREST: 
			return{
				...state,
				userReceivedRequest: state.userReceivedRequest.filter(user => {
					return user.key !== action.userKey;
				})
			};
		case SET_USER_MATCH:
			return{
				...state,
				userMatched:action.allYourMatch
			}
		default:
			return state;
	}
};

export default reducer;
