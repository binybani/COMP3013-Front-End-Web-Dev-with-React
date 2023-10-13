import { useState } from "react";
import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";
// 한곳에 리스트를 저장해서 다른 컴포넌트랑 쉐어할수 있게 다시 코드 만들어보기
type AssignmentsProps = { 
  // enteredAssignments: string[];
  // deleteHandler: (assignmentKey: number) => void;
  completedAssignments: number;
  setCompletedAssignments: (completedAssignments: number) => void;
  // isChecked: boolean;
  // setIsChecked: (isChecked: boolean) => void;
  enteredAssignments: { id: string; text: string, isChecked: boolean }[];
  setEnteredAssignments: React.Dispatch<React.SetStateAction<{ id: string; text: string; isChecked: boolean; }[]>>;
}

export function Assignments(
  { 
    setCompletedAssignments, 
    completedAssignments, 
    setEnteredAssignments, 
    enteredAssignments, 
    // isChecked, 
    // setIsChecked 
  }: AssignmentsProps) {  
  const assignmentsLength = enteredAssignments.length;
  // const [isChecked, setIsChecked] = useState(false);

  const checkButtonHandler = (uuidKey: string) => {
    console.log("체크박스 클릭")
    // Find the assignment with the matching ID
    const checkBoxToToggle = enteredAssignments.find((assignment) => assignment.id === uuidKey);
    // If an assignment with the provided UUID is found, toggle its isChecked property
    if (checkBoxToToggle) {
      checkBoxToToggle.isChecked = !checkBoxToToggle.isChecked;
      // update the state
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
    console.log("삭제할 어싸", remainingAssignments)
    setEnteredAssignments(remainingAssignments);

    console.log("삭제버튼 클릭")
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
          // isChecked={isChecked}
          />
        }
        {/* {
        assignments.map((assignment, index) => (
          <Assignment 
          assignmentKey={index}
          assignment={assignment}
          deleteHandler={deleteHandler}
          completedAssignments={completedAssignments}
          checkButtonHandler={checkButtonHandler}
          setCompletedAssignments={setCompletedAssignments}
          // isChecked={isChecked}
          // setIsChecked={setIsChecked}
          />
        ))} */}
      </div>
    </section>
  );
}
