import React, {Component}  from "react";
import { ClientesPageIndex } from "../../Pages/Clientes/ClientesPageIndex";
import Swal from "sweetalert2";

export class ClientesContIndex extends Component{

    state = {
        Clientes: [],
        url: process.env.REACT_APP_API_URL
      }

      componentDidMount = () => {
        fetch(`${this.state.url}/Clientes`)
          .then(Response => Response.json())
          .then(Json => this.setState({ Clientes: Json.reverse() }));
      }

      changeEstado = (rowData) => {
        Swal.fire({
          title: 'Procesando...',
          showConfirmButton: false,
          allowOutsideClick: false
        })
        Swal.showLoading()
        const id = rowData.idxClientes
        //Realizar cambio en BD 
        const data = {
            idxClientes: rowData.idxClientes,
            nombreCliente: rowData.nombreCliente.toUpperCase(),
            nit: rowData.nit.toUpperCase(),
            estado: !rowData.estado
        }
        const requestOptions = {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(data)
        };
        fetch(`${this.state.url}/Clientes/?id=${id}`, requestOptions)
        .then(data => {
          console.log("sucess",data)
                Swal.fire({
                  icon: 'success',
                  title: 'Estado actualizado exitosamente'
                })
                .then((result) => {
                  //Actualizar visualización
                  const newEstado = this.state.Clientes.map(change =>
                    change.idxClientes === id
                          ? { ...change, estado: !change.estado }
                          : change
                  )
                  this.setState({
                    Clientes: newEstado,
                  })
              })
    
          })
      }

    render(){
        return(
            <ClientesPageIndex
            Clientes={this.state.Clientes}
            changeEstado={this.changeEstado}/>
        )
    }
}