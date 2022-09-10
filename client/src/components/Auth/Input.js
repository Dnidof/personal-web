import { TextField, InputAdornment, IconButton } from "@material-ui/core"
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const Input = ({ name, label, handleChange, autoFocus, type, handleShowPassword, required }) => {
    return(
            <TextField
                name={name}
                onChange={handleChange}
                variant="outlined" 
                required={required}
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={name === "password" ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === "password" ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null }
            />
    )
}

export default Input