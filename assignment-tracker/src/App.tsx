import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";
import { useState } from "react";

function App() {
  const [buttonState, setButtonState] = useState(true);
  const [enteredText, setEnteredText] = useState("");
  const [enteredAssignments, setEnteredAssignments] = useState<string[]>([]); 
  const [completedAssignments, setCompletedAssignments] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  const inputHandler =(event: any) => {
    if(event.target.value === "") {
      setButtonState(true);
    } else { 
      setButtonState(false);
    }
    setEnteredText(event.target.value); 
  }

  const createAssignmentHandler = () => {
    setEnteredAssignments([...enteredAssignments, enteredText]);
    setEnteredText("");
    setButtonState(true);
  };

  const deleteHandler = (indexToDelete: any) => {
    const updatedAssignments = enteredAssignments.filter((_, index) => index !== indexToDelete);
    setEnteredAssignments(updatedAssignments);
    if (isChecked) {
      setCompletedAssignments(completedAssignments - 1);
    }  };

  return (
    <>
      <Header 
      inputHandler={inputHandler}
      createAssignmentHandler={createAssignmentHandler}
      buttonState={buttonState}
      enteredText={enteredText}
      />
      <Assignments 
      assignments={enteredAssignments}
      deleteHandler={deleteHandler}
      completedAssignments={completedAssignments}
      // setCompletedAssignments={setCompletedAssignments}
      // isChecked={isChecked}
      />
    </>
  );
}

export default App;
