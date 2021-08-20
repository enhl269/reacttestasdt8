import React, { Component } from "react";
import DataService from "../../Services/WebUserJobService";
import { Link } from "react-router-dom";

  export default class JobCategoryList extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        categories: []
      };
    }

  componentDidMount() {
    DataService.getJobCategory().then((res) =>{
      this.setState({categories:res.data});
    });
  }

  render(){
    const{categories} = this.state;
    return(
      <div>
        <h2 className="text-center">Jobs per Category</h2>
        <div className="row">
        
        <table className = "table table-striped table-bordered">
            <thead>
              <tr>
                <th>Job Category</th>
                <th>Job Count</th>
                <th>View Jobs</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(this.state.categories).map((key, i) =>  
                <tr key = {i}>
                  <td>{key}</td>
                  <td>{this.state.categories[key]}</td>
                  <td><Link
                to={"/j/" + key}
              >
                Click to View Jobs
              </Link></td>
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
