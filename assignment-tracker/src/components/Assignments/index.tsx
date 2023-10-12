import { useState } from "react";
import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";

type AssignmentsProps = { 
  assignments: string[];
  deleteHandler: (assignmentKey: number) => void;
  completedAssignments: number;
}

export function Assignments({ assignments, deleteHandler }: AssignmentsProps) {  
  const assignmentsLength = assignments.length;
  const [completedAssignments, setCompletedAssignments] = useState(0);
  return (
    <section className={styles.assignments}>
      <header className={styles.header}>
        <div>
          <p>Created Assignments</p>
          <span>{assignmentsLength}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed Assignments</p>
          <span>{completedAssignments} of {assignmentsLength}</span>
        </div>
      </header>

      <div className={styles.list}>
        {
        assignments.map((assignment, index) => (
          <Assignment 
          assignmentKey={index}
          assignment={assignment}
          deleteHandler={deleteHandler}
          completedAssignments={completedAssignments}
          setCompletedAssignments={setCompletedAssignments}
          />
        ))}
      </div>
    </section>
  );
}
