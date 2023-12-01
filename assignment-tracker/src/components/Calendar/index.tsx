import styles from "./calendar.module.css";
import {DayPicker} from 'react-day-picker';
import 'react-day-picker/dist/style.css'
import { BsCalendar2Plus } from "react-icons/bs";
import { useState } from "react";

type CalendarProps = {
  buttonState: boolean;
  selectedDate: Date | undefined;
  setSelectedDate: (selectedDate: Date | undefined) => void;
}
export default function Calendar(
  {
    buttonState,
    selectedDate, 
    setSelectedDate
  }: CalendarProps) {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleIconClick = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleDayClick = (date: Date) => {  
    setSelectedDate(date);
  };

  const handleShowCalendar = () => {
    setShowCalendar(true);
  };

  const handleHideCalendar = () => {
    setShowCalendar(false);
  };

  return (
  <div>
    <button 
      onMouseEnter={handleShowCalendar}
      onMouseLeave={handleHideCalendar}
      onFocus={handleShowCalendar}
      onBlur={handleHideCalendar}
      onClick={handleIconClick}
      disabled={buttonState}
      className={styles.buttonForm}
    >
      <BsCalendar2Plus size={20}/>
    </button>
    {showCalendar && (
        <div
          tabIndex={0}
          className={`${styles.calendarWrapper} ${showCalendar && styles.visible}`}
          onMouseEnter={handleShowCalendar}
          onMouseLeave={handleHideCalendar}
        >
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            onDayClick={handleDayClick}
          />
        </div>
      )}
  </div>
  );
}
