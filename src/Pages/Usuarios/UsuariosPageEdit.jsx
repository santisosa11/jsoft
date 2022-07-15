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
    Divider,
    FormControlLabel,
    Switch
        } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
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

export function UsuariosPageEdit(props) {

    const { handleUpdateUsuarios, updated } = props;
    const classes = useStyles();

    const memoria = JSON.parse(localStorage.getItem('usuario'))

    const [nombres, setNombres] = React.useState(memoria ? memoria.nombres :"")
    const [usuario, setUsuario] = React.useState(memoria ? memoria.usuario :"")
    const [contrasena, setContrasena] = React.useState(memoria ? memoria.contrasena :"")
    const [estado, setEstado] = React.useState(memoria ? memoria.estado : false)

    const navigate = useNavigate();

    const handeleAtras = () =>{
        navigate("/Usuarios/UsuariosPageIndex")
    }

    const handeleNuevo = () =>{
        navigate("/Usuarios/UsuariosPageNew")
    }

    React.useEffect(() => {
        if (updated) {
          navigate('/Usuarios/UsuariosPageIndex')
        }
      }, [updated,navigate])

        return (
           <Layout>
            <React.Fragment>
                <TableContainer component={Paper} style={{ margin: 8, padding: 35 }}  >
                    <h1 style={{ margin: 8 }}>Usuarios</h1>
                    <h4 style={{ margin: 8 }}>Editar</h4>
                    <Divider/>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        handleUpdateUsuarios(event,memoria.idxUsuarios,nombres,usuario,contrasena,estado)
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

                            <Grid xs={12} md={12} sm={12}>
                                <FormControlLabel
                                    checked={estado}
                                    value={estado}
                                    label="Estado"
                                    labelPlacement="start"
                                    control={<Switch color="primary" />}
                                    style={{ margin: 8}}
                                    variant="outlined"
                                    size="small"
                                    onChange={() => {
                                        setEstado(!estado)
                                    }}
                                /> 
                            </Grid>

                            <Grid item xs={12} sm={4} md={4}>
                                <Typography align= 'right'>
                                    <Tooltip title="Actualizar" aria-label="add">
                                        <Button
                                            type="submit"
                                            //className={classes.btnAdicionar}
                                            color="primary"
                                            variant="contained"
                                            style={{ margin: 8 }}
                                            fullWidth
                                            startIcon = {<EditIcon/>}
                                            >Actualizar</Button>
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
                                            onClick={handeleNuevo}
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