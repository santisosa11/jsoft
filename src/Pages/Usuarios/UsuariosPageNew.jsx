import React from 'react';
import { Layout } from '../../Component/Layout';
import { 
    Button, 
    TextField, 
    Typography, 
    TableContainer, 
    Paper, 
    Grid,
    Tooltip,
    Divider
        } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import {useNavigate} from 'react-router-dom';

const useStyles = makeStyles({
    btnNuevo: {
        background: 'linear-gradient(45deg, #4caf50 30%, #6fbf73 90%)',
    },
    btnCancelar: {
      background: 'linear-gradient(45deg, #ED213A 30%, #ED213A 90%)',
  },
  });

export function UsuariosPageNew(props) {

    const { handleSubmitUsuarios, insert } = props;
    const classes = useStyles();

    const [nombres, setNombres] = React.useState("")
    const [usuario, setUsuario] = React.useState("")
    const [contrasena, setContrasena] = React.useState("")

    const navigate = useNavigate();

    const handeleAtras = () =>{
        navigate("/Usuarios/UsuariosPageIndex")
    }

    React.useEffect(() => {
        if (insert) {
          navigate('/Usuarios/UsuariosPageIndex')
        }
      }, [insert, navigate])

        return (
           <Layout>
            <React.Fragment>
                <TableContainer component={Paper} style={{ margin: 8, padding: 35 }}  >
                    <h1 style={{ margin: 8 }}>Usuarios</h1>
                    <h4 style={{ margin: 8 }}>Nuevo</h4>
                    <Divider/>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        handleSubmitUsuarios(event,nombres,usuario,contrasena,true)
                    }}>
                        <Grid container spacing={1}>
                            <Grid item sm={12} md={5} xs={5} >
                                <TextField
                                autoComplete='off'
                                name="nombres"
                                value={nombres}
                                required
                                id="nombres"
                                label="Nombres y Apellidos"
                                margin="normal"
                                fullWidth
                                style={{ margin: 8 }}
                                size="small"
                                variant="outlined"
                                inputProps={{
                                    style: { textTransform: 'uppercase' },
                                    minLength: 2,
                                    maxLength: 100
                                }}
                                onChange={(e) => {
                                    setNombres(e.target.value.replace(/[^a-zA-Z0-9ñÑ.# ]/gi, ''))
                                }}
                                />
                            </Grid>

                            <Grid item sm={12} md={4} xs={4} >
                                <TextField
                                autoComplete='off'
                                name="usuario"
                                value={usuario}
                                required
                                id="usuario"
                                label="Usuario"
                                margin="normal"
                                fullWidth
                                style={{ margin: 8 }}
                                size="small"
                                variant="outlined"
                                  onChange={(e) => {
                                    setUsuario(e.target.value.replace(/[^a-zA-Z0-9]/gi, ''))
                                  }}
                                />
                            </Grid>

                            <Grid item sm={12} md={3} xs={3}>
                                <TextField
                                type='password'
                                autoComplete='off'
                                required
                                value={contrasena}
                                name="contrasena"
                                id="contrasena"
                                label="Contraseña"
                                margin="normal"
                                fullWidth
                                style={{ margin: 8 }}
                                size="small"
                                variant="outlined"
                                onChange={(e) => {
                                    setContrasena(e.target.value.replace(/[ ]/gi, ''))
                                }}
                                inputProps={{
                                    minLength: 2,
                                    maxLength: 40
                                }}
                                />
                        </Grid>

                            <Grid item xs={12} sm={4} md={4}>
                                <Typography align= 'right'>
                                <Tooltip title="Guardar" aria-label="add">
                                        <Button
                                            type="submit"
                                            //className={classes.btnAdicionar}
                                            color="primary"
                                            variant="contained"
                                            style={{ margin: 8 }}
                                            fullWidth
                                            startIcon = {<SaveIcon/>}
                                            >Guardar</Button>
                                            </Tooltip>
                                            </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={4} md={4}>
                                            <Typography align= 'right'>
                                            <Tooltip title="Nuevo" aria-label="add">
                                        <Button
                                            color="secondary"
                                            className={classes.btnNuevo}
                                            variant="contained"
                                            style={{ margin: 8 }}
                                            fullWidth
                                            startIcon = {<NewReleasesIcon />}
                                            onClick={()=>{
                                                setNombres("")
                                                setUsuario("")
                                                setContrasena("")
                                            }}
                                            >Nuevo</Button>
                                    </Tooltip>
                                </Typography>
                            </Grid>   
                            <Grid item xs={12} sm={4} md={4}>
                                <Typography align= 'center'>
                                    <Tooltip title="Cancelar" aria-label="add">
                                    <Button
                                        className={classes.btnCancelar}
                                        color="secondary"
                                        variant="contained"
                                        style={{ margin: 8 }}
                                        fullWidth
                                        startIcon = {<CancelIcon/>}
                                        onClick={handeleAtras}
                                        >Cancelar</Button>
                                    </Tooltip>
                                </Typography>
                            </Grid>            
                    
                        </Grid>
                    </form>
                </TableContainer>
        </React.Fragment>
      </Layout>
        );
}