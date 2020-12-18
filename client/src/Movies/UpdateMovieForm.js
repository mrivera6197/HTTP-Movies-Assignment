import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const StyledForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 3rem;
    }

    input {
        width: 20rem;
        padding: 0.5rem 1rem;
        margin: 0.2rem 0;
    }

    button {
         padding: 0.5rem;
         width: 10rem;
         margin: 1rem 0;
    }
`

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
        e.persist()
        e.target.name === 'stars' ? e.target.value = parseInt(e.target.value, 10) : 
        setValues({
            ...values, 
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = e => {
        e.preventDefault()
        axios
        .put(`http://localhost:5000/api/movies/${id}`, values)
        .then(res=> {
            console.log(res)
            props.getMovieList()
            push('/')
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <StyledForm>
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
        </StyledForm>
    )
}

export default UpdateMovieForm