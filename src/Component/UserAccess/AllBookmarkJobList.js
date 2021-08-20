import React, { Component } from "react";
import DataService from "../../Services/WebUserJobService";
import { Link } from "react-router-dom";
import StarRatingComponent from 'react-star-rating-component';
import '../../Css/Allbookmark.css';

  export default class AllBookmarkJobList extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        jobs: []
      };
    }


  componentDidMount() {
    DataService.getBookmarkJobsList().then((res) =>{
      this.setState({jobs:res.data});
    });
  }

  render(){
    const{jobs} = this.state;
    return(
      <div className="App">

        <div >
        <h3>Bookmarked Jobs</h3>
          
        </div>


        <div className= "cards-container">
        {this.state.jobs.map(job => 
                <tr key = {job.reviewDescription}>
            <div className= "card">
              
                
                <div className="card_title">  {job.companyname}  </div>

                <td className="card_subtitle"><Link to={"/job/detail/" + job.jobid} target="_blank">{job.jobTitle}</Link>
                   <StarRatingComponent 
                      name="rate1" 
                       editing={false}
                       renderStarIcon={() => <span>★</span>}
                       starCount={5}
                       value={job.jobStarRating}
                    /> 
                </td>

                <div>
                    <div className="field">Date Bookmarked:</div>
                    <div className="card_info"> {job.bookmarkDate}</div>
                </div>
            
            </div>
            </tr>
            )}
              </div>  
        </div>

    );
  }
}
