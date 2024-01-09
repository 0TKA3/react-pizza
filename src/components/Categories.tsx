import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";
import { RootState } from "../redux/store";

export default function Categories() {
  const categoryId: number = useSelector((state: RootState) => state.filter.categoryId);
  const dispatch = useDispatch();
  const categories: string[] = ["Все", "Мясные", "Вегетарианские", "Традиционные", "Острые"];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName: string, index: number) => {
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
