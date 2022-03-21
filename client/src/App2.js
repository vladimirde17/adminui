import "./App.css";
import { useState } from "react";
import Axios from "axios";
import SearchBar from "./Components/SearchBar";

function App() {
  
  const [name1, setName] = useState("");
  const [age1, setAge] = useState(0);
  const [mobileno1, setMobileno] = useState("");
  const [testedby1, setTestedby] = useState("");
  const [date1, setDate] = useState("");

  const [filteredOrder, setFilteredOrder] = useState(null)

  /*
  const displayInfo = () => {
    console.log(name+age+country+postion+wage);
  };
  */
  //All the input value
  const [ inputs, setInputs ] = useState(
    {
      orderno: 0,
      name: '',
      age: 0,
      mobileno: '',
      testedby: '',
      date: ''
    }
  )

  //All the flags of the input values above
  const [ flags, setFlags ] = useState({
    ordernoFlag: true,
    nameFlag: true,
    ageFlag: true,
    mobilenoFlag: true,
    testedbyFlag: true,
    dateFlag: true
    }
  )

  

  const handleChange = event =>{
    const { name, value } = event.target
    let flag = true
    switch(name.toString()) {
      case 'orderno' :
        flag =  /^[0-9]{1,6}$/.test(value)
        break;
      case 'name' :
        flag = /^[a-z ]*$/i.test(value)
        break;
      case 'age' :
        flag =  /^100|[1-9]?\d$/.test(value)
        break;
      case 'mobileno' :
        flag =  /^(\+\d{1,3}[- ]?)?\d{10}$/.test(value)
        break;
      case 'testedby' :
        flag =  /^[a-z ]*$/i.test(value)
        break;
      default:
    }
    setInputs({...inputs, [name]:value});
    setFlags({...flags,[`${name}Flag`]:flag});
    }


  const [newTestedby, setNewTestedby] = useState("");

  const [customer1List, setCustomer1List] = useState([]);
  const {
    orderno,
    name,
    age,
    mobileno,
    testedby,
    date
  } = inputs
  const addCustomer1 = () => {
    Axios.post("http://localhost:3001/create", {
      orderno: orderno,
      name: name,
      age: age,
      mobileno: mobileno,
      testedby: testedby,
      date: date,
    }).then(() => {
      setCustomer1List([
        ...customer1List,
        {
          orderno: orderno,
          name: name,
          age: age,
          mobileno: mobileno,
          testedby: testedby,
          date: date,
        },
      ]);
    });
  };

  const getCustomer1 = () => {
    Axios.get("http://localhost:3001/customer1").then((response) => {
      setCustomer1List(response.data);
    });
  };

  const updateCustomer1Testedby = (orderno) => {
    Axios.put("http://localhost:3001/update", { testedby: newTestedby, orderno: orderno }).then(
      (response) => {
        setCustomer1List(
          customer1List.map((val) => {
            return val.orderno == orderno
              ? {
                  orderno: val.orderno,
                  name: val.name,
                  age: val.age,
                  mobileno: val.mobileno,
                  date: val.date,
                  testedby: newTestedby,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteCustomer1 = (orderno) => {
    Axios.delete(`http://localhost:3001/delete/${orderno}`).then((response) => {
      setCustomer1List(
        customer1List.filter((val) => {
          return val.orderno != orderno;
        })
      );
    });
  };
  const {
    ordernoFlag,
    nameFlag,
    ageFlag,
    mobilenoFlag,
    testedbyFlag,
    dateFlag
  } = flags
  return (
    <div className="App">
      <SearchBar setFound={setFilteredOrder} data={customer1List} placeholder="Enter....." ></SearchBar>
      {console.log("found",filteredOrder)}
      <div className="information">
      <label>Order No.:</label>
        <div>
          <input
            type="number"
            name="orderno"
            onChange={handleChange}
            style={
              ordernoFlag ?
                { borderBottom: '2px solid #888' }
                :
                { borderBottom: '2px solid red' }
            }
            error="required"
            required
          />
          <br/>
          <span
            style={
              ordernoFlag ?
                { color: 'black' }
                :
                { color: 'red' }
            }
          >{
              ordernoFlag ?
                ''
                :
                'invalid order no'
              }</span>
        </div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          onChange={(event) => {
            setName(event.target.value);
          }}
          error="required"
          required
        />
        <label>Age:</label>
        <input
          type="number"
          name="age"
          onChange={(event) => {
            setAge(event.target.value);
          }}
          error="required"
          required
        />
        <label>Mobile No.:</label>
        <input
          type="text"
          name="mobileno"
          onChange={(event) => {
            setMobileno(event.target.value);
          }}
          error="required"
          required
        />
        <label>Tested By:</label>
        <input
          type="text"
          name="testedby"
          onChange={(event) => {
            setTestedby(event.target.value);
          }}
          error="required"
          required
        />
        <label>Date:</label>
        <input
          type="date"
          name="date"
          onChange={(event) => {
            setDate(event.target.value);
          }}
          error="required"
          required
        />
        
        <button onClick={addCustomer1}>Add Customer</button>
      </div>
      <div className="customer1">
        <button onClick={getCustomer1}>Show Customers</button>

        {customer1List.map((val, key) => {
          return (
            <div className="customer1">
              <div>
                <h3>Order No.: {val.orderno}</h3>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Mobile No.: {val.mobileno}</h3>
                <h3>Tested By: {val.testedby}</h3>
                <h3>Date: {val.date.substring(0, 10)}</h3>
              
              </div>
              <div>
                <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setNewTestedby(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateCustomer1Testedby(val.orderno);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteCustomer1(val.orderno);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

/*
import './App.css';

function App() {
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
*/