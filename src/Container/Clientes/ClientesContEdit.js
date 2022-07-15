import React, {Component}  from "react";
import { ClientesPageEdit } from "../../Pages/Clientes/ClientesPageEdit";
import Swal from "sweetalert2";

export class ClientesContEdit extends Component{

    state = {
        updated: false,
        url: process.env.REACT_APP_API_URL
      }

    handleUpdateClientes= async (event,idxClientes,nombreCliente,nit,estado) => {
        event.preventDefault()
        const data = {
            idxClientes:idxClientes,
            nombreCliente: nombreCliente.toUpperCase(),
            nit: nit,
            estado:estado 
        }
        console.log(JSON.stringify(data))
        const requestOptions = {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(data)
        };
        fetch(`${this.state.url}/Clientes/?id=${idxClientes}`, requestOptions)
        .then(data => {
          console.log("sucess",data)
                Swal.fire({
                  icon: 'success',
                  title: 'Información actualizada exitosamente'
                }).then((result) => {
                  this.setState({updated:true})
                })
          })
          .catch(error => {
            console.log("Hubo un error", error)
            Swal.fire({
              icon: 'error',
              title: 'Hubo un error',
            }).then((result) => {
              window.location.reload()
            })
          })
      }

    render(){
        return(
            <ClientesPageEdit
            handleUpdateClientes={this.handleUpdateClientes} 
            updated={this.state.updated}/>
        )
    }
}