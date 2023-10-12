import { useState } from "react";
import styles from "./assignment.module.css";
import { TbTrash } from "react-icons/tb";
import { BsCheckCircleFill } from "react-icons/bs";

type AssignmentProps = { 
  assignmentKey: number;
  assignment: string;
  deleteHandler: (assignmentKey: number) => void;
  completedAssignments: number;
  setCompletedAssignments: number;
}

export function Assignment({assignmentKey, assignment, deleteHandler, completedAssignments, setCompletedAssignments }: AssignmentProps) {
  // const [completedAssignments, setCompletedAssignments] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  // const checkButtonHandler = () => {
  //   setIsChecked(!isChecked);
  //   if(!isChecked) {
  //     setCompletedAssignments(completedAssignments+1);
  //   } else {
  //     setCompletedAssignments(completedAssignments-1);
  //   }
  // }
  const checkButtonHandler = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setCompletedAssignments((prevCompleted) => prevCompleted + 1);
    } else {
      setCompletedAssignments((prevCompleted) => prevCompleted - 1);
    }
  }
  
  return (
    <div className={styles.assignment}>
      <button onClick={checkButtonHandler} className={ styles.checkContainer}>
      {isChecked ? (
          <BsCheckCircleFill size={20}  style={{backgroundColor: "white", borderRadius: "999px"}}/>
        ) : (
          <div />
        )}
      </button>
      <p>{assignment}</p>
      <button onClick={()=>deleteHandler(assignmentKey)} className={styles.deleteButton}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}
