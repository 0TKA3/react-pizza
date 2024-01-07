import React from 'react'
import emptyCartImg from '../assets/img/empty-cart.png'
import { Link } from 'react-router-dom'

export default function CartEmpty() {
    return (
        <div className="cart cart--empty">
            <h2>Корзина пустая 😕</h2>
            <p>
                Вероятней всего, вы не заказывали ещё супы.<br />
                Для того, чтобы заказать супы, перейди на главную страницу.
            </p>
            <div className='image-placeholder'>
                <img src={emptyCartImg} alt="Empty cart" />
            </div>
            <Link to="/" className="button button--black">
                <span>Вернуться назад</span>
            </Link>
        </div>
    )
}
