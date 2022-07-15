import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link'
import LockOpenTwoToneIcon from '@material-ui/icons/LockOpenTwoTone';
import AccountBoxTwoToneIcon from '@material-ui/icons/AccountBoxTwoTone';
import VpnKeyTwoToneIcon from '@material-ui/icons/VpnKeyTwoTone';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../../Utils/Images/Desing_Images/Logo.PNG'
import Color from '../../Utils/conts/color'
import InputAdornment from '@material-ui/core/InputAdornment';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useNavigate } from 'react-router-dom';

//CSS
const themeBackground = createMuiTheme({
  palette: {
    background: {
      default: "white"
    }
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[50],
    margin: theme.spacing(4),
    padding: theme.spacing(3)
  },
  image: {
    backgroundImage: `url(${Logo})`,
    //backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: '90% 60%',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: theme.spacing(52)
  },
  avatar: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    backgroundColor: Color.azul,
    color: Color.negro
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    marginTop: theme.spacing(2),
    backgroundColor: Color.azul,
    color: Color.negro,
    '&:hover': {
      color: Color.negro,
      backgroundColor: Color.azul
    }
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        JSoft
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function LoginPage({ handleSubmit, found }) {
  const navigate = useNavigate();
  const classes = useStyles();
  const [usuario, setUsuario] = React.useState("")
  const [password, setPassword] = React.useState("")

  React.useEffect(() => {
    if (found) {
      navigate('/Home')
    }
  }, [found,navigate])

  return (
    <MuiThemeProvider theme={themeBackground}>
      <CssBaseline />
      <Box boxShadow={3} borderRadius={15} className={classes.root}>
        <Grid container component="main" >
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} elevation={6} >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOpenTwoToneIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Iniciar Sesión
              </Typography>
              <form className={classes.form} onSubmit={(event) => {
                handleSubmit(event, usuario, password)
              }}>
                <TextField
                  autoComplete='off'
                  required
                  value={usuario}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="usuario"
                  label="Usuario"
                  name="usuario"
                  autoFocus
                  onChange={(e) => {
                    setUsuario(e.target.value.replace(/[^a-zA-Z0-9@.]/gi, ''));
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountBoxTwoToneIcon style={{ color: Color.azul }} />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    minLength: 3,
                    maxLength: 40,
                  }}
                />
                <TextField
                  autoComplete='off'
                  required
                  value={password}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  onChange={(e) => {
                    setPassword(e.target.value.replace(/[\s]/gi, ''));
                  }}
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyTwoToneIcon style={{ color: Color.azul }} />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    minLength: 3,
                    maxLength: 20
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  //href="/Home"
                >INGRESAR</Button>
              </form>
              <Box pt={4}>
                <Copyright />
              </Box>
            </div>
          </Grid>
        </Grid>
      </Box>
    </MuiThemeProvider>
  );
}