import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "../System/UserManage.scss";
import ModalUser from "./ModalUser.js";
import ModalEditUser from "./ModalEditUser.js";

import {
  getAllUsers,
  createNewUserService,
  deleteUser,
  EditUserService,
} from "../../services/userService";
import { emitter } from "../../utils/emitter";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      isOpenModalUser: false,
      isOpenModaEditlUser: false,
      userEdit: {},
    };
  }
  async componentDidMount() {
    await this.getAllUsersFromReact();
  }
  //Lấy dữ liệu tất cả các User
  getAllUsersFromReact = async () => {
    // console.log("Fetching users...");
    let response = await getAllUsers("ALL");
    if (response && response.users) {
      this.setState({
        arrUser: response.users,
      });
    }
  };
  // Ẩn hiện modal tạo người dùng
  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };
  toggleUserModal = () => {
    this.setState((prevState) => ({
      isOpenModalUser: !prevState.isOpenModalUser,
    }));
  };
  toggleUserEditModal = () => {
    this.setState((prevState) => ({
      isOpenModaEditlUser: !prevState.isOpenModaEditlUser,
    }));
  };
  // Tạo người dùng mới
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);

      // console.log("Response create user: ", response);

      // Kiểm tra nếu response là object và có status thành công
      if (response && response.errCode == 0) {
        // alert("Người dùng đã được tạo thành công!");
        await this.getAllUsersFromReact();
        this.setState((prevState) => ({
          isOpenModalUser: false,
        }));
      } else {
        alert(response?.message || "Có lỗi xảy ra khi tạo người dùng.");
      }
      emitter.emit("EVENT_CLEAR_MODAL_DATA");
    } catch (error) {
      console.error("Lỗi khi tạo người dùng: ", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại.");
    }
  };
  editUser = async (data) => {
    try {
      let res = await EditUserService(data);
    } catch (error) {
      console.log(error);
    }
  };
  // Xóa người dùng
  handleDeleteUser = async (userId) => {
    try {
      let res = await deleteUser(userId);
      if (res && res.errCode == 0) {
        await this.getAllUsersFromReact();
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleEditUser = (data) => {
    console.log(data);
    this.setState((prevState) => ({
      isOpenModaEditlUser: true,
      userEdit: data,
    }));
  };
  doEditUser = async (userData) => {
    console.log(userData);
    try {
      let res = await EditUserService(userData);
      if (res && res.errCode == 0) {
        await this.getAllUsersFromReact();
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // lifr circle
  // run compoment;;
  // 1. Run contructor -> init state
  // 2 Did mount (set state)
  // 3 render
  render() {
    let arrUsers = this.state.arrUser;
    // console.log(arrUsers);
    return (
      <div className="users-container">
        <ModalUser
          createNewUser={this.createNewUser}
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
        />
        {this.state.isOpenModaEditlUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModaEditlUser}
            userEdit={this.state.userEdit}
            toggleFromParent={this.toggleUserEditModal}
            EditUser={this.doEditUser}
          />
        )}

        <div className="title text-center">Manage users React</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i> Add new user
          </button>
        </div>
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <tr>
              <th>Email</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>PhoneNumber</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>

            {arrUsers &&
              arrUsers.map((item, index) => {
                return (
                  <tr className="divClass">
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.phonenumber}</td>
                    <td>{item.address}</td>
                    <td>{item.gender == "0" ? "Nam" : "Nữ"}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => this.handleEditUser(item)}
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button className="btn-showuser">
                        <i class="fas fa-user-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteUser(item.id)}
                      >
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
