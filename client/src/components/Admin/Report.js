import React from "react";

const Report = () => {
  return (
    <div className="col-12 grid-margin">
      <div className="card-admin">
        <div className="card-body">
          <h4 className="card-title">Reports</h4>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th> Author Name </th>
                  <th> Title </th>
                  <th> Description </th>
                  <th> Action </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="d-flex">
                      <span className="pl-2">Henry Klein</span>
                    </div>
                  </td>
                  <td> 02312 </td>
                  <td> $14,500 </td>
                  <td> Dashboard </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
