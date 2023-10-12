import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";

type HeaderProps = {
  inputHandler: (event: any) => void;
  createAssignmentHandler: () => void;
  buttonState: boolean;
  enteredText: string;
}
export function Header({inputHandler, createAssignmentHandler, buttonState, enteredText}: HeaderProps) {
  return (
    <header className={styles.header}>
      {/* This is simply to show you how to use helper functions */}
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form className={styles.newAssignmentForm}>
        <input 
        onChange={inputHandler} 
        placeholder="Add a new assignment" 
        type="text" 
        value={enteredText}
        />
        <button onClick={createAssignmentHandler} type="button" disabled={buttonState}>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
