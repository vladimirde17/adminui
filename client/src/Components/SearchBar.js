import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import  Axios  from "axios";

function SearchBar({ placeholder, data, setFound, setResult}) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value.toLowerCase();
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      console.log("value",value);
      return value.name.toString().toLowerCase().includes(searchWord);
    });

    console.log("searchWord",searchWord);
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
      setFound(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const getFilteredData =(name) => {       
   if (name !== ""){                                         ////
    Axios.get("http://localhost:3001/customername",{
      params:{
        name:name
      }
    }).then((response) => {
      setFilteredData(response.data);
      setResult(response.data)
      console.log("data",filteredData)
    });
  } 
  }

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            let {name,orderno} = value
            return (
              <button key = {orderno} className="dataItem" onClick={()=>getFilteredData(name)}   >      
                <p>{name}</p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;



//href={value.link} target="_blank" line 60