import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [buttonState, setButtonState] = useState(true);
  const [enteredText, setEnteredText] = useState("");
  const [enteredAssignments, setEnteredAssignments] = useState<{ id: string, text: string, isChecked: boolean }[]>([]);
  const [completedAssignments, setCompletedAssignments] = useState(0);
  // const [isChecked, setIsChecked] = useState(false);

  const inputHandler =(event: any) => {
    if(event.target.value === "") {
      setButtonState(true);
    } else { 
      setButtonState(false);
    }
    setEnteredText(event.target.value); 
  }

  const createAssignmentHandler = (event: any) => {
    event.preventDefault();
      // Generate a unique key using UUID
  const newAssignment = {
    id: uuidv4(), // Generate a unique ID
    text: enteredText,
    isChecked: false,
  };
 // Add the new assignment to the enteredAssignments list
 setEnteredAssignments([...enteredAssignments, newAssignment]);    setEnteredText("");
    // setCompletedAssignments(isChecked.length)
  };

  return (
    <>
      <Header 
      inputHandler={inputHandler}
      createAssignmentHandler={createAssignmentHandler}
      buttonState={buttonState}
      enteredText={enteredText}
      />
      <Assignments 
      // enteredAssignments={enteredAssignments}
      // deleteHandler={deleteHandler}
      setCompletedAssignments={setCompletedAssignments}
      completedAssignments={completedAssignments}
      setEnteredAssignments={setEnteredAssignments}
      enteredAssignments={enteredAssignments}
      // isChecked={isChecked}
      // setIsChecked={setIsChecked}
      />
    </>
  );
}

export default App;
