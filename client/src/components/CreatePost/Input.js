import { TextField } from "@material-ui/core"
import "./styles.css"

const Input = ({ name, label, handleChange, autoFocus, required, value }) => {
    return(
        <div className="input">
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
        </div>
    )
}

export default Input