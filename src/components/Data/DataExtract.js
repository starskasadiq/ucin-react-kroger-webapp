import classes from "./DataExtract.module.css";
import { useRef, useState } from "react";

const DataExtract = () => {
  const hshdNumInputRef = useRef();
  const [dataExtract, setDataExtract] = useState(null);
  const [isDataExists, setDataExists] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    setDataExists(false);
    setDataExtract(null);
    const enteredHshd = hshdNumInputRef.current.value;
    setDataExists(false);
    fetch("http://localhost:8080/api/v1/getHsHdNum/" + enteredHshd, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDataExtract(data);
        setDataExists(true);
      });
  };

  return (
    <div>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="hshd_num">HouseHold Num</label>
          <input type="text" id="hshd_num" ref={hshdNumInputRef} />
        </div>
        {isDataExists && <div><p>{dataExtract.length} rows extracted.</p></div>}
        <div className={classes.action}>
          <button>Extract Data</button>
        </div>
      </form>
      {isDataExists && (
        <section className={classes.databox}>
          <table>
            <tr>
              <th>HouseHold Num</th>
              <th>Basket Num</th>
              <th>Purchase Date</th>
              <th>Product Num</th>
              <th>Department</th>
              <th>Commodity</th>
              <th>Spend</th>
              <th>Units</th>
              <th>Store Region</th>
              <th>Week Num</th>
              <th>Year</th>
              <th>Loyalty Flag</th>
              <th>Age Range</th>
              <th>Marital</th>
              <th>Income Range</th>
              <th>HomeOwner</th>
              <th>HshdComposition</th>
              <th>HH Size</th>
              <th>Children</th>
            </tr>
            {dataExtract.map((eachRow) => (
              <tr key={eachRow.purchaseNum}>
                <td>{eachRow.hshdNum}</td>
                <td>{eachRow.basketNum}</td>
                <td>{eachRow.purchaseDate}</td>
                <td>{eachRow.productNum}</td>
                <td>{eachRow.department}</td>
                <td>{eachRow.commodity}</td>
                <td>{eachRow.spend}</td>
                <td>{eachRow.units}</td>
                <td>{eachRow.storeR}</td>
                <td>{eachRow.weekNum}</td>
                <td>{eachRow.year}</td>

                <td>{eachRow.l}</td>
                <td>{eachRow.ageRange}</td>
                <td>{eachRow.marital}</td>
                <td>{eachRow.incomeRange}</td>
                <td>{eachRow.homeOwner}</td>
                <td>{eachRow.hshdComposition}</td>
                <td>{eachRow.hhSize}</td>
                <td>{eachRow.children}</td>
              </tr>
            ))}
            <tr>
              <th>HouseHold Num</th>
              <th>Basket Num</th>
              <th>Purchase Date</th>
              <th>Product Num</th>
              <th>Department</th>
              <th>Commodity</th>
              <th>Spend</th>
              <th>Units</th>
              <th>Store Region</th>
              <th>Week Num</th>
              <th>Year</th>
              <th>Loyalty Flag</th>
              <th>Age Range</th>
              <th>Marital</th>
              <th>Income Range</th>
              <th>HomeOwner</th>
              <th>HshdComposition</th>
              <th>HH Size</th>
              <th>Children</th>
            </tr>
          </table>
        </section>
      )}
    </div>
  );
};

export default DataExtract;
