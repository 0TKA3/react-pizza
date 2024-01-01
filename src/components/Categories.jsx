import { useState } from "react";

export default function Categories({ value, setCategoryId }) {
  const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые"];
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => {
          return (
            <li
              key={index}
              onClick={() => setCategoryId(index)}
              className={value === index ? "active" : ""}>
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
