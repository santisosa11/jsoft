import React, {Component} from 'react';
import LoginPage from '../../Pages/Inicio_Sesion/LoginPage';
import {CircularProgress} from '@material-ui/core';
//import bcrypt from 'bcryptjs'
import Swal from 'sweetalert2'

export class LoginCont extends Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            arrayUsuarios: [],
            isLoading: true,
            found: false,
            url : process.env.REACT_APP_API_URL
        }
    }

    handleSubmit = (event,usuario,password) => {
        localStorage.clear()
        event.preventDefault()
        const user = this.state.arrayUsuarios.find(user => (user.usuario === usuario) && user.estado === true)
        //console.log(this.state.arrayUsuarios,usuario,password)
        if(user){
            //bcrypt.compare(password, user.contrasena).then((result)=> {
                if(user){
                    const username = user.nombres
                    localStorage.setItem('isAuthenticated',true)
                    localStorage.setItem('username',username.toUpperCase())
                    localStorage.setItem('usuarioId',user.idxUsuarios)
                    this.setState({found:true})
                    Swal.fire({
                        icon: 'sucess',
                        title: 'Bienvenido',
                    })
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Contraseña incorrecta',
                    }).then((result) =>{
                        window.location.reload()
                    })
                }
            //);
        }else{
            Swal.fire({
                icon: 'error',
                title: 'El usuario no existe',
            }).then((result) =>{
                window.location.reload()
            })
        }
    }

    componentDidMount = () =>{
        fetch(`${this.state.url}/Usuarios`)
        .then(Response => Response.json())
        .then(UsuariosJson => this.setState({arrayUsuarios: UsuariosJson, isLoading: false}))
        .catch(error => {
            this.setState({errorMessage: error.message,isError:true})
        })
    }

    render(){

        if(this.state.isLoading){
            const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
            return (
                <div style={style}>
                    <CircularProgress size='10rem'/>
                </div>
            )
        }

        return(
            <LoginPage 
                handleSubmit={this.handleSubmit} 
                found={this.state.found}
                />
        )
    }
}