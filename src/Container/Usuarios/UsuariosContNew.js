import React, {Component}  from "react";
import { UsuariosPageNew } from "../../Pages/Usuarios/UsuariosPageNew";
import Swal from "sweetalert2";

export class UsuariosContNew extends Component{

    state = {
        Usuarios: [],
        insert: false,
        url: process.env.REACT_APP_API_URL
        }

        componentDidMount = () => {
            fetch(`${this.state.url}/Usuarios`)
              .then(Response => Response.json())
              .then(Json => this.setState({ Usuarios: Json }));
          }
        
    handleSubmitUsuarios = async (event,nombres,usuario,contrasena,estado) => {
        event.preventDefault()
        const repetidoUsuarios = this.state.Usuarios.find(act => act.usuario.toUpperCase() === usuario.toUpperCase())
        if(repetidoUsuarios){
          Swal.fire({
            icon: 'error',
            title: 'El usuario ya se encuentra registrado',
          })
        }else{
          const data = {
              nombres: nombres.toUpperCase(),
              usuario: usuario,
              contrasena: contrasena,
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
          fetch(`${this.state.url}/Usuarios`, requestOptions)
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
            <UsuariosPageNew
            handleSubmitUsuarios={this.handleSubmitUsuarios}
            insert={this.state.insert} />
        )
    }
}