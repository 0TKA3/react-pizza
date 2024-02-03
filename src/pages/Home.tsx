/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setFilters } from "../redux/slices/filterSlice";
import { setSearchFromParams } from "../redux/slices/searchSlice";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import Skeleton from "../components/ProductBlock/Skeleton";
import ProductBlock from "../components/ProductBlock/ProductBlock";
import { fetchData } from "../redux/slices/dataSlice";
import FailedFetch from "../components/FailedFetch/FailedFetch";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";
import { ProductType } from "../types/ProductType";

export default function Home() {
  const navigate = useNavigate();
  const searchValue = useSelector((state: RootState) => state.search.value);

  const { categoryId, sortType, sortOrder } = useSelector((state: RootState) => state.filter);

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const items: ProductType[] = useSelector((state: RootState) => state.data.data);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const sortList = ["rating", "price", "title"];

  async function fetchProducts() {
    setIsLoading(true);
    try {
      await dispatch(
        fetchData({
          categoryId,
          sortType,
          sortOrder,
          searchValue,
          sortList,
        })
      );
    } catch (error) {
      alert("Произошла ошибка, пожалуйста, перезагрузите страницу");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(
        setFilters({
          ...params,
        })
      );
      dispatch(setSearchFromParams(params.searchValue));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    fetchProducts(); // Вызов при первой загрузке страницы
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      fetchProducts();
    }

    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortOrder, searchValue]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortOrder,
        categoryId,
        searchValue,
        sortType,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, sortOrder, searchValue]);

  console.log(items);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все супы</h2>
        <div className="content__items">
          {isLoading ? (
            [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          ) : items.length > 0 ? (
            items.map((obj, index) => <ProductBlock {...obj} key={index}></ProductBlock>)
          ) : (
            <FailedFetch />
          )}
        </div>
      </div>
    </>
  );
}
