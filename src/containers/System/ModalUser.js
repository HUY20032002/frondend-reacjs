import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  toggle = () => {
    this.props.toggleFromParent();
  };
  componentDidMount() {}

  render() {
    console.log("check ", this.props);
    console.log("check ", this.props.isOpen);

    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-user-container"}
        size="lg"
        centered
      >
        <ModalHeader toggle={() => this.toggle()}>Create New User</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input type="text"></input>
            </div>
            <div className="input-container">
              <label>Password</label>
              <input type="password"></input>
            </div>
            <div className="input-container">
              <label>FirstName</label>
              <input type="text"></input>
            </div>
            <div className="input-container">
              <label>LastName</label>
              <input type="text"></input>
            </div>
            <div className="input-container">
              <label>PhoneNumber</label>
              <input type="text"></input>
            </div>
            <div className="input-container">
              <label>Address</label>
              <input type="password"></input>
            </div>
            <div className="input-container">
              <label>Sex</label>
              <select>
                <option value="0">Male</option>
                <option value="1">Female</option>
              </select>
            </div>
            <div className="input-container">
              <label>Role</label>
              <select>
                <option value="0">Admin</option>
                <option value="1">Doctor</option>
                <option value="2">Pratient</option>
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-1"
            onClick={() => this.toggle()}
          >
            Do Something
          </Button>{" "}
          <Button
            color="secondary"
            className="px-1"
            onClick={() => this.toggle()}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
