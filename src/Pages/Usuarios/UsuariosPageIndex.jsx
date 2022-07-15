import React from 'react';
import { Layout } from '../../Component/Layout';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import {FormControlLabel,Switch,Grid} from '@material-ui/core';
import { AddBox as AddIcon } from "@material-ui/icons";
import { Edit as EditIcon } from "@material-ui/icons";
import AddBox from '@material-ui/icons/AddBox';
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

export function UsuariosPageIndex(props) {

    const {
        Usuarios,
        changeEstado
      } = props

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
        columns: [
          { title: 'Nombre y Apellidos', field: 'nombres' },
          { title: 'Usuario', field: 'usuario' },
          { title: 'Estado', field: "estado", render: "" }
        ],
      });
      
      React.useEffect(() => {
         setState(
           {
             columns: [
                { title: 'Nombre y Apellidos', field: 'nombres' },
                { title: 'Usuario', field: 'usuario' },
                { title: 'Estado', field: "estado", render: ((rowData) => {
                    return (
                    <FormControlLabel
                        checked={rowData.estado}
                        label={rowData.estado ? "Activado" : "Desactivado"}
                        labelPlacement="end"
                        control={<Switch color="primary" />}
                        onChange={() => {
                          changeEstado(rowData)
                        }}
                    />
                    )
                }
                )
                }
           ],
         }
       )
     },[changeEstado])

      const actions = [
        {
          icon: () => <Link to="/Usuarios/UsuariosPageNew"><AddIcon color="action"/></Link>,
          tooltip: 'Nuevo',
          isFreeAction: true,
        },
        {
          icon: () => <Link to="/Usuarios/UsuariosPageEdit"><EditIcon color="action"/></Link>,
          tooltip: 'Editar',
          onClick: (event, rowData) => {
            const memoria = rowData
            localStorage.setItem('usuario', JSON.stringify(memoria))
          }
          
        },
      ];
        return (
            <Layout>
            <React.Fragment>
                <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                    <MaterialTable
                        title={<h1>Usuarios</h1>}
                        style={{margin: 2, padding:20}}
                        columns={state.columns.map((c) => ({ ...c, tableData: undefined }))}
                        key={Usuarios}
                        data={Usuarios}
                        icons={tableIcons}
                        actions={actions}
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
            </React.Fragment>
        </Layout>
        );
}