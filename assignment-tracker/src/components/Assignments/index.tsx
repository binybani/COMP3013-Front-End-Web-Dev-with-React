import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";

type AssignmentsProps = { 
  completedAssignments: number;
  setCompletedAssignments: (completedAssignments: number) => void;
  enteredAssignments: { id: string; text: string, isChecked: boolean, due: number }[];
  setEnteredAssignments: React.Dispatch<React.SetStateAction<{ id: string; text: string; isChecked: boolean; due: number }[]>>;
}

export function Assignments(
  { 
    setCompletedAssignments, 
    completedAssignments, 
    setEnteredAssignments, 
    enteredAssignments, 
  }: 
  AssignmentsProps) {  
  const assignmentsLength = enteredAssignments.length;

  const checkButtonHandler = (uuidKey: string) => {
    const checkBoxToToggle = enteredAssignments.find((assignment) => assignment.id === uuidKey);
    if (checkBoxToToggle) {
      checkBoxToToggle.isChecked = !checkBoxToToggle.isChecked;
      setEnteredAssignments([...enteredAssignments]);       
      setCompletedAssignments(checkBoxToToggle.isChecked ? completedAssignments + 1: completedAssignments - 1)
    }
  };
  
  const deleteHandler = (uuidKey: string) => {
    const assignmentToDelete = enteredAssignments.find((assignment) => assignment.id === uuidKey);
    if (assignmentToDelete?.isChecked) {
      setCompletedAssignments(completedAssignments - 1);
    }
    const remainingAssignments = enteredAssignments.filter((assignment) => assignment.id !== uuidKey);
    setEnteredAssignments(remainingAssignments);
  };
  
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
          <Assignment
          enteredAssignments={enteredAssignments}
          deleteHandler={deleteHandler}
          checkButtonHandler={checkButtonHandler}
          />
        }
      </div>
    </section>
  );
}
