import React, { Component } from "react";
import DataService from "../../Services/WebUserJobService";
import { Link } from "react-router-dom";
import ReactSelect from 'react-select'
import JobsCard from './JobsCard'; 



  export default class AllJobsList extends Component {
    constructor(props) {
      super(props);
      this.addBookmark = this.addBookmark.bind(this);
      this.addViewJobEmail = this.addViewJobEmail.bind(this);
      this.addViewJobURL = this.addViewJobURL.bind(this);
      
      this.state = {
        jobs: [],
        query: ""
      };
    }



    onChange = e => {
      const { value } = e.target;
      this.setState({
        query: value
      });
  
      this.search(value);
    };

    search = query => {
      const token = {};
      this.token = token;
  
      DataService.getJobsSearchCriteria(query)
        .then((res) => {
          if (this.token === token) {
            this.setState({jobs:res.data});
          }
        });
    };
  componentDidMount() {
    DataService.getAllJobs().then((res) =>{
      this.setState({jobs:res.data});
    });
    this.search("");
  }

  addBookmark(id){
    DataService.saveBookmarkJob(id).then(response => {console.log(response.data);
          this.props.history.push('AllBookmarkJobList')
          //window.location.reload();
      }).catch(e => {console.log(e);});
  }

  addViewJobEmail(id){
    DataService.applyJobEmail(id)
      .then(response => {
          console.log(response.data);
          this.props.history.push('AllViewedJobsList')
          //window.location.reload();
      })
      .catch(e => {
          console.log(e);
      });
  }

  addViewJobURL(id){

    DataService.applyJobURL(id)
      .then(response => {
          console.log(response.data);
          this.props.history.push('AllViewedJobsList')
          //window.location.reload();
      })
      .catch(e => {
          console.log(e);
      });
  }


  render(){
   
      const{jobs} = this.state;

    return(
      <div className="App">



        <div className="title">
        <h3>All Jobs</h3>
          <input type="text" className="search-box" placeholder="Search..." onChange={this.onChange}/>
          </div>
          <i className="search icon"></i>
  

        <div className= "cards-container">
           {this.state.jobs.map(job  => (
             <JobsCard jobs={job} key={job.jobid}/>
             ))}  
        </div>

        </div>
        
    );
  }
}
  