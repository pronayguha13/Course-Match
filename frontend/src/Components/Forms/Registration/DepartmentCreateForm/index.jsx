import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { createDeptHandler } from "helperMethods.js";
import SuccessPage from "Components/Layout/SuccessPage";
import ErrorPage from "Components/Layout/ErrorPage";

let pause;
const DepartmentCreateForm = ({
  isVisible,
  setVisibility,
  streamCreationRefreshHandler,
}) => {
  const [deptId, setDeptId] = useState("");
  const [name, setName] = useState("");
  const [deptIdFocus, setDeptIdFocus] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [isDeptCreateSuccess, setIsDeptCreateSuccess] = useState(undefined);
  const [toastVisible, setToastVisible] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    switch (isDeptCreateSuccess) {
      case true:
        pause = setTimeout(() => {
          setToastVisible(false);
          streamCreationRefreshHandler();
        }, 3001);
        break;
      default:
        break;
    }
  }, [isDeptCreateSuccess]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "deptID":
        setDeptId(value.trimLeft().toUpperCase());
        break;
      case "name":
        setName(value.trimLeft().toUpperCase());
      default:
        break;
    }
  };

  const deptHandler = () => {
    const formObject = {
      dept_code: deptId,
      name: name,
    };
    createDeptHandler(
      formObject,
      setIsDeptCreateSuccess,
      setError,
      setToastVisible
    );
  };

  return (
    <div className={styles.Modal}>
      {toastVisible ? (
        isDeptCreateSuccess ? (
          <SuccessPage regSuccess={toastVisible} />
        ) : error !== null ? (
          <ErrorPage opError={toastVisible} error={error} setError={setError} />
        ) : null
      ) : null}
      <div className={styles.Header}>
        <h3>Add Department</h3>
      </div>
      <div className={styles.FormArea}>
        <div className={styles.formInput}>
          <span
            className={
              deptIdFocus || deptId.length
                ? styles.smallPlaceHolder
                : styles.placeHolder
            }
          >
            <p>Department ID</p>
          </span>
          <input
            type="text"
            name="deptID"
            placeholder={deptIdFocus ? "Enter your department ID" : ""}
            value={deptId}
            onChange={(e) => onChangeHandler(e)}
            onFocus={() => setDeptIdFocus(true)}
            onBlur={() => setDeptIdFocus(false)}
          />
        </div>
        <div className={styles.formInput}>
          <span
            className={
              nameFocus || name.length
                ? styles.smallPlaceHolder
                : styles.placeHolder
            }
          >
            <p>Department Name</p>
          </span>
          <input
            type="text"
            name="name"
            value={name}
            placeholder={nameFocus ? "Enter your department full name" : ""}
            onChange={(e) => onChangeHandler(e)}
            onFocus={() => setNameFocus(true)}
            onBlur={() => setNameFocus(false)}
          />
        </div>
      </div>
      <div className={styles.btnContainer}>
        <button
          title="Click to cancel create department"
          onClick={() => setVisibility(!isVisible)}
          className="btn btn-danger"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => deptHandler()}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default DepartmentCreateForm;
