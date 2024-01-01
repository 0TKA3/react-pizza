import { useState } from "react";

export default function Sort({ value, setSortType, sortOrder, setSortOrder }) {
  const [open, setOpen] = useState(false);

  const list = ["популярности", "цене", "алфавиту"];

  function onClickListItem(index) {
    setSortType(index);
    setOpen(false);
  }

  return (
    <div className="sort">
      <div className="sort__label">
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{list[value]}</span>
        <b>по: </b>
        <span
          onClick={() => {
            setSortOrder(sortOrder == "desc" ? "asc" : "desc");
          }}>
          {sortOrder == "desc" ? "убыванию" : "возрастанию"}
        </span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((name, index) => (
              <li
                key={index}
                onClick={() => onClickListItem(index)}
                className={value === index ? "active" : ""}>
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
