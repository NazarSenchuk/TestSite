
import React, {useState,useEffect} from 'react'
import axios from 'axios';
import Testitem from '../components/Testitem'
import Questiontest from '../components/Testquestion'
import {
    useNavigate,
    useHistory,
  BrowserRouter,
  useParams,
  Link,
} from "react-router-dom";
const Result = (match) => {
    console.log('hellos')
    const pk = match.match.params.pk;
    let [result,setResult] = useState()

    useEffect(() => {
        getResult()
    }, [])

    let getResult = async () => {
       const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
       const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/get_result/${pk}/`, config );
        console.log('data:',res.data)
        setResult(res.data)
    }







    console.log(result)
    return (
    <div>
        <h1> Your rating {result?.rating} </h1>
    </div>

    );
}
export default Result