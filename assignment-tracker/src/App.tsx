import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Calendar from "./components/Calendar";
import { format, differenceInDays, setHours, setMinutes, setSeconds, setMilliseconds } from "date-fns";

function App() {
  const [buttonState, setButtonState] = useState(true);
  const [enteredText, setEnteredText] = useState("");
  const [enteredAssignments, setEnteredAssignments] = useState<{ id: string, text: string, isChecked: boolean, due: number }[]>([]);
  const [completedAssignments, setCompletedAssignments] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date>();
  // const [showCalendar, setShowCalendar] = useState(false);

  function calculateRemainingDays(selectedDate: Date | undefined): number {
    if (selectedDate && enteredText) {
      const today = new Date();
      console.log(today)
      const selectedDateMidnight = setMilliseconds(setSeconds(setMinutes(setHours(selectedDate, 0), 0), 0), 0);
      const todayMidnight = setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 0), 0), 0), 0);
      const remainingDays = differenceInDays(selectedDateMidnight, todayMidnight);
      // const remainingDays = Math.ceil(differenceDays);
    
      console.log("difference", remainingDays);
      return remainingDays;
    } else {
      return 0; // 또는 다른 값을 반환하거나 에러 처리를 수행하세요.
    }
  }
  

  const inputHandler =(event: any) => {
    if(event.target.value !== "" || selectedDate) {
      setButtonState(false);
    } else { 
      setButtonState(true);
    }
    setEnteredText(event.target.value); 
  }

  const createAssignmentHandler = (event: any) => {
    event.preventDefault();
    const dueDate = calculateRemainingDays(selectedDate);
    if (selectedDate) {
      const newAssignment = {
        id: uuidv4(), // Generate a unique ID
        text: enteredText,
        isChecked: false,
        due: dueDate,
      };
      setEnteredAssignments([...enteredAssignments, newAssignment]);    setEnteredText("");
      setEnteredText("");
      setSelectedDate(undefined);
      setButtonState(true); // 입력 완료 후 버튼을 비활성화
    } else {
      alert('The date must be selected.')
      console.log("날짜를 선택하세요")
    }
  };

  return (
    <>
      <Header 
      inputHandler={inputHandler}
      createAssignmentHandler={createAssignmentHandler}
      buttonState={buttonState}
      enteredText={enteredText}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
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
