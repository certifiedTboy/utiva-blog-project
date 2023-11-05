import React from "react";
import { TodoListComponent } from "./TodoListComponent";

const Schedule = () => {
  return (
    <div className="col-md-12 col-xl-4 grid-margin stretch-card">
      <div className="card-admin">
        <div className="card-body">
          <h4 className="card-title">To do list</h4>
          <TodoListComponent />
        </div>
      </div>
    </div>
  );
};

export default Schedule;
