import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortType, setSortOrder } from "../redux/slices/filterSlice";

export default function Sort() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()

  const list = ["популярности", "цене", "алфавиту"];

  const sortType = useSelector(state => state.filter.sortType)
  const sortOrder = useSelector(state => state.filter.sortOrder)

  function onClickListItem(index) {
    dispatch(setSortType(index));
    setOpen(false);
  }

  return (
    <div className="sort">
      <div className="sort__label">
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{list[sortType]}</span>
        <b>по: </b>
        <span
          onClick={() => {
            dispatch(setSortOrder(sortOrder == "desc" ? "asc" : "desc"));
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
                className={sortType === index ? "active" : ""}>
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
