import React from "react";

const SubjectListTable = ({ subjects, registrationButtonClickHandler }) => {
  return subjects.length ? (
    <div style={{ width: "100%" }}>
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
      <button
        className="btn btn-lg btn-primary"
        onClick={(e) => registrationButtonClickHandler(e)}
      >
        Register
      </button>
    </div>
  ) : (
    <p>No Subject</p>
  );
};

export default SubjectListTable;
