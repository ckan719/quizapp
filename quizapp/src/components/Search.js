import * as React from "react";
import CRUD from '../services/crud';
import {
    TextField,
    Button
  } from "@material-ui/core";
function Search (props){
    const {setData} = props;
    const [postData, setPostData] = React.useState([]);
    const onChangeData = (e) =>{
        e.preventDefault();
        var temp = {...postData};
        temp['nameTest'] = e.target.value;
        setPostData(temp);
    }
    const handleSearch = (e) => {
        if(e.key == 'Enter'){
            CRUD.searchTest(postData).then (res => {
                if(res.data.data.length > 0){
                    setData(res.data.data);
                }else alert("Không tìm thấy kết quả");
            });
        }
    } 
    return (
        <>
            <TextField id="outlined-search" label="Search field" type="search" onChange = {onChangeData} variant="outlined" fullWidth onKeyPress = {handleSearch} />
        </>
    );
}
export default Search;