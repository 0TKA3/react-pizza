/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setFilters } from "../redux/slices/filterSlice";
import { setSearchFromParams } from '../redux/slices/searchSlice'
import { useSelector, useDispatch } from "react-redux";
import qs from 'qs'
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import Skeleton from "../components/ProductBlock/Skeleton";
import ProductBlock from "../components/ProductBlock/ProductBlock";
import { fetchData } from "../redux/slices/dataSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function Home() {
  const navigate = useNavigate()
  const categoryId = useSelector(state => state.filter.categoryId)
  const sortType = useSelector(state => state.filter.sortType)
  const sortOrder = useSelector(state => state.filter.sortOrder)
  const searchValue = useSelector(state => state.search.value)

  const isSearch = useRef(false)
  const isMounted = useRef(false)


  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const dispatch = useDispatch()


  const sortList = ["rating", "price", "title"];


  async function fetchProducts() {
    setIsLoading(true);
    try {
      const actionResult = await dispatch(fetchData({ categoryId, sortType, sortOrder, searchValue, sortList }));
      const result = unwrapResult(actionResult);
      setItems(result);
    } catch (error) {
      alert('Произошла ошибка, пожалуйста, перезагрузите страницу');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      dispatch(setFilters({
        ...params
      }))
      dispatch(setSearchFromParams(params.searchValue))
      isSearch.current = true
    }
  }, [])

  useEffect(() => {
    fetchProducts(); // Вызов при первой загрузке страницы
  }, [])



  useEffect(() => {
    if (!isSearch.current) {
      fetchProducts()
    }

    isSearch.current = false
    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortOrder, searchValue]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortOrder,
        categoryId,
        searchValue,
        sortType
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sortType, sortOrder, searchValue])


  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все супы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : items
              .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
              .map((obj, index) => <ProductBlock {...obj} key={index}></ProductBlock>)}
        </div>
      </div>
    </>
  );
}
