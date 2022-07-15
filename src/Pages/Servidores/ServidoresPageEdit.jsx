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
    Switch,
    Hidden
        } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import {useNavigate} from 'react-router-dom';
import AddBox from '@material-ui/icons/AddBox';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const useStyles = makeStyles({
    btnNuevo: {
        background: 'linear-gradient(45deg, #4caf50 30%, #6fbf73 90%)',
    },
    btnCancelar: {
      background: 'linear-gradient(45deg, #ED213A 30%, #ED213A 90%)',
  },
  btnServicios: {
    background: 'linear-gradient(45deg, #ef7b06 30%, #ef7b06 90%)',
},
  });

export function ServidoresPageEdit(props) {

    const { 
        handleUpdateServidores, 
        Clientes, 
        Servicios,
        successSubmitServicio,
        handleSubmitServicios
    } = props;

    const classes = useStyles();

    const memoria = JSON.parse(localStorage.getItem('servidor'))

    const [ipServidor, setIPServidor] = React.useState(memoria ? memoria.ipServidor :"")
    const [nombreServidor, setNombreServidor] = React.useState(memoria ? memoria.nombreServidor :"")

    const [idxCliente, setIdxCliente] = React.useState(memoria ? memoria.idxCliente :"")
    const [idxClienteText, setIdxClienteText] = React.useState("")

    React.useEffect(() => {
        const Input = Clientes.find(tipos => tipos.idxClientes === idxCliente)
        setIdxClienteText(Input ? Input.nombreCliente : "")
    }, [Clientes, idxCliente])


    const [estado, setEstado] = React.useState(memoria ? memoria.estado : false)

    const navigate = useNavigate();

    const handeleAtras = () =>{
        navigate("/Servidores/ServidoresPageIndex")
    }

    const handeleNuevo = () =>{
        navigate("/Servidores/ServidoresPageNew")
    }

      const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
      };
    
      const [state, setState] = React.useState({
        columnsServicios: [
            { title: 'Nombre Servicio', field: 'nombreServicio' },
            { title: 'Capacidad', field: 'capacidad' },
            { title: 'Umbral Alerta', field: 'umbralAlerta' }
        ],
      });

      const [hidden, setHidden] = React.useState(false)
      const [formServicios, setFormServicios] = React.useState(true)

      const [nombreServicio, setNombreServicio] = React.useState("")
      const [capacidad, setCapacidad] = React.useState("")
      const [umbralAlerta, setUmbralAlerta] = React.useState("")

    const verServicios = () => {
        setHidden(true)
        setFormServicios(false)
      }
    
      React.useEffect(() => {
        if (successSubmitServicio) {
          setHidden(true)
        }    
        setState(
          {
            columnsServicios: [
                { title: 'Nombre Servicio', field: 'nombreServicio' },
                { title: 'Capacidad', field: 'capacidad' },
                { title: 'Umbral Alerta', field: 'umbralAlerta' }
            ],
          }
        )
      }, [successSubmitServicio,navigate,Servicios])

        return (
           <Layout>
            <React.Fragment>
                <TableContainer component={Paper} style={{ margin: 8, padding: 35 }} hidden={hidden} >
                    <h1 style={{ margin: 8 }}>Servidores</h1>
                    <h4 style={{ margin: 8 }}>Editar</h4>
                    <Divider/>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        handleUpdateServidores(event,memoria.idxServidores,ipServidor,nombreServidor,idxCliente,estado)
                    }}>
                        <Grid container spacing={1}>
                        <Grid item sm={12} md={4} xs={4} >
                                <TextField
                                autoComplete='off'
                                name="ipServidor"
                                value={ipServidor}
                                required
                                id="ipServidor"
                                label="IP Servidor"
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
                                    setIPServidor(e.target.value.replace(/[^0-9.]/gi, ''))
                                }}
                                />
                            </Grid>

                            <Grid item sm={12} md={4} xs={4} >
                                <TextField
                                autoComplete='off'
                                name="nombreServidor"
                                value={nombreServidor}
                                required
                                id="nombreServidor"
                                label="Nombre Servidor"
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
                                    setNombreServidor(e.target.value.replace(/[^a-zA-Z0-9ñÑ.# ]/gi, ''))
                                }}
                                />
                            </Grid>

                            <Grid item sm={12} md={4} xs={4}>
                                <Autocomplete
                                    inputValue={idxClienteText}
                                    noOptionsText={'No hay opciones'}
                                    onChange={(event,value) => {
                                    setIdxCliente(
                                    value?value.idxClientes:"");
                                    }}
                                    onInputChange={(event, value) => {
                                        setIdxClienteText(value)
                                    }}
                                    options={Clientes}
                                    freeSolo
                                    getOptionLabel={option => (option.nombreCliente ? option.nombreCliente : "")}
                                    id="idxCliente"
                                    name="idxCliente"
                                    renderInput={(params) =>
                                    <TextField
                                        required
                                        {...params}
                                        style={{ margin: 8 }}
                                        autoComplete='off'
                                        margin="normal"
                                        variant="outlined"
                                        id="idxCliente"
                                        label="Nombre Cliente"
                                        height='100%'
                                        fullWidth
                                        size='small'
                                    />
                                    }
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

                            <Grid item xs={12} sm={3} md={3}>
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
                            <Grid item xs={12} sm={3} md={3}>
                                <Typography align= 'right'>
                                    <Tooltip title="Servicios" aria-label="add">
                                    <Button
                                        onClick={() => verServicios()}
                                        className={classes.btnServicios}
                                        variant="contained"
                                        color='primary'
                                        fullWidth
                                        style={{ margin: 8, fontWeight: 'bold' }}
                                        startIcon={<AddBox />}
                                        >Servicios
                                    </Button>
                                    </Tooltip>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={3} md={3}>
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
                            <Grid item xs={12} sm={3} md={3}>
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


          <TableContainer component={Paper} style={{ margin: 8, padding: 35 }} hidden={formServicios} >
          <h1 style={{ margin: 8 }}>Servicios</h1>
          <form onSubmit={(event) => {
            event.preventDefault()
            handleSubmitServicios(event, memoria.idxServidores,nombreServicio,capacidad,umbralAlerta,true)
            setHidden(true)
          }}>

            <Grid container spacing={1}>

              <Grid item sm={12} md={4} xs={4}>
                <TextField
                  disabled={hidden}
                  autoComplete='off'
                  name="ipServidor"
                  value={ipServidor}
                  id="ipServidor"
                  label="IP Servidor"
                  margin="normal"
                  fullWidth
                  style={{ margin: 8 }}
                  size="small"
                  variant="outlined"
                  inputProps={{
                    style: { textTransform: 'uppercase' },
                  }}
                  onChange={(e) => {
                    setIPServidor(e.target.value)
                  }}
                />
              </Grid>

              <Grid item sm={12} md={4} xs={4} >
                <TextField
                autoComplete='off'
                name="nombreServicio"
                value={nombreServicio}
                required
                id="nombreServicio"
                label="Nombre del Servicio"
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
                    setNombreServicio(e.target.value.replace(/[^a-zA-Z0-9ñÑ.# ]/gi, ''))
                }}
                />
            </Grid>

            <Grid item sm={12} md={2} xs={2} >
                <TextField
                autoComplete='off'
                name="capacidad"
                value={capacidad}
                required
                id="capacidad"
                label="Capacidad"
                margin="normal"
                fullWidth
                style={{ margin: 8 }}
                size="small"
                variant="outlined"
                inputProps={{
                    minLength: 1,
                    maxLength: 100
                }}
                onChange={(e) => {
                    setCapacidad(e.target.value.replace(/[^0-9]/gi, ''))
                }}
                />
            </Grid>

            <Grid item sm={12} md={2} xs={2} >
                <TextField
                autoComplete='off'
                name="umbralAlerta"
                value={umbralAlerta}
                required
                id="umbralAlerta"
                label="Umbral de Alerta"
                margin="normal"
                fullWidth
                style={{ margin: 8 }}
                size="small"
                variant="outlined"
                inputProps={{
                    minLength: 1,
                    maxLength: 100
                }}
                onChange={(e) => {
                    setUmbralAlerta(e.target.value.replace(/[^0-9]/gi, ''))
                }}
                />
            </Grid>
            



              <Grid item md={12} sm={12}>
                <Typography align='center'>
                  <Button 
                    type="submit" 
                    className={classes.btnNuevo}
                    variant="contained" 
                    color="primary"
                    style={{ margin: 8, width: 150, fontWeight: 'bold' }} 
                    startIcon={<AddBox />}
                    >Añadir
                  </Button>
                  <Button 
                    color="secondary" 
                    variant="contained" 
                    style={{ margin: 8, width: 150 }} 
                    startIcon={<CancelIcon />}
                    onClick={() => {
                      setHidden(!Hidden);
                      setFormServicios(!formServicios)
                      setNombreServicio("")
                      setCapacidad("")
                      setUmbralAlerta("")
                    }}
                  >Cancelar
                  </Button>
                </Typography>
              </Grid>


            </Grid>

            <Grid container spacing={1} >
          <Grid item sm={12} md={12}  >
            <MaterialTable
              style={{ margin: 5, padding: 25 }}
              title={nombreServidor.toUpperCase()}
              columns={state.columnsServicios.map((c) => ({ ...c, tableData: undefined }))}
              icons={tableIcons}
              //actions={actionsPemisos}
              key={Servicios}
              data={Servicios}
              options={{
                actionsColumnIndex: -1,
                rowStyle: {
                  backgroundColor: '#EEE',
                }
              }}
              localization={{
                toolbar: {
                  searchTooltip: 'Buscar',
                  searchPlaceholder: 'Buscar',
                },
                pagination: {
                  firstTooltip: 'Primera página',
                  previousTooltip: 'Página anterior',
                  nextTooltip: 'Página siguiente',
                  lastTooltip: 'Última Página',
                  labelRowsSelect: 'Filas',
                  labelDisplayedRows: '{count} - {from} de {to}'
                },
                header: {
                  actions: 'Acciones'
                },
                body: {
                  emptyDataSourceMessage: 'No hay registros que mostrar',
                }
              }}
            />
          </Grid>
        </Grid>
          </form>
        </TableContainer>

        

        </React.Fragment>
      </Layout>
        );
}