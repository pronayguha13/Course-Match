import React, { useEffect, useState } from "react";
import { getDepartments } from "../../../helperMethods";
import styles from "./CourseDetailsForm.module.css";
import subjectList from "../../../Context/SubjectList";
import SubjectListTable from "../../Layout/SubjectList/SubjectListTable";
import Loading from "../../Layout/Loading";
import DepartmentCreateForm from "./DepartmentCreateForm";

const CourseDetailsForm = ({
  user,
  registrationHandler,
  display,
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
    setShowSemesterCreateForm(true);
  };

  const getStream = (e) => {
    setStream(e.target.innerHTML);
  };

  const getSemester = (e) => {
    setSemester(e.target.innerHTML);
  };

  return (
    <div className={styles.CourseDetailsForm} style={{ display: display }}>
      {departments.length ? (
        <>
          {showDeptCreateForm ? <DepartmentCreateForm /> : null}
          <div
            style={{
              display: showDeptCreateForm ? "none" : "block",
              zIndex: 10,
            }}
          >
            <h4>Hello! {user}</h4>
            <button
              onClick={() => goBackButtonHandler()}
              className="btn btn-lg btn-primary"
            >
              Go Back
            </button>
            <h5>Department and Semester selction</h5>
            <div className={styles.SemDeptSelection}>
              <div className={`${styles.Dropdown} btn-group`}>
                <button type="button" className="btn btn-danger">
                  Select Department
                </button>
                {stream.length ? (
                  <button type="button" className="btn btn-danger">
                    {stream}
                  </button>
                ) : null}
                <button
                  type="button"
                  className="btn btn-danger dropdown-toggle dropdown-toggle-split"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="sr-only">Toggle Dropdown</span>
                </button>
                <div className="dropdown-menu">
                  {departments &&
                    departments.map((dept, id) => (
                      <button
                        className="dropdown-item"
                        key={id}
                        onClick={(e) => getStream(e)}
                      >
                        {dept}
                      </button>
                    ))}
                  <button
                    className="dropdown-item"
                    style={{ backgroundColor: "#FF3366", color: "#fff" }}
                    onClick={() => createSemesterForm()}
                  >
                    Click to add new stream
                  </button>
                </div>
              </div>
              <div className={`${styles.Dropdown} btn-group`}>
                <button type="button" className="btn btn-danger">
                  Select Semester
                </button>
                {semester.length ? (
                  <button type="button" className="btn btn-danger">
                    {semester}
                  </button>
                ) : null}
                <button
                  type="button"
                  className="btn btn-danger dropdown-toggle dropdown-toggle-split"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="sr-only">Toggle Dropdown</span>
                </button>
                <div className="dropdown-menu">
                  {semesters.map((sem, id) => (
                    <button
                      className="dropdown-item"
                      key={id}
                      onClick={(e) => getSemester(e)}
                    >
                      {sem}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ width: "100%" }}>
              {subjects !== undefined ? (
                <div>
                  <SubjectListTable
                    subjects={subjects}
                    registrationButtonClickHandler={
                      registrationButtonClickHandler
                    }
                  />
                </div>
              ) : (
                <p>Select your Semester and Department</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <Loading loading={true} />
      )}
    </div>
  );
};

export default CourseDetailsForm;
