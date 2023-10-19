import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";
import Calendar from "../Calendar"

type HeaderProps = {
  inputHandler: (event: any) => void;
  createAssignmentHandler: (event: any) => void;
  buttonState: boolean;
  enteredText: string;
  selectedDate: Date | undefined;
  setSelectedDate: (selectedDate: Date | undefined )=>void;
}
export function Header(
  {
    inputHandler, 
    createAssignmentHandler, 
    buttonState, 
    enteredText,
    selectedDate,
    setSelectedDate
  }: HeaderProps) {

  return (
    <header className={styles.header}>
      {/* This is simply to show you how to use helper functions */}
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form onSubmit={createAssignmentHandler} className={styles.newAssignmentForm}>
        <input 
          onChange={inputHandler} 
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              createAssignmentHandler(e);
            }
          }}
          placeholder="Add a new assignment" 
          type="text" 
          value={enteredText}
        />
        <Calendar
          buttonState={buttonState}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <button onClick={createAssignmentHandler} type="submit" disabled={buttonState}>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
