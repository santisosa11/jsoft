import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

//Home
import {Home} from './Pages/Home';

//Login
import {LoginCont} from './Container/Inicio_Sesion/LoginCont'

//Clientes
import {ClientesContEdit} from './Container/Clientes/ClientesContEdit';
import {ClientesContIndex} from './Container/Clientes/ClientesContIndex';
import {ClientesContNew} from './Container/Clientes/ClientesContNew';

//Servidores
import {ServidoresContEdit} from './Container/Servidores/ServidoresContEdit';
import {ServidoresContIndex} from './Container/Servidores/ServidoresContIndex';
import {ServidoresContNew} from './Container/Servidores/ServidoresContNew';

//Usuarios
import {UsuariosContEdit} from './Container/Usuarios/UsuariosContEdit';
import {UsuariosContIndex} from './Container/Usuarios/UsuariosContIndex';
import {UsuariosContNew} from './Container/Usuarios/UsuariosContNew';

export default function RouterRouts(){
    return(
        <BrowserRouter>
        <Routes>
          {/*<Route path="/" element={<Layout/>}>*/}
          <Route index element={<Home/>}/>
          <Route path="/InicioSesion/LoginPage" element={<LoginCont/>}/>

          <Route path="/Clientes/ClientesPageEdit" element={<ClientesContEdit/>}/>
          <Route path="/Clientes/ClientesPageIndex" element={<ClientesContIndex/>}/>
          <Route path="/Clientes/ClientesPageNew" element={<ClientesContNew/>}/>

          <Route path="/Servidores/ServidoresPageEdit" element={<ServidoresContEdit/>}/>
          <Route path="/Servidores/ServidoresPageIndex" element={<ServidoresContIndex/>}/>
          <Route path="/Servidores/ServidoresPageNew" element={<ServidoresContNew/>}/>

          <Route path="/Usuarios/UsuariosPageEdit" element={<UsuariosContEdit/>}/>
          <Route path="/Usuarios/UsuariosPageIndex" element={<UsuariosContIndex/>}/>
          <Route path="/Usuarios/UsuariosPageNew" element={<UsuariosContNew/>}/>

          <Route path='*' element={<Navigate replace to="/"/>}/>
          {/*</Route>*/}
        </Routes>
      </BrowserRouter>
    )
}