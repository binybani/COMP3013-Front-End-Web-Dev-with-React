import styles from "./assignment.module.css";
import { TbTrash } from "react-icons/tb";
import { BsCheckCircleFill } from "react-icons/bs";

type AssignmentProps = { 
  enteredAssignments: { id: string; text: string, isChecked: boolean }[];
  deleteHandler: (assignmentKey: string) => void;
  // isChecked: (boolean);
  checkButtonHandler: (assignmentKey: string) => void;
}

export function Assignment({enteredAssignments, deleteHandler, checkButtonHandler}: AssignmentProps) {
  return (
    <div>
      <ul>
        {
          enteredAssignments.map((assignment) => (
            <div key={assignment.id} className={styles.assignment}>
              <button onClick={()=>checkButtonHandler(assignment.id)} className={ styles.checkContainer}>
                {assignment.isChecked ? (
                    <BsCheckCircleFill size={20}  style={{backgroundColor: "white", borderRadius: "999px"}}/>
                  ) : (
                    <div />
                  )}
              </button>
              <p>{assignment.text}</p>
              <p>{assignment.id}</p>
              <button onClick={()=>deleteHandler(assignment.id)} className={styles.deleteButton}>
                <TbTrash size={20} />
              </button>
            </div>
          ))}
      </ul>
    </div>
  );
}
