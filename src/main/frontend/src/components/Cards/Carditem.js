import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
    return (
        <>
            <li className='cards__item'>
                <Link className='cards__item__link' to={props.path}>
                    <figure className='cards__item__pic-wrap' data-category={props.favorite}>
                        <img
                            className='cards__item__img'
                            alt='Category Image'
                            src={props.src}
                        />
                    </figure>
                    <div className='cards__item__info'>
                        <h5 className='cards__item__text'>{props.name}</h5>
                        <h3 className='cards__item__text2'>등록된 가게 수: {props.num}</h3>
                    </div>
                </Link>
            </li>
        </>
    );
}

export default CardItem;