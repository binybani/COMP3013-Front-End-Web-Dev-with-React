import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [buttonState, setButtonState] = useState(true);
  const [enteredText, setEnteredText] = useState("");
  const [enteredAssignments, setEnteredAssignments] = useState<{ id: string, text: string, isChecked: boolean }[]>([]);
  const [completedAssignments, setCompletedAssignments] = useState(0);

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
    const newAssignment = {
      id: uuidv4(), // Generate a unique ID
      text: enteredText,
      isChecked: false,
    };
    setEnteredAssignments([...enteredAssignments, newAssignment]);    setEnteredText("");
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
      setCompletedAssignments={setCompletedAssignments}
      completedAssignments={completedAssignments}
      setEnteredAssignments={setEnteredAssignments}
      enteredAssignments={enteredAssignments}
      />
    </>
  );
}

export default App;
