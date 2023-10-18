import styles from "./calendar.module.css";
import {DayPicker} from 'react-day-picker';
import 'react-day-picker/dist/style.css'
import { BsCalendar2Plus } from "react-icons/bs";
import { format } from "date-fns";
import { useState } from "react";

type CalendarProps = {
  // inputHandler: (event: any) => void;
  buttonState: boolean;
  selectedDate: Date | undefined;
  setSelectedDate: (selectedDate: Date | undefined) => void;
}
export default function Calendar(
  {
    // inputHandler, 
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
  const handleMouseEnter = () => {
    if (!buttonState) {
      setShowCalendar(true);
    }
  };

  const handleMouseLeave = () => {
    setShowCalendar(false);
  };

  return (
  <div className={styles.calendarContainer}>
    <button 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleIconClick}
      disabled={buttonState}
      className={styles.calendarButton}
    >
      <BsCalendar2Plus size={20}/>
    </button>
    {showCalendar && (
        <div 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave} 
        className={styles.calendarWrapper}
        >
          <DayPicker
            mode="single"
            selected={selectedDate}
            onDayClick={handleDayClick}
            // modifiers={{
            //   selectedDay: (d) => d.getDate() === selectedDate?.getDate(),
            //   unselectedDay: (d) => d.getDate() !== selectedDate?.getDate(),
            // }}
          />
        </div>
      )}
  </div>
  );
}
