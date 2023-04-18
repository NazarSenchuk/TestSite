import React, {useState,useEffect} from 'react'
import axios from 'axios';
import Testitem from '../components/Testitem'

import {
    useNavigate,
  BrowserRouter,
  useParams,
  Link
} from "react-router-dom";


function GuestGreeting(props) {
  return <h1>Ввійдіть будь ласка</h1>;
}
const NotesListPage = () => {

    let [notes,setNotes] = useState([])
    useEffect(() => {
        getNotes()
    }, [])

    let getNotes = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/get_tests/`,config)


        setNotes(response.data)

    }

    let access =  localStorage.getItem('access')
   if(!access){

   return <GuestGreeting />;}



    return (
        <div className = "notes">

        <div className = "notes-list">
        <h2> Tests List</h2>
        {notes.map((note,index)=>(

        <Testitem key = {index} note= {note}/>))}

        </div>

        </div>
    )
}
export default NotesListPage