import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [orderno, setOrderno] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [mobileno, setMobileno] = useState("");
  const [testedby, setTestedby] = useState("");
  const [date, setDate] = useState("");

  /*
  const displayInfo = () => {
    console.log(name+age+country+postion+wage);
  };
  */
 
  const [newTestedby, setNewTestedby] = useState("");

  const [customer1List, setCustomer1List] = useState([]);

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

  return (
    <div className="App">
      <div className="information">
      <label>Order No.:</label>
        <input
          type="number"
          onChange={(event) => {
            setOrderno(event.target.value);
          }}
        />
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>Mobile No.:</label>
        <input
          type="text"
          onChange={(event) => {
            setMobileno(event.target.value);
          }}
        />
        <label>Tested By:</label>
        <input
          type="text"
          onChange={(event) => {
            setTestedby(event.target.value);
          }}
        />
        <label>Date:</label>
        <input
          type="date"
          onChange={(event) => {
            setDate(event.target.value);
          }}
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