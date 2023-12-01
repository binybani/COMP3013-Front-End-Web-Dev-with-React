import { useState } from "react";
import { foods } from "./data";

export default function Home() {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event) => {
    let targetWord = event.target.value;
    setSearchText(targetWord);
  };
  const foodsData = foods;
  console.log("!!!!!!!!!!!!!!!!!!!!!!",foodsData)

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
          {food.name.includes(searchText) ? (
              <div className="food-name" >
                {food.name.split(searchText)[0]}
                <span style={{ backgroundcolor: "#3F51B5" }}>{searchText}</span>
                {food.name.split(searchText)[1]}
              </div>
            ) : (
              <div className="food-name">
              {food.name}  
            </div>
            )}
            {/* <div className="food-name">
              {food.name}  
            </div> */}
            <div className="food-description">
              {food.description}
            </div>
          </li>
          </>
        ))}
      </ul>
    </>
  );
}
