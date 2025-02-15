import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null
};


const appReducer = (state = initialState, action) => {  // ✅ Đổi tên
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            console.log('🟢 Reducer: Đăng nhập thành công', action.userInfo);
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            };
        case actionTypes.USER_LOGIN_FAIL:
            console.log('🔴 Reducer: Đăng nhập thất bại');
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            };
        case actionTypes.PROCESS_LOGOUT:
            console.log('🔵 Reducer: Đăng xuất');
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            };
        default:
            return state;
    }
};

export default appReducer;
