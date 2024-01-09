import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortType, setSortOrder } from "../redux/slices/filterSlice";
import { RootState } from "../redux/store";

export default function Sort() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const list = ["популярности", "цене", "алфавиту"];

  const { sortType, sortOrder } = useSelector((state: RootState) => state.filter);

  const sortRef = useRef<HTMLDivElement>(null);

  function onClickListItem(index: number) {
    dispatch(setSortType(index));
    setOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{list[sortType]}</span>
        <b>по: </b>
        <span
          onClick={() => {
            dispatch(setSortOrder(sortOrder === "desc" ? "asc" : "desc"));
          }}>
          {sortOrder === "desc" ? "убыванию" : "возрастанию"}
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
