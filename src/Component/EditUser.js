import React, { Component } from "react";
import UserDataService from "../Services/UserService";
import '../Css/EditUser.css';

export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeId = this.onChangeId.bind(this);
        this.onChangefirstName = this.onChangefirstName.bind(this);
        this.onChangelastName = this.onChangelastName.bind(this);
        this.onChangeuserStatus = this.onChangeuserStatus.bind(this);
        this.onChangeemail=this.onChangeemail.bind(this);
        this.onChangecontactNumber=this.onChangecontactNumber.bind(this);
        this.onChangepassword=this.onChangepassword.bind(this);
        this.onChangeavatarImageUrl=this.onChangeavatarImageUrl.bind(this);
        this.onChangechatStatus=this.onChangechatStatus.bind(this);
        this.onChangedob=this.onChangedob.bind(this);
        this.onChangegender=this.onChangegender.bind(this);
        this.onChangeresume=this.onChangeresume.bind(this);
        this.onChangeselfIntro=this.onChangeselfIntro.bind(this);
        this.getUser = this.getUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.state = {
            currentUser: {
                id: null,
                firstName: "",
                lastName: "",
                username:"",
                contactNumber:"",
                avatarImageUrl:"",
                chatStatus:"",
                dob:"",
                gender:"",
                resume:"",
                selfIntro:"",
                userstatus: ""
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getUser(localStorage.getItem('username'));
    }

    onChangeId(e) {
        const id = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    id: id
                }
            };
        }); }
    onChangefirstName(e) {
        const firstName = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    firstName: firstName
                }
            };
        });}
    onChangelastName(e) {
        const lastName = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    lastName: lastName
                }
            };
        });}
    onChangeuserStatus(e) {
        const userstatus = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    userstatus: userstatus
                }
            };
        });}
    onChangeemail(e){
        const username = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    username: username
                }
            };
        });}
    onChangecontactNumber(e){
        const contactNumber = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    contactNumber: contactNumber
                }
            };
        });}
    onChangepassword(e){
        const password = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    password: password
                }
            };
        });}
    onChangeavatarImageUrl(e){
        const avatarImageUrl = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    avatarImageUrl: avatarImageUrl
                }
            };
        });}
    onChangechatStatus(e){
        const chatStatus = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    chatStatus: chatStatus
                }
            };
        });}
    onChangedob(e){
        const dob = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    dob: dob
                }
            };
        });}
    onChangegender(e){
        const gender = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    gender: gender
                }
            };
        });}
    onChangeresume(e){
        const resume = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    resumeURl: resume
                }
            };
        });}
    onChangeselfIntro(e){
        const selfIntro = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    selfIntroduction: selfIntro
                }
            };
        });}

    getUser(id) {
        UserDataService.getUserById(id)
            .then(response => {
                this.setState({
                    currentUser: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateUser() {
        UserDataService.updateUser(
            this.state.currentUser.id,
            this.state.currentUser            
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The student was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteUser() {
        UserDataService.deleteUser(this.state.currentUser.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/users')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div className="edit-userform">
                {currentUser ? (
                    <div className="edit-form">
                        <h4>Edit Profile</h4>
                      
                        <form>
                             <div className="form-group">
                                <label className="field1" htmlFor="Id">ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="id"
                                    value={currentUser.id}
                                    onChange={this.onChangeId}
                                />
                            </div>
             
                            <div className="form-group">
                                <label className="field1" htmlFor="name">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    value={currentUser.firstName}
                                    onChange={this.onChangefirstName}
                                />
                            </div>
                        
                            <div className="form-group">
                                <label className="field1" htmlFor="nickName">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    value={currentUser.lastName}
                                    onChange={this.onChangelastName}
                                />
                            </div>
                            <div className="form-group">
                                <label className="field1" htmlFor="contactNumber">Contact Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="contactNumber"
                                    value={currentUser.contactNumber}
                                    onChange={this.onChangecontactNumber}
                                />
                            </div>

                            <div className="form-group">
                                <label className="field1" htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    value={currentUser.username}
                                    onChange={this.onChangeemail}
                                />
                            </div>

                            <div className="form-group">
                                <label className="field1" htmlFor="password">Password</label>
                                <input
                                    type="current-password"
                                    className="form-control"
                                    id="password"
                                    value={currentUser.password}
                                    onChange={this.onChangepassword}
                                />
                            </div>


                            <div className="form-group">
                                <label className="field1" htmlFor="Avatar Image">Avatar Image</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="avatarImage"
                                    value={currentUser.avatarImageUrl}
                                    onChange={this.onChangeavatarImageUrl}
                                />
                            </div>

                            <div className="form-group">
                                <label className="field1" htmlFor="ChatStatus">Chat Status</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="chatStatus"
                                    value={currentUser.chatStatus}
                                    onChange={this.onChangechatStatus}
                                />
                            </div>

                            <div className="form-group">
                            <label className="field1" htmlFor="dob">Date of Birth</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="dob"
                                    value={currentUser.dob}
                                    onChange={this.onChangedob}
                                />
                            </div>

                            <div className="form-group">
                                <label className="field1" htmlFor="gender">Gender</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="gender"
                                    value={currentUser.gender}
                                    onChange={this.onChangegender}
                                />
                            </div>


                            <div className="form-group">
                                <label className="field1" htmlFor="resume">Resume (upload file format)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="resume"
                                    value={currentUser.resume}
                                    onChange={this.onChangeresume}
                                />
                            </div>
                        
                            
                            
                            
                                {/*<div className="form-group">
                                <label htmlFor="marks">User Status</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="userStatus"
                                    value={currentUser.userStatus}
                                    onChange={this.onChangeuserStatus}
                                />
                             </div>*/}


                                
                                <div className="form-group">
                                <label className="field1" htmlFor="selfIntro">Self Intro</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    requiredvalue={currentUser.selfIntro}
                                    onChange={this.onChangeselfIntro}
                                />
                            </div>
                        </form>
                      

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteUser} >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateUser}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Please click on a User...</p>
                        </div>
                    )}
            </div>
        );
    }
}
