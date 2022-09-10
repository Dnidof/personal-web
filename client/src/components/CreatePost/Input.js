import { TextField } from "@material-ui/core"


const Input = ({ name, label, handleChange, autoFocus, required, value }) => {
    return(
            <TextField
                name={name}
                onChange={handleChange}
                variant="outlined" 
                required={required}
                fullWidth
                label={label}
                autoFocus={autoFocus}
                value={value}
            />
    )
}

export default Input