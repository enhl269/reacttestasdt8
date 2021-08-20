import React, { Component } from "react";
import UserService from "../Services/UserService";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core/styles";
import HowToRegOutlined from '@material-ui/icons/HowToRegOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Alert from '@material-ui/lab/Alert'
import { FormControl } from "@material-ui/core";


const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  inputLabel: {
    margin: theme.spacing(36,1),
    marginLeft: theme.spacing(30),
  },
});

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.onChangefirstName = this.onChangefirstName.bind(this);
    this.onChangelastName = this.onChangelastName.bind(this);
    this.onChangeuserStatus = this.onChangeuserStatus.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangecontactNumber = this.onChangecontactNumber.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.onChangeavatarImageUrl = this.onChangeavatarImageUrl.bind(this);
    this.onChangechatStatus = this.onChangechatStatus.bind(this);
    this.onChangedob = this.onChangedob.bind(this);
    this.onChangegender = this.onChangegender.bind(this);
    this.onChangeresume = this.onChangeresume.bind(this);
    this.onChangeselfIntro = this.onChangeselfIntro.bind(this);
    this.saveStudent = this.saveStudent.bind(this);

    this.state = {
      currentStudent: {
        firstName: "",
        lastName: "",
        username: "",
        contactNumber: "",
        avatarImageUrl: "",
        chatStatus: "",
        dob: "",
        gender: "",
        resume: "",
        selfIntro: "",
        userStatus: ""
      },

    };
  }

  onChangefirstName(e) { this.setState({ firstName: e.target.value }); }
  onChangelastName(e) { this.setState({ lastName: e.target.value }); }
  onChangeuserStatus(e) { this.setState({ userStatus: e.target.value }); }
  onChangeemail(e) { this.setState({ username: e.target.value }); }
  onChangecontactNumber(e) { this.setState({ contactNumber: e.target.value }); }
  onChangepassword(e) { this.setState({ password: e.target.value }); }
  onChangeavatarImageUrl(e) { this.setState({ avatarImageUrl: e.target.files }); }
  onChangechatStatus(e) { this.setState({ chatStatus: e.target.value }); }
  onChangedob(e) { this.setState({ dob: e.target.value }); }
  onChangegender(e) { this.setState({ gender: e.target.value }); }
  onChangeresume(e) { this.setState({ resume: e.target.files }); }
  onChangeselfIntro(e) { this.setState({ selfIntro: e.target.value }); }


  saveStudent() {
    var data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      contactNumber: this.state.contactNumber,
      password: this.state.password,
      //avatarImageURl:this.state.avatarImageUrl[0],
      chatstatus: this.state.chatStatus,
      dob: this.state.dob,
      gender: this.state.gender,
      //resumeURl:this.state.resume[0],
      selfIntroduction: this.state.selfIntro,
      userStatus: this.state.userStatus
    };
    let username = this.state.username;
    let avatarImageURl = this.state.avatarImageUrl[0];
    let resumeURl = this.state.resume[0];

    UserService.createStudent(data)
      .then(response => {
        this.setState({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          username: response.data.username,
          contactNumber: response.data.contactNumber,
          password: response.data.password,
          //avatarImageUrl:response.data.avatarImageUrl,
          chatStatus: response.data.chatStatus,
          dob: response.data.dob,
          gender: response.data.gender,
          //resume:response.data.resume,
          selfIntro: response.data.selfIntro,
          userStatus: response.data.userStatus
        });
        console.log(response.data);
        UserService.uploadAvatar(username, avatarImageURl).then(response => {
          console.log(response.data);

          UserService.uploadResume(username, resumeURl).then(response => {
            console.log(response.data);
            UserService.getAvatarFiles(username).then(response => {
              if (response.data !== null) {
                localStorage.setItem("image", response.data);
                // this.props.history.push("/Login");
              }
              console.log(response.data);
            }).catch(e => {
              console.log(e);
            });
          }).catch(e => {
            console.log(e);
          });
        }).catch(e => {
          console.log(e);
        });
      })
      .catch(e => {
        console.log(e);
      });

    // StudentService.uploadAvatar(username, avatarImageURl).then(response=>{
    //   console.log(response.data);
    // }).catch(e => {
    //   console.log(e);
    // });

    // StudentService.uploadResume(username, resumeURl).then(response=>{
    //   console.log(response.data);
    // }).catch(e => {
    //   console.log(e);
    // });
  }

  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <HowToRegOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <FormControl variant="filled" className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={this.state.firstName}
                  onChange={this.onChangefirstName}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.onChangelastName}
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={this.state.username}
                  onChange={this.onChangeemail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="contactNumber"
                  label="Contact Number"
                  name="contactNumber"
                  autoComplete="contactNumber"
                  value={this.state.contactNumber}
                  onChange={this.onChangecontactNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.onChangepassword}
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  id="date"
                  label="Birthday"
                  type="date"
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.state.dob}
                  onChange={this.onChangedob}
                />
              </Grid>
              <Grid item xs={12} sm={6}>      
              <InputLabel className={classes.inputLabel} id="demo-simple-select-filled-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="gender"
                  fullWidth
                  value={this.state.gender}
                  onChange={this.onChangegender}
                >
                  <MenuItem value="">
                  <em>Gender</em></MenuItem>
                  <MenuItem value={'Male'}>Male</MenuItem>
                  <MenuItem value={'Female'}>Female</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="selfIntro"
                  label="Self Introduction"
                  id="selfIntro"
                  value={this.state.selfIntro}
                  onChange={this.onChangeselfIntro}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="file"
                  name="avatarImage"
                  label="Upload Your Avatar Image Here"
                  id="avatarImage"
                  onChange={this.onChangeavatarImageUrl}  
                  InputLabelProps={{
                    shrink: true,
                  }}

                />
              </Grid>

              <Grid item xs={12}>
                
                <TextField
                  variant="outlined"
                  fullWidth
                  type="file"
                  name="resume"
                  label="Upload Your Resume Here"
                  id="resume"
                  onChange={this.onChangeresume}
                  InputLabelProps={{
                    shrink: true,
                  }}

                />
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.saveStudent}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>


            </Grid>
          </FormControl>
        </div>
      </Container>
      
    );
  }
}

export default withStyles(useStyles)(CreateUser);
