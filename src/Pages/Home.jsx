import React from 'react';
import { Layout } from '../Component/Layout';
import { makeStyles,Grid,CssBaseline } from '@material-ui/core';
import Logo from '../Utils/Images/Desing_Images/Logo.PNG'

const useStyles = makeStyles((theme) => ({
        root: {
                height: '70vh',
        },
        image: {
          backgroundImage:  `url(${Logo})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
          backgroundSize: '90% 90%',
          backgroundPosition: 'center',
        }
}));

export function Home(){
        const classes = useStyles();
        return(
            <Layout>
                <React.Fragment>
                        <Grid container component='main' className={classes.root}>
                            <CssBaseline /> 
                            <Grid item xs={12} md={12} sm={12} className={classes.image}/>
                        </Grid>
                </React.Fragment>
            </Layout>
        );
}