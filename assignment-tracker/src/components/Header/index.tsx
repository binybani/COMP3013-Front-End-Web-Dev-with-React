import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";
import { useState } from "react";

export function Header() {
  const [buttonState, setButtonState] = useState(true);

  const buttonHandler =(event: any) => {
    if(event.target.value === '') {
      setButtonState(true);
    } else { 
      setButtonState(false);
    }
    console.log(event.target.value)
  }
  return (
    <header className={styles.header}>
      {/* This is simply to show you how to use helper functions */}
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form className={styles.newAssignmentForm}>
        <input onChange={buttonHandler} placeholder="Add a new assignment" type="text" />
        <button type="button" disabled={buttonState}>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
