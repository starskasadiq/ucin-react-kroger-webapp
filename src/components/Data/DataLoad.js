import classes from "./DataExtract.module.css";
import { useState, useRef } from "react";
import axios from "axios";

const DataLoad = () => {
  const fileTypeInputRef = useRef();
  const [file, setFile] = useState(null);

  const uploadFile = ({ target: { files } }) => {
    console.log(files[0]);
    setFile(files[0]);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const pickedFileType = fileTypeInputRef.current.value;

    var formdata = new FormData();
    formdata.append("file", file);

    axios
      .post("http://localhost:8080/api/v1/upload/" + pickedFileType, formdata)
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="file_type">File Type:</label>
        <select ref={fileTypeInputRef}>
          <option value="transactions">Transactions</option>
          <option value="households">HouseHolds</option>
          <option value="products">Products</option>
        </select>
      </div>
      <div className={classes.control}>
        <input type="file" id="file_upload" onChange={uploadFile} />
      </div>

      <div className={classes.action}>
        <button>Upload Data</button>
      </div>
    </form>
  );
};

export default DataLoad;
