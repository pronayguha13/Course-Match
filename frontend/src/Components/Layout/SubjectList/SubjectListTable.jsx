import React from "react";
import styles from "./style.module.css";

const SubjectListTable = ({ subjects }) => {
  return subjects.length ? (
    <div className={styles.SubjectListTableContainer}>
      <h5>Subject List</h5>
      <table className="table table-dark table-responsive-sm">
        <thead className="thead-light">
          <tr>
            <th scope="col"> Paper Code</th>
            <th scope="col"> Paper Name</th>
            <th scope="col"> Credit</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((paper, id) => {
            return (
              <tr key={id}>
                <th scope="row">
                  {paper.PAPERCODE != null ? paper.PAPERCODE : "NA"}
                </th>
                <td>{paper.PAPERNAME}</td>
                <td>NA</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <h4 className={styles.NoSubjectHeader}>No Subject</h4>
  );
};

export default SubjectListTable;
