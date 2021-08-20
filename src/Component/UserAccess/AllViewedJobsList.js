import React, { Component } from "react";
import DataService from "../../Services/WebUserJobService";
import { Link } from "react-router-dom";

  export default class AllViewedJobList extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        jobs: []
      };
    }

  componentDidMount() {
    DataService.getViewedJobsList().then((res) =>{
      this.setState({jobs:res.data});
    });
  }

  render(){
    const{jobs} = this.state;
    return(
      <div>
        <h2 className="text-center">Viewed Jobs</h2>
        <div className="row">
          <table className = "table table-striped table-bordered">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Job Industry</th>
                <th>Job Qualification</th>
                <th>Job Description</th>
                <th>Autism Level</th>
                <th>Job Star Rating</th>
                <th>Job Position URL</th>
                <th>Company Name</th>
                <th>Company Star Rating</th>
                <th>Viewed Job Date</th>
                <th>Reviews</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.jobs.map(job => 
                <tr key = {job.jobid}>
                  <td>{job.jobTitle}</td>
                  <td>{job.jobIndustry}</td>
                  <td>{job.jobqualification}</td>
                  <td>{job.jobDescription}</td>
                  <td>{job.autismLevel}</td>
                  <td>{job.jobStarRating}</td>
                  <td>{job.jobPositionURL}</td>
                  <td>{job.companyname}</td>
                  <td>{job.companystarRating}</td>
                  <td>{job.dateViewed}</td>
                  <td><Link to={"/s/" + job.jobTitle + "/" + job.companyname}>Click to View Reviews</Link></td>
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
