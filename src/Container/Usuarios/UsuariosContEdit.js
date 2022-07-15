import React, {Component}  from "react";
import { UsuariosPageEdit } from "../../Pages/Usuarios/UsuariosPageEdit";
import Swal from "sweetalert2";

export class UsuariosContEdit extends Component{

    state = {
        updated: false,
        url: process.env.REACT_APP_API_URL
      }

      handleUpdateUsuarios= async (event,idxUsuarios,nombres,usuario,contrasena,estado) => {
        event.preventDefault()
        const data = {
            idxUsuarios:idxUsuarios,
            nombres: nombres.toUpperCase(),
            usuario: usuario,
            contrasena: contrasena,
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
        fetch(`${this.state.url}/Usuarios/?id=${idxUsuarios}`, requestOptions)
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
            <UsuariosPageEdit
            handleUpdateUsuarios={this.handleUpdateUsuarios}
            updated={this.state.updated}
            />
        )
    }
}