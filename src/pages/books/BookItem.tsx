import React from 'react'

export default function BookItem({ data }:any) {
    return (
        <div className='book-item'>
            <img src={data.thumbnailUrl} />
            <h4>{data.title}</h4>
            <div>{data.categories.map((x:any) => <span className='book-category'>{x}</span> )}</div>
        </div>
    )
}
