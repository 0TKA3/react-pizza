import React, { useEffect, useState } from "react";

import { setSearch } from "../../../redux/slices/searchSlice";

import styles from "./search.module.scss";

import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";

export default function Search() {
  const dispatch = useDispatch();

  const searchParamsValue = useSelector((state: RootState) => state.search.value);
  const [localValue, setLocalValue] = useState("");

  useEffect(() => {
    setLocalValue(searchParamsValue);
  }, [searchParamsValue]);

  function inputHandler(e: any) {
    if (e.key === "Enter") {
      dispatch(setSearch(localValue));
    }
  }

  return (
    <div className={styles.root}>
      <input
        className={styles.input}
        placeholder="Поиск.."
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={(e) => dispatch(setSearch(e.target.value))}
        onKeyDown={inputHandler}
        value={localValue}
      />
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="Glyph"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
          id="XMLID_223_"
        />
      </svg>
    </div>
  );
}
