import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "../System/UserManage.scss";
import ModalUser from "./ModalUser";
import { getAllUsers } from "../../services/userService";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      isOpenModalUser: false,
    };
  }
  async componentDidMount() {
    // console.log("Fetching users...");
    let response = await getAllUsers("ALL");
    if (response && response.users) {
      this.setState({
        arrUser: response.users,
      });
    }
  }
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
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
        />
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
                    <td>{item.address}</td>
                    <td>{item.gender == "0" ? "Nam" : "Nữ"}</td>
                    <td>
                      <button className="btn-edit">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button className="btn-showuser">
                        <i class="fas fa-user-alt"></i>
                      </button>
                      <button className="btn-delete">
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
