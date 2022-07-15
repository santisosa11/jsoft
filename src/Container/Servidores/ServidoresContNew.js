import React, {Component}  from "react";
import { ServidoresPageNew } from "../../Pages/Servidores/ServidoresPageNew";
import Swal from "sweetalert2";

export class ServidoresContNew extends Component{

  state = {
    Clientes: [],
    Servidores: [],
    successSubmitServicio: false,
    insert: false,
    idServidorActual: 0,
    url: process.env.REACT_APP_API_URL
  }

  componentDidMount = async () => {

    const [data1,data2,data3] = await Promise.all([
      fetch(`${this.state.url}/Clientes`).then(res1 => res1.json()),
      fetch(`${this.state.url}/Servidores`).then(res2 => res2.json()),
      fetch(`${this.state.url}/Servicios`).then(res3 => res3.json())
  ])
    const cliente = data1.filter(cliente => cliente.estado === true)
          this.setState({
            Clientes: cliente,
            Servidores: data2,
            Servicios: data3.reverse()
          })
}

    handleSubmitServidores = async (event,ipServidor,nombreServidor,idxCliente,estado) => {
      event.preventDefault()
        const data = {
            ipServidor: ipServidor,
            nombreServidor: nombreServidor.toUpperCase(),
            idxCliente: idxCliente,
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
        fetch(`${this.state.url}/Servidores`, requestOptions)
        .then(data => {
            console.log("sucess", data)
            this.setState({ successSubmitServicio: true, idServidorActual: data.idxServidores })
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

    handleSubmitServicios = async (event,nombreServicio,capacidad,umbralAlerta,estado) => {
      event.preventDefault()
        const data = {
            idxServidor: this.state.idServidorActual,
            nombreServicio: nombreServicio.toUpperCase(),
            capacidad: capacidad,
            umbralAlerta: umbralAlerta,
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
        fetch(`${this.state.url}/Servicios`, requestOptions)
        .then(data => {
            console.log("sucess", data)
            this.setState({ Servicios: this.state.Servicios.concat(data).reverse() })
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

    render(){
        return(
            <ServidoresPageNew
            Servidores={this.state.Servidores}
            Clientes={this.state.Clientes}
            handleSubmitServidores={this.handleSubmitServidores}
            insert={this.state.insert}
            idServidorActual={this.state.idServidorActual}
            Servicios={this.state.Servicios}
            handleSubmitServicios={this.handleSubmitServicios}
            successSubmitServicio={this.state.successSubmitServicio}/>
        )
    }
}