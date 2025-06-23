import {createTheme} from "@mui/material";



const theme = (mod)=> createTheme({
    typography:{
        button:{
            fontSize:'20px'
        }
    },
    palette:{
        mode:mod,
    }
})
export default theme;