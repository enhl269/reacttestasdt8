import React, { Component } from "react";
import DataService from "../../Services/WebUserJobService";
import DataService1 from "../../Services/WebUserReviewService";
import '../../Css/JobDetail.css';
import { Link } from "react-router-dom";
import ReactSelect from 'react-select';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
import {ReactComponent as Logo} from '../../images/button_save.svg';


export default class JobDetail extends Component{
    constructor(props) {
      super(props);
      this.addBookmark = this.addBookmark.bind(this);
      this.addViewJobEmail = this.addViewJobEmail.bind(this);
      this.addViewJobURL = this.addViewJobURL.bind(this);
      this.reviewListJCCatergory = this.reviewListJCCatergory.bind(this);
     
      this.state = {
        job : [], 
        reviews : []
      };
    }
  
      componentDidMount() {
        DataService.getJobDetail(this.props.match.params.id).then((res) =>{
          this.setState({job:res.data});
        });

        DataService1.getReviewByJobandCompany(this.props.match.params.id2,this.props.match.params.id3).then((res) =>{
          this.setState({reviews:res.data});
        });
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
     
      reviewListJCCatergory(jobtitle,companyname){
        DataService1.getReviewByJobandCompany(jobtitle,companyname)
          .then(response => {
              console.log(response.data);
              this.props.history.push('ApprovedReviewList')
              //window.location.reload();
            
          })
          .catch(e => {
              console.log(e);
          });
      }
    
  render(){
    const{job} = this.state;
    const{reviews} = this.state;

  return(
    <div>
    <div class="jobdetail_container">
    

    <div className="part1">
      <div className="jobcompany">{job.companyname} 
      <StarRatingComponent 
        name="rate1" 
        editing={false}
        renderStarIcon={() => <span>★</span>}
        starCount={5}
        value={job.companystarRating}
      />
      </div>


      <div className="jobtitle">{job.jobTitle}
      <StarRatingComponent 
        name="rate1" 
        editing={false}
        renderStarIcon={() => <span>★</span>}
        starCount={5}
        value={job.jobStarRating}
      />
      </div>


      <div ><button type = "button" className="bookmarkbtn" onClick = {(e)=>this.addBookmark(job.jobid)}><Logo/>  </button></div>
       </div>


      <div className="fields">Job Description</div>
      <div className="contents">{job.jobDescription}</div>

      <div className="fields">Job Qualification</div>
      <div className="contents">{job.jobqualification}</div>

      <div className="fields">Job Industry</div>
      <div className="contents">{job.jobIndustry}</div>

      <div className="fields">Autism Level</div>
      <div className="contents">{job.autismLevel}</div>

      <div>
          <button className="button" type = "button" onClick = {(e)=>this.addViewJobEmail(job.jobid)}><span>Apply By Email</span></button>
          <button className="button" type = "button" onClick = {(e)=>this.addViewJobURL(job.jobid)}><span>Apply By URL</span></button>
      </div>
      </div>

      
       <table className = "table ">
         <thead>
            <tr>
              <th>Review Stars</th>
              <th>Review Description</th>
              <th>Review Date</th>
            </tr>
          </thead>

       <tbody>
            {
             this.state.reviews.map(review => (
             <tr key = {review.id}>
                <td><StarRatingComponent 
        name="rate1" 
        editing={false}
        renderStarIcon={() => <span>★</span>}
        starCount={5}
        value={review.reviewstars}
      /></td>
                <td>{review.reviewDescription}</td>
                <td>{review.reviewDate}</td>
              </tr>  
              ))
            }
        </tbody>

        </table>
    </div>
    );
  }
}
