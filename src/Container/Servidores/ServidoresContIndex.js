import React, {Component}  from "react";
import { ServidoresPageIndex } from "../../Pages/Servidores/ServidoresPageIndex";
import Swal from "sweetalert2";

export class ServidoresContIndex extends Component{

    state = {
        Clientes: [],
        Servidores: [],
        url: process.env.REACT_APP_API_URL
      }

      componentDidMount = async () => {

        const [data1,data2] = await Promise.all([
          fetch(`${this.state.url}/Clientes`).then(res1 => res1.json()),
          fetch(`${this.state.url}/Servidores`).then(res2 => res2.json())
      ])
        //const cliente = data1.filter(cliente => cliente.estado === true)
              this.setState({
                Clientes: data1,
                Servidores: data2.reverse()
              })
    }

    changeEstado = (rowData) => {
      Swal.fire({
        title: 'Procesando...',
        showConfirmButton: false,
        allowOutsideClick: false
      })
      Swal.showLoading()
      const id = rowData.idxServidores
      //Realizar cambio en BD 
      const data = {
          idxServidores: rowData.idxServidores,
          ipServidor: rowData.ipServidor,
          nombreServidor: rowData.nombreServidor.toUpperCase(),
          idxCliente: rowData.idxCliente,
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
      fetch(`${this.state.url}/Servidores/?id=${id}`, requestOptions)
      .then(data => {
        console.log("sucess",data)
              Swal.fire({
                icon: 'success',
                title: 'Estado actualizado exitosamente'
              })
              .then((result) => {
                //Actualizar visualización
                const newEstado = this.state.Servidores.map(change =>
                  change.idxServidores === id
                        ? { ...change, estado: !change.estado }
                        : change
                )
                this.setState({
                  Servidores: newEstado,
                })
            })
  
        })
    }

    render(){
        return(
            <ServidoresPageIndex
            Servidores={this.state.Servidores}
            Clientes= {this.state.Clientes}
            changeEstado={this.changeEstado}
            />
        )
    }
}