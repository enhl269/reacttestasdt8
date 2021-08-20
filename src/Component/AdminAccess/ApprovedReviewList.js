import React, { Component } from "react";
import DataService from "../../Services/WebAdminService";
import { Link } from "react-router-dom";

  export default class ApprovedReviewList extends Component {
    constructor(props) {
      super(props);
      this.rejectReview = this.rejectReview.bind(this);
      
      this.state = {
        reviews: []
      };
    }

  componentDidMount() {
    DataService.getApprovedReviews().then((res) =>{
      this.setState({reviews:res.data});
    });
  }

  rejectReview(id){

    DataService.updateReview(
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
        <h2 className="text-center">Approved Review List</h2>
        <div className="row">
          <table className = "table table-striped table-bordered">
            <thead>
              <tr>
                <th>Review ID</th>
                <th>Review Stars</th>
                <th>Review Description</th>
                <th>Review Date</th>
                <th>Review User</th>
                <th>Review Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.reviews.map(review => 
                <tr key = {review.id}>
                  <td>{review.id}</td>
                  <td>{review.reviewstars}</td>
                  <td>{review.reviewDescription}</td>
                  <td>{review.reviewDate}</td>
                  <td>{review.reviewStatus}</td>
                  <td><button className="btn btn-primary" type = "button" onClick = {(e)=>this.rejectReview(review.id)}>Reject</button></td>
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
