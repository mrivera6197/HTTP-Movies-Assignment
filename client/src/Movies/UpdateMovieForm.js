import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

const initialValues = {
  title: 'Tombstone',
  director: 'George P. Cosmatos',
  metascore: 89,
  stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
  id: 5,
}

const UpdateMovieForm = (props) => {
    const { push } = useHistory()
    const { id } = useParams()
    const [values, setValues] = useState(initialValues)

    useEffect(() => {
        axios 
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log(res.data)
            setValues(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const handleChange = e => {

    }

    const handleSubmit = e => {
        e.preventDefault()
        axios
        .put(`http://localhost:5000/api/movies/${id}`)
        .then(res=> {
            props.getMovieList()
            push('/')
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
            type='text'
            name='title'
            onChange={handleChange}
            placeholder='title'
            value={values.title}
            />
            <input
            type='text'
            name='director'
            onChange={handleChange}
            placeholder='director'
            value={values.director}
            />
            <input
            type='text'
            name='metascore'
            onChange={handleChange}
            placeholder='metascore'
            value={values.metascore}
            />
            <input
            type='text'
            name='stars'
            onChange={handleChange}
            placeholder='stars'
            value={values.stars}
            />
            <button>update</button>
        </form>
    )
}

export default UpdateMovieForm