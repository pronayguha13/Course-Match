import React from "react";
import styles from "./DepartmentCreateForm.module.css";

const DepartmentCreateForm = () => {
  return (
    <div className={styles.Modal}>
      <button
        className={styles.ExitButton}
        onClick={() => console.log("Modal exit button clicked")}
      >
        X
      </button>
      <div className={styles.Header}>
        <h3>Add Course</h3>
      </div>
      <div className={styles.FormArea}>
        <input type="text" placeholder="Paper Name" />
        <input type="text" placeholder="Paper Code" />
        <input type="text" placeholder="Department" />
        <div className={styles.SemesterInput}>
          <label htmlFor="Semester">Semester</label>
          <select name="Semester">
            <option value="1" selected>
              1
            </option>
            <option value="2">2</option>
            <option value="2">3</option>
            <option value="2">4</option>
            <option value="2">5</option>
            <option value="2">6</option>
            <option value="2">7</option>
            <option value="2">8</option>
          </select>
        </div>
        {/* <select
          className="form-select form-select-lg mb-3"
          aria-label="Default select example"
        >
          <option value="1" selected>
            One
          </option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select> */}
        <input type="text" placeholder="Credit" />
      </div>
    </div>
  );
};

export default DepartmentCreateForm;
