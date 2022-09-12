import { TextField, InputAdornment, IconButton } from "@material-ui/core"
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import "./styles.css"

const Input = ({ name, label, handleChange, autoFocus, type, handleShowPassword, required, isSignIn }) => {
    return(
        <div className="item" hidden={isSignIn}>
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
        </div>
    )
}

export default Input