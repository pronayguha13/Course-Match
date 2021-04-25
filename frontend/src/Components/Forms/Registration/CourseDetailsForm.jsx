import React, { useEffect, useState } from "react";
import { getDepartments } from "helperMethods";
import styles from "./CourseDetailsForm.module.css";
import subjectList from "Context/SubjectList";
import SubjectListTable from "Components/Layout/SubjectList/SubjectListTable";
import Loading from "Components/Layout/Loading";
import DepartmentCreateForm from "./DepartmentCreateForm/index";

// let pause;
const CourseDetailsForm = ({
  user,
  registrationHandler,
  goBackButtonHandler,
}) => {
  const [stream, setStream] = useState("");
  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState(undefined);
  const [departments, setDepartments] = useState([]);
  const [showDeptCreateForm, setShowDeptCreateForm] = useState(false);
  const [showSemesterCreateForm, setShowSemesterCreateForm] = useState(false);

  const semesters = [1, 3, 5, 7];

  useEffect(() => {
    getDepartments(setDepartments);
  }, []);

  useEffect(() => {
    if (semester.length && stream.length) {
      Object.keys(subjectList).map((sem) => {
        if (sem === semester) {
          let subjects = subjectList[sem][stream];
          if (subjects !== undefined) {
            setSubjects(subjects);
          } else {
            setSubjects([]);
          }
        }
      });
    }
  }, [semester, stream]);

  const registrationButtonClickHandler = (e) => {
    const courseDetails = {
      stream,
      semester,
      subjects,
    };
    registrationHandler(e, courseDetails);
  };

  const createDept = () => {
    setShowDeptCreateForm(true);
  };

  const createSemesterForm = () => {
    console.log("method invoked");
    setShowSemesterCreateForm(true);
  };

  const getStream = (e) => {
    const valueSelected = e.target.value;
    valueSelected === "newStreamCreate"
      ? createDept()
      : setStream(e.target.value);
  };

  const streamCreationRefreshHandler = () => {
    getDepartments(setDepartments);
    setShowDeptCreateForm(false);
  };

  const getSemester = (e) => {
    setSemester(e.target.value);
  };

  return (
    <div className={styles.CourseDetailsFormContainer}>
      {departments.length ? (
        showDeptCreateForm ? (
          <DepartmentCreateForm
            isVisible={showDeptCreateForm}
            setVisibility={setShowDeptCreateForm}
            streamCreationRefreshHandler={streamCreationRefreshHandler}
          />
        ) : (
          <div
            className={
              subjects !== undefined && subjects.length
                ? styles.expandedCourseDetailsForm
                : styles.CourseDetailsForm
            }
          >
            <div className={styles.headerSection}>
              <h4 className={styles.formHeader}>
                Hello👋<span className={styles.userName}>{user}</span>
              </h4>
              <h5 className={styles.formMessage}>
                Department and Semester selction
              </h5>
            </div>
            <div
              className={
                subjects !== undefined && subjects.length
                  ? styles.expandedBodySection
                  : styles.bodySection
              }
            >
              <div
                className={`${styles.formSection} ${
                  subjects && subjects.length ? styles.shrinkedFormSection : ""
                } `}
                style={
                  subjects && subjects.length
                    ? {
                        padding: "0 8px",
                        border: "2px solid #000",
                        borderRadius: "16px",
                      }
                    : null
                }
              >
                <div className={styles.inputSection}>
                  <select
                    name="department"
                    className={styles.streamInput}
                    defaultValue={"Select Department"}
                    required
                    onChange={(e) => getStream(e)}
                  >
                    <option value="Select Department" disabled>
                      Select Department...
                    </option>
                    {departments &&
                      departments.map((dept, id) => (
                        <option className="dropdown-item" key={id} value={dept}>
                          {dept}
                        </option>
                      ))}
                    <option
                      className="dropdown-item"
                      style={{ backgroundColor: "#FF3366", color: "#fff" }}
                      value="newStreamCreate"
                    >
                      Click to add new stream
                    </option>
                  </select>
                  <select
                    name="semester"
                    className={styles.semesterInput}
                    defaultValue={"Select Semester"}
                    required
                    onChange={(e) => getSemester(e)}
                    disabled={stream && stream.length ? false : true}
                  >
                    <option value="Select Semester" disabled>
                      Select Semester...
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                </div>
                <div className={styles.handlerBtnSection}>
                  <button
                    className="btn btn-lg btn-success"
                    onClick={(e) => registrationButtonClickHandler(e)}
                  >
                    Sign up
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    style={{ order: "-1" }}
                    onClick={() => goBackButtonHandler()}
                  >
                    Go Back
                  </button>
                </div>
              </div>
              {subjects !== undefined ? (
                <div className={styles.subjectListSection}>
                  <SubjectListTable subjects={subjects} />
                </div>
              ) : null}
            </div>
          </div>
        )
      ) : (
        <Loading loading={true} />
      )}
    </div>
  );
};

export default CourseDetailsForm;
