import React from 'react'
import { Button as MuiButton, makeStyles } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
            margin: theme.spacing(0.5),
            marginTop:"1rem",
            background: 'black',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
      
    },
    label: {
        textTransform: 'none'
    }
}))




export default function Button(props) {

    const { text, size, color, variant, onClick, ...other } = props
    const classes = useStyles();

    return (
        <MuiButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
            classes={{ root: classes.root, label: classes.label }}>
            {text}
        </MuiButton>
    )
}
