import React, {Component}  from "react";
import { UsuariosPageIndex } from "../../Pages/Usuarios/UsuariosPageIndex";
import Swal from "sweetalert2";

export class UsuariosContIndex extends Component{

    state = {
        Usuarios: [],
        url: process.env.REACT_APP_API_URL
      }

      componentDidMount = async () => {

        const [data1] = await Promise.all([
          fetch(`${this.state.url}/Usuarios`).then(res1 => res1.json()),
      ])
        //const cliente = data1.filter(cliente => cliente.estado === true)
              this.setState({
                Usuarios: data1.reverse()
              })
    }

    changeEstado = (rowData) => {
      Swal.fire({
        title: 'Procesando...',
        showConfirmButton: false,
        allowOutsideClick: false
      })
      Swal.showLoading()
      const id = rowData.idxUsuarios
      //Realizar cambio en BD 
      const data = {
          idxUsuarios: rowData.idxUsuarios,
          nombres: rowData.nombres.toUpperCase(),
          usuario: rowData.usuario,
          contrasena: rowData.contrasena,
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
      fetch(`${this.state.url}/Usuarios/?id=${id}`, requestOptions)
      .then(data => {
        console.log("sucess",data)
              Swal.fire({
                icon: 'success',
                title: 'Estado actualizado exitosamente'
              })
              .then((result) => {
                //Actualizar visualización
                const newEstado = this.state.Usuarios.map(change =>
                  change.idxUsuarios === id
                        ? { ...change, estado: !change.estado }
                        : change
                )
                this.setState({
                  Usuarios: newEstado,
                })
            })
  
        })
    }

    render(){
        return(
            <UsuariosPageIndex
            Usuarios={this.state.Usuarios}
            changeEstado={this.changeEstado}
            />
        )
    }
}