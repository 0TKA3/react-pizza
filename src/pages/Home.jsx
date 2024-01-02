import React from "react";
import { useState, useEffect } from "react";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function Home() {
  const categoryId = useSelector(state => state.filter.categoryId)
  const sortType = useSelector(state => state.filter.sortType)
  const sortOrder = useSelector(state => state.filter.sortOrder)
  const searchValue = useSelector(state => state.search.value)


  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const sortList = ["rating", "price", "title"];


  useEffect(() => {
    setIsLoading(true);
    axios.get("https://658ee58f2871a9866e79ff4c.mockapi.io/items" +
      `?sortBy=${sortList[sortType]}&order=${sortOrder}` +
      (categoryId ? `&category=${categoryId}` : "") +
      (searchValue ? `&search=${searchValue}` : ""))
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortOrder, searchValue]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
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
