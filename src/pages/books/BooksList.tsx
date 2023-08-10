import React, { useEffect, useState } from 'react'
import BookItem from './BookItem'
import { commonGetJson } from '../../shared/utils/api-helpers'
import Spinner from '../../shared/components/Spinner';
import { Pagination } from '@mui/material';

export default function BooksList() {

    const [booksList, setBookList] = useState([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getData(page)
    }, [])

    function getData(page:any) {
        setLoading(true)
        commonGetJson('/books?page=' + page)
            .then(x => {
                setBookList(x.data)
                setTotalPages(x.totalPages)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    function handleChange(event:any,value:any){
        setPage(value)
        getData(value)
    }

    return (
        <>
            <h1>BooksList</h1>
            <br />
            <Pagination page={page} count={totalPages} onChange={handleChange}/>
            <hr />
            {
                booksList.map(x => <BookItem data={x} />)
            }
        </>
    )
}
