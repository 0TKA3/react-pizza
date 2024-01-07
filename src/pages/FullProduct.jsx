/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { addItem } from '../redux/slices/cartSlice'
import { useDispatch } from 'react-redux'

export default function FullProduct() {
    const { productId } = useParams()
    const typeNames = ["оригинальный", "острый"];
    const [activeType, setActiveType] = useState(0);
    const [activeSize, setActiveSize] = useState(0);

    const [product, setProduct] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        try {
            axios
                .get(`https://658ee58f2871a9866e79ff4c.mockapi.io/items?id=${productId}`)
                .then(res => setProduct(res.data[0]))
        } catch (err) {
            console.log(err);
        }
    }, [])

    const addOnClick = () => {
        const item = {
            id: product.id,
            title: product.title,
            price: product.price,
            imageUrl: product.imageUrl,
            size: product.sizes[activeSize],
            type: typeNames[activeType]
        }
        dispatch(addItem(item))
    }

    if (product) {
        return (
            <div className='container'>
                <div className="product-block-wrapper fullproduct-wrapper">
                    <div className="product-detail-block">
                        <div className="product-detail-img">
                            <img className="product-block__image" src={product.imageUrl} alt="product" />
                        </div>
                        <div className="product-detail-info">
                            <h4 className="product-block__title">{product.title}</h4>
                            <div className="product-block__selector">
                                <ul>
                                    {product.types.map((type, index) => (
                                        <li
                                            key={type}
                                            onClick={() => setActiveType(index)}
                                            className={activeType === index ? "active" : ""}>
                                            {typeNames[type]}
                                        </li>
                                    ))}
                                </ul>
                                <ul>
                                    {product.sizes.map((size, index) => (
                                        <li
                                            key={index}
                                            onClick={() => setActiveSize(index)}
                                            className={activeSize === index ? "active" : ""}>
                                            {size} мл.
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="product-block__bottom">
                                <div className="product-block__price">от 395 ₽</div>
                                <button className="button button--outline button--add" onClick={addOnClick}>
                                    <span>Добавить</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <Link to="/" className="button button--black button-fullproduct">
                        <span>Вернуться назад</span>
                    </Link>
                </div>

            </div>
        )
    } else {
        return (
            <>
                <div className="container">
                    <div className="product-block-wrapper">
                        <div className="product-detail-block">
                            <span className="loader"></span>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}
