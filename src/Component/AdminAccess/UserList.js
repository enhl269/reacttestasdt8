import React, { Component } from "react";
import UserDataService from "../../Services/UserService";
import { Link } from "react-router-dom";

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.removeAllUsers = this.removeAllUsers.bind(this);
    this.removeUser = this.removeUser.bind(this);
    

    this.state = {
      users: [],
      currentUser: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }


  retrieveUsers() {
    UserDataService.getUsers()
      .then(response => {
           
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        if(e.response.status === 403){
          UserDataService.getUserUseRefreshToken().then(resp=>{
            this.setState({
              users: e.resp.data
            });
            // this.refreshList();
            this.componentDidMount();
            console.log(e.resp.data);
          })
          .catch(e => {
            
            console.log(e);
          });
          }
      });
    }
  

  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index
    });
  }

  removeAllUsers() {
    UserDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  removeUser(id) {
    UserDataService.deleteUser(id)
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
        this.refreshList();
      });
      
  }


  render() {
    const { users, currentIndex } = this.state;

    return (
      <div>
          <h4>User List</h4>
          <ul className="list-group">
        
            {users &&
              users.map((user, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(user, index)}
                  key={index}
                >
                  {user.firstName} {user.lastName}
                  {user.roles}
                  <button type="button" //className="badge badge-success" 
                          onClick={()=>this.removeUser(user.id)}
                        >
                            Delete
                        </button> 
                        {/*<Link to={"/users/" + user.username} > Edit </Link>*/}
                </li>
              ))}
             
          </ul>
      </div>
    );
  }
}
