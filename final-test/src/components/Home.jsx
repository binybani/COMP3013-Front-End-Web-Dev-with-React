import React, { useState } from "react";
import { foods } from "./data";

export default function Home() {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event) => {
    let targetWord = event.target.value;
    setSearchText(targetWord);
  };
  const foodsData = foods;

  // const filteredFood = foodsData.filter((food) => food.name.toLowerCase().includes(searchText.toLowerCase())
  //  || food.description.toLowerCase().includes(searchText.toLowerCase())
  //  );
  function filteredFood() {
    let filteredFood

   filteredFood = foodsData.filter((food) => {
    let matchedFood = food.name.toLowerCase().match(searchText);
    console.log(matchedFood)
      return (
        matchedFood ||
        food.description.match(matchedFood)
      );
    });

    if (filteredFood.length == 0 || searchText.length == 0) return foodsData;
    else return filteredFood;
  }
  function getHighlightedText(text, higlight) {
    var parts = text.split(new RegExp(`(${higlight})`, "gi"));
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part.toLowerCase() === higlight.toLowerCase() ? (
          <b style={{ backgroundColor: "#e8bb49" }}>{part}</b>
        ) : (
          part
        )}
      </React.Fragment>
    ));
  }
  return (
    <>
    <h1>Search Food</h1>
      <input
        type="text"
        placeholder="Search food by name"
        value={searchText}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredFood().map((food) => (   
              <>            
          <li key={food.id} className="food-section">
            <div className="food-section">{getHighlightedText(food.name, searchText)}</div>
            <div className="food-description">{getHighlightedText(food.description, searchText)}</div>
          </li>
          </>
        ))}
      </ul>
    </>
  );
}
