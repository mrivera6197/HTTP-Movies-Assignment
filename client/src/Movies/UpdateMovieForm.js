import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

const initialValue = {
    id: 5,
    title: 'Tombstone',
    director: 'George P. Cosmatos',
    metascore: 89,
    stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
}

const UpdateMovieForm = props => {
    const { push } = useHistory()
    const { id } = useParams()
    const[movieInfo, setMovieInfo] = useState(initialValue)

    useEffect(()=> {
        //axios get
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log(res.data)
            setMovieInfo(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const handleChange = e => {
        //setValue
        e.persist()
        let value = e.target.value
        e.target.name === 'stars' ? value = parseInt(value,10) : 
        setMovieInfo({
            ...movieInfo,
            [e.target.name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        //put request
        axios.put(`http://localhost:5000//api/movies/${id}`. movieInfo)
        .then(res => {
            console.log(res)
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
            name='name'
            onChange={handleChange}
            placeholder='director'
            value={movieInfo.director}
            />
            <input
            type='text'
            name='metascore'
            onChange={handleChange}
            placeholder='metascore'
            value={movieInfo.metascore}
            />
            <input
            type='text'
            name='stars'
            onChange={handleChange}
            placeholder='stars'
            value={movieInfo.stars}
            />
            <input
            type='text'
            name='title'
            onChange={handleChange}
            placeholder='title'
            value={movieInfo.title}    
            />
            <button>update</button>
        </form>
    )

}

export default UpdateMovieForm