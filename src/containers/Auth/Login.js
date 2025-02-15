import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import  {handleLoginAPI}  from '../../services/userService';
// import { userLoginSuccess } from "../../store/actions/userActions";


// dùng để kế thừa
class Login extends Component {
    // hàm tạo 
    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:'',
            isShowPassword : false,
            errMessage:''
        }
    }

    // refresh = () => {
    //     this.setState({
    //         ...this.initialState
    //     })
    // }

    handleOnChangeUserName = (e) =>{
        this.setState({
            username: e.target.value
        })
    }
    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    handleLogin = async () => {
        this.setState({ errMessage: '' });
    
        try {
            let data = await handleLoginAPI(this.state.username, this.state.password);
    
            console.log('📡 API Response:', data); // ✅ Log toàn bộ phản hồi từ API
    
            // if (!data) {
            //     console.error('❌ Không có dữ liệu trả về từ API');
            //     return;
            // }
    
            if (data.errorCode !== 0) {
                this.setState({ errMessage: data.message });
                console.warn('⚠ Lỗi đăng nhập:', data.message);
                return;
            }
    
            // if (!data.user) {
            //     console.error('⚠ API không trả về user:', data);
            //     return;
            // }
    
            console.log('✅ Login successful! User:', data.userData);
    
            // Lưu user vào Redux
            this.props.userLoginSuccess(data.user);
    
            // Điều hướng sau khi đăng nhập thành công
            // console.log('🔀 Navigating to /system/user-manage');
            // this.props.navigate('/system/user-manage');  
    
        } catch (error) {
            console.error('❌ Lỗi khi gọi API:', error);
            if (error.response && error.response.data) {
                this.setState({ errMessage: error.response.data.message });
            } else {
                this.setState({ errMessage: "Lỗi kết nối đến server!" });
            }
        }
    };
    
    
    
    handleIsShowPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })

    }
  
    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-center text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>
                                Username:
                            </label>
                            <input type='text'
                             className='form-control' 
                             placeholder='Enter your username'
                             value={this.state.username}
                             onChange={(e) => this.handleOnChangeUserName(e)}
                             />
                           
                        </div>
                        <div className='col-12 form-group login-input'>
                        <label>
                                Password:
                            </label>
                            <div className='custom-input-password'><input 
                            type={this.state.isShowPassword? 'text' : 'password'} 
                            className='form-control' 
                            placeholder='Enter your password'
                            value={this.state.password}
                            onChange={(e) => this.handleOnChangePassword(e)}
                            />   
                             <i
                              className= {this.state.isShowPassword?   'fas fa-eye-slash':'fas fa-eye'} 
                                onClick={()=>{this.handleIsShowPassword()}}
                                 ></i>
                             </div>
                       
                            <div className='col-12' style={{color:'red'}}>
                                {this.state.errMessage}
                            </div>
                        </div>
                            <div className='col-12'>
                                <button 
                                className='btn-login'
                                onClick={()=>{this.handleLogin()}}
                                >
                                    Login
                                </button>
                            </div>
                            <div className='col-12'>
                                <u className='forgotpassword'>Forgot your password?</u>
                            </div>
                            <div className='col-12 text-center'>
                                <span className=''>Login With</span>
                            </div>
                  
                            <div className='social-icon'>
                                       
                            <i className="fab fa-google  google"></i>
                                <i className="fab fa-facebook facebook"></i> 
                            </div>
                     
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),  // ✅ Đảm bảo hàm chuyển hướng hoạt động
        userLoginFail: () => dispatch(actions.userLoginFail()), // ❌ Không cần tham số userInfo
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)) // ✅ Đúng cú pháp
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
