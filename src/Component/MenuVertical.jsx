import React from "react";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider

} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import RoomService from '@material-ui/icons/RoomService';
import UsersIcon from '@material-ui/icons/VerifiedUser';
import { Link, Outlet } from "react-router-dom";

import { makeStyles, createStyles } from '@material-ui/core/styles';

const drawerWidth = 240
const useStyles = makeStyles(theme =>
  createStyles({
    appMenu: {
      width: '100%',
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
    },
    menuItemIcon: {
      color: '#97c05c',
    },
  }),
)

export default function MenuVertical(){

    const classes = useStyles()

    return(
        <div>
            <List component='nav'>

                  <ListItem button className={classes.menuItem} component={Link} to="/">
                          <ListItemIcon><HomeIcon/></ListItemIcon>
                          <ListItemText primary="Inicio"/>
                      </ListItem>

                  
                {/*<ListItem button className={classes.menuItem} component={Link} to="/contacts" >
                    <ListItemIcon><CloudIcon/></ListItemIcon>
                    <ListItemText primary="Contactos" />
                  </ListItem>*/}

                <ListItem button className={classes.menuItem} component={Link} to="/Clientes/ClientesPageIndex" >
                    <ListItemIcon><SupervisedUserCircle/></ListItemIcon>
                    <ListItemText primary="Clientes" />
                </ListItem>

                <ListItem button className={classes.menuItem} component={Link} to="/Servidores/ServidoresPageIndex" >
                    <ListItemIcon><RoomService/></ListItemIcon>
                    <ListItemText primary="Servidores" />
                </ListItem>

                <ListItem button className={classes.menuItem} component={Link} to="/Usuarios/UsuariosPageIndex">
                    <ListItemIcon><UsersIcon/></ListItemIcon>
                      <ListItemText primary="Usuarios" />
                    </ListItem>

                <Divider/>
            </List>
            <section>
                <Outlet ></Outlet>
            </section>
        </div>
    )
}