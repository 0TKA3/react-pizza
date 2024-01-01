import React from "react";
import { useState, useEffect } from "react";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

export default function Home({ searchValue }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState(0);
  const [sortOrder, setSortOrder] = useState("desc");

  const sortList = ["rating", "price", "title"];

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://658ee58f2871a9866e79ff4c.mockapi.io/items" +
        `?sortBy=${sortList[sortType]}&order=${sortOrder}` +
        (categoryId ? `&category=${categoryId}` : "") +
        (searchValue ? `&search=${searchValue}` : "")
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortOrder, searchValue]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} setCategoryId={setCategoryId} />
          <Sort
            value={sortType}
            setSortType={setSortType}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : items
                .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
                .map((obj, index) => <PizzaBlock {...obj} key={index}></PizzaBlock>)}
        </div>
      </div>
    </>
  );
}
