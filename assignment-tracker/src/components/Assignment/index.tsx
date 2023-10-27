import styles from "./assignment.module.css";
import { TbTrash } from "react-icons/tb";
import { BsCheckCircleFill } from "react-icons/bs";

type AssignmentProps = { 
  enteredAssignments: { id: string; text: string, isChecked: boolean, due: number }[];
  deleteHandler: (assignmentKey: string) => void;
  checkButtonHandler: (assignmentKey: string) => void;
}

export function Assignment(
  {
    enteredAssignments, 
    deleteHandler, 
    checkButtonHandler
  }: AssignmentProps) {
  return (
    <div>
      <ul>
        {
          enteredAssignments.map((assignment) => (
            <div key={assignment.id} className={styles.assignment}>
              <button onClick={()=>checkButtonHandler(assignment.id)} className={styles.checkContainer}>
                {assignment.isChecked ? (
                    <BsCheckCircleFill size={20}  style={{backgroundColor: "white", borderRadius: "999px"}}/>
                  ) : (
                    <div />
                  )}
              </button>
              <p className={`${assignment.isChecked ? styles.textCompleted : ''}`}>
                {assignment.text} &nbsp; &nbsp;
                <span className={`${assignment.due > 1 ? styles.dueDate : styles.dueTomorrow}`}>
                  {assignment.due > 1 ?  `Due: ${assignment.due} days` : `Due: Tomorrow`} 
            
                </span>
              </p>
              <button onClick={()=>deleteHandler(assignment.id)} className={styles.deleteButton}>
                <TbTrash size={20} />
              </button>
            </div>
          ))}
      </ul>
    </div>
  );
}
