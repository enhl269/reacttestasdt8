import '../../Css/JobsCard.css';
import AllJobsList from './AllJobsList';
import { Link } from "react-router-dom";
import StarRatingComponent from 'react-star-rating-component';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const JobsCard = ({ jobs }) => {
    return (
        <div className="card">
            <div className="logo"></div>

            <div className="card_title">  {jobs.companyname}  </div>

            <td className="card_subtitle"><Link to={"/job/detail/" + jobs.jobid + "/" + jobs.jobTitle + "/" + jobs.companyname} target="_blank">{jobs.jobTitle}</Link>
                {/* <StarRatingComponent 
                   name="rate1" 
                   editing={false}
                   renderStarIcon={() => <span>★</span>}
                   starCount={5}
                   value={jobs.jobStarRating}
                   />  */}
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating name="read-only" value={jobs.jobStarRating} precision={0.1} readOnly />
                </Box>
            </td>
            <div className="card_qualification">  {jobs.jobqualification}  </div>

            <div id="card_info_container">
                <div className="card_info"> ASD {jobs.autismLevel}</div>
                <div className="card_info">{jobs.jobIndustry}</div>
            </div>

        </div>
    )
};

export default JobsCard;



