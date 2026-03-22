import { TextField } from '@mui/material';

const SearchField = () => {
    return (
        <div className="search-box-input" color="primary">
            <TextField label="Wpisz miasto" color="white" variant="outlined" size="small" maxWidth="300px" width="100%" onChange={(e)=>localStorage.setItem("searchQuery", e.target.value)}/>
        </div>
    );
}

export default SearchField;