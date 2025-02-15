import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null
};

const initialState = {
    started: true,
    language: 'vi',
    systemMenuPath: '/system/user-manage',
    isLoggedIn: false,  // ✅ Thêm trạng thái đăng nhập
    userInfo: null,      // ✅ Lưu thông tin user sau khi đăng nhập
    contentOfConfirmModal: {
        ...initContentOfConfirmModal
    }
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APP_START_UP_COMPLETE: 
            return {
                ...state,
                started: true
            };
        case actionTypes.SET_CONTENT_OF_CONFIRM_MODAL: 
            return {
                ...state,
                contentOfConfirmModal: {
                    ...state.contentOfConfirmModal,
                    ...action.contentOfConfirmModal
                }
            };
        case actionTypes.USER_LOGIN_SUCCESS: // ✅ Xử lý đăng nhập thành công
            console.log("🟢 Reducer: Đăng nhập thành công", action.userInfo);
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            };
        case actionTypes.USER_LOGIN_FAIL: // ✅ Xử lý đăng nhập thất bại
            console.log("🔴 Reducer: Đăng nhập thất bại");
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            };
        case actionTypes.PROCESS_LOGOUT: // ✅ Xử lý logout
            console.log("🔵 Reducer: Đăng xuất");
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
