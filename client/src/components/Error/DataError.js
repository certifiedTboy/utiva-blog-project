import React from "react";

const DataError = ({ errorMessage, path }) => {
  return (
    <div className="mb-5 mt-5">
      <div className="alert alert-danger text-center" role="alert">
        {errorMessage}
      </div>
      <a className="btn btn-warning mb-5 mt-3" href={path}>
        Reload Page
      </a>
    </div>
  );
};

export default DataError;
