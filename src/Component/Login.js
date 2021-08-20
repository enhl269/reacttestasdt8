import React, { Component } from "react";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';



import AuthService from "../_helpersvc/authservice";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});



class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
    }

  }



  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    const FormData = require('form-data');
    const form = new FormData();
    form.append('username',this.state.username);
    form.append('password',this.state.password)
    AuthService.login(form).then(response => {
      console.log(response.data); 
      localStorage.setItem("user", response.data.access_token);
      localStorage.setItem("userRefreshToken", response.data.refresh_token);
      localStorage.setItem("roles", response.data.roles);
      localStorage.setItem("username", response.data.username);
      // this.props.history.push("/AllJobsList");
      window.location.href = '/AllJobsList';
      
  })
  .catch(e => {
      console.log(e);
  });
  
  }
  

  render() {
    const { classes } = this.props;
    return (
      <Container  maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Avatar className={classes.avatar} >
          <LockOutlinedIcon />
        </Avatar >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>


          <form className={classes.form}  noValidate
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={this.state.username}
            onChange={this.onChangeUsername}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={this.state.password}
            onChange={this.onChangePassword}
          />

            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            
          </form>
          </div>
      </Container>
    );
  }

}

export default withStyles(useStyles)(Login);