import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from '../redux/slices/filterSlice'

export default function Categories() {

  const categoryId = useSelector((state) => state.filter.categoryId)
  const dispatch = useDispatch()
  const categories = ["Все", "Мясные", "Вегетарианские", "Традиционные", "Острые"];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => {
          return (
            <li
              key={index}
              onClick={() => dispatch(setCategoryId(index))}
              className={categoryId === index ? "active" : ""}>
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
