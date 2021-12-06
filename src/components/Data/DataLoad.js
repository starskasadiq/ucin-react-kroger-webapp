import classes from "./DataExtract.module.css";
import { useState, useRef } from "react";
import axios from "axios";

const DataLoad = () => {
  const fileTypeInputRef = useRef();
  const [file, setFile] = useState(null);
  const [isUploadSuccess, setUploadSuccess] = useState(null);
  const [recordsUpdated, setRecordsUpdated] = useState(null);
  const [uploadReqMade, setUploadReqMade] = useState(false);
  const [isUploadFailed, setUploadFailed] = useState(false);

  const uploadFile = ({ target: { files } }) => {
    setFile(files[0]);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const pickedFileType = fileTypeInputRef.current.value;

    var formdata = new FormData();
    formdata.append("file", file);

    const header = {
      "Access-Control-Allow-Origin": "*",
      mode: "no-cors",
    };

    setUploadReqMade(true);
    setUploadSuccess(false);
    setUploadFailed(false)
    setRecordsUpdated(0)
    axios
      .post(
        "http://20.115.144.39:8080/api/v1/upload/" + pickedFileType,
        formdata,
        header
      )
      .then(function (response) {
        setUploadSuccess(true);
        setUploadFailed(false)
        setRecordsUpdated(response.data);
      })
      .catch(function (response) {
        setRecordsUpdated("0");
        setUploadFailed(true)
        setUploadSuccess(false)
      });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="file_type">File Type:</label>
        <select ref={fileTypeInputRef}>
          <option value="households">HouseHolds</option>
          <option value="transactions">Transactions</option>
          <option value="products">Products</option>
        </select>
      </div>
      <div className={classes.control}>
        <input type="file" id="file_upload" onChange={uploadFile} />
      </div>

      <div className={classes.action}>
        <button>Upload Data</button>
      </div>
      {isUploadSuccess && (
        <div>
          <p>{recordsUpdated} row(s) uploaded.</p>
        </div>
      )}
      {uploadReqMade && !isUploadSuccess && !isUploadFailed && (
        <div>
          <p>Upload process started... This will take several minutes.</p>
        </div>
      )}
      {isUploadFailed && uploadReqMade && (
        <div>
          <p>
            {recordsUpdated} row(s) uploaded. Data from csv has constraints
            exceptions. Please check and upload updated csv file.
          </p>
        </div>
      )}
    </form>
  );
};

export default DataLoad;
