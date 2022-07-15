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
import NumberFormatNit from '../../Utils/NumberFormat/NumberFormatNit';

const useStyles = makeStyles({
    btnNuevo: {
        background: 'linear-gradient(45deg, #4caf50 30%, #6fbf73 90%)',
    },
    btnCancelar: {
      background: 'linear-gradient(45deg, #ED213A 30%, #ED213A 90%)',
  },
  });

export function ClientesPageNew(props) {

    const { handleSubmitClientes, insert } = props;
    const classes = useStyles();

    const [nombreCliente, setNombreCliente] = React.useState("")
    const [nit, setNIT] = React.useState("")

    const navigate = useNavigate();

    const handeleAtras = () =>{
        navigate("/Clientes/ClientesPageIndex")
    }

    React.useEffect(() => {
        if (insert) {
          navigate('/Clientes/ClientesPageIndex')
        }
      }, [insert, navigate])

        return (
           <Layout>
            <React.Fragment>
                <TableContainer component={Paper} style={{ margin: 8, padding: 35 }}  >
                    <h1 style={{ margin: 8 }}>Clientes</h1>
                    <h4 style={{ margin: 8 }}>Nuevo</h4>
                    <Divider/>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        handleSubmitClientes(event,nombreCliente,nit,true)
                    }}>
                        <Grid container spacing={1}>
                            <Grid item sm={12} md={6} xs={6} >
                                <TextField
                                autoComplete='off'
                                name="nombreCliente"
                                value={nombreCliente}
                                required
                                id="nombreCliente"
                                label="Nombre Cliente"
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
                                    setNombreCliente(e.target.value.replace(/[^a-zA-Z0-9ñÑ.# ]/gi, ''))
                                }}
                                />
                            </Grid>

                            <Grid item sm={12} md={6} xs={6} >
                                <TextField
                                autoComplete='off'
                                name="nit"
                                value={nit}
                                required
                                id="nit"
                                label="NIT"
                                margin="normal"
                                fullWidth
                                style={{ margin: 8 }}
                                size="small"
                                variant="outlined"
                                InputProps={{
                                    inputComponent: NumberFormatNit
                                  }}
                                  onChange={(e) => {
                                    setNIT(e.target.value)
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
                                                setNombreCliente("")
                                                setNIT("")
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