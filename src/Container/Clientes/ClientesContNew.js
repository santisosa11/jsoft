import React, {Component}  from "react";
import { ClientesPageNew } from "../../Pages/Clientes/ClientesPageNew";
import Swal from "sweetalert2";

export class ClientesContNew extends Component{

    state = {
        Clientes: [],
        insert: false,
        url: process.env.REACT_APP_API_URL
        }

        componentDidMount = () => {
            fetch(`${this.state.url}/Clientes`)
              .then(Response => Response.json())
              .then(Json => this.setState({ Clientes: Json }));
          }
        
    handleSubmitClientes = async (event,nombreCliente,nit,estado) => {
        event.preventDefault()
        const repetidoCliente = this.state.Clientes.find(act => act.nombreCliente.toUpperCase() === nombreCliente.toUpperCase() ||
        act.nit === nit)
        if(repetidoCliente){
          Swal.fire({
            icon: 'error',
            title: 'El nombre del cliente o NIT ya se encuentra registrado',
          })
        }else{
          const data = {
              nombreCliente: nombreCliente.toUpperCase(),
              nit: nit,
              estado: estado
          }
          console.log(JSON.stringify(data))
          const requestOptions = {
              method: 'POST',
              headers: {
              "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
          };
          Swal.fire({
              title:'Procesando',
              showConfirmButton: false,
              allowOutsideClick:false
          })
          Swal.showLoading()
          fetch(`${this.state.url}/Clientes`, requestOptions)
          .then(data => {
              console.log("sucess", data)
              Swal.fire({
                icon: 'success',
                title: 'Información guardada exitosamente'
              }).then((result) => {
                this.setState({ insert: true })
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
    }

    render(){
        return(
            <ClientesPageNew
            handleSubmitClientes={this.handleSubmitClientes} 
            insert={this.state.insert}
            />
        )
    }
}