import React, { Component } from "react";
import DataService from "../../Services/WebAdminService";
import { Link } from "react-router-dom";

  export default class ApprovedApplicantList extends Component {
    constructor(props) {
      super(props);
      this.rejectApplicant = this.rejectApplicant.bind(this);
      
      this.state = {
        applicants: []
      };
    }

  componentDidMount() {
    DataService.getApprovedApplicants().then((res) =>{
      this.setState({applicants:res.data});
    });
  }

  rejectApplicant(id){

    DataService.updateApplicant(
      id,"Blocked"            
  )
      .then(response => {
          console.log(response.data);
          //this.props.history.push('ApprovedReviewList')
          window.location.reload();
      })
      .catch(e => {
          console.log(e);
      });
  }

  render(){
    const{reviews} = this.state;
    return(
      <div>
        <h2 className="text-center">Approved Applicant List</h2>
        <div className="row">
          <table className = "table table-striped table-bordered">
            <thead>
              <tr>
                <th>Applicant ID</th>
                <th>Applicant Name</th>
                <th>Applicant Reviews</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.applicants.map(user => 
                <tr key = {user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.reviews.map(r =>
                    <div key = {r.id}>
                      <div>ID: {r.id}</div>
                      <div>Review Description: {r.reviewDescription}</div>
                      </div>)}
                      </td>
                  <td><button className="btn btn-primary" type = "button" onClick = {(e)=>this.rejectApplicant(user.id)}>Block</button></td>
                </tr>  
                  )
              }
            </tbody>
  
          </table>
        </div>
  
      </div>
    );
  
  }

}
