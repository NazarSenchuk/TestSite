
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
const TestPage = (match) => {
    const history = useHistory();
    const pk = match.match.params.pk;
    let [result,setResult] = useState({



    })
    let [Test,setTest] = useState([])
    useEffect(() => {
        getTest()
    }, [])


    let getTest = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/get_test/${pk}/`,config)


        setTest(response.data)
    }

    async function post_result(){

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        if(Object.keys(result).length == Test.test_questions.length ){
        const body = JSON.stringify({ test_result :result ,test : Test});
        let response = await axios.post(`${process.env.REACT_APP_API_URL}/api/post_result/`,body, config)
        const url  = `/result/${response.data.id}`
        return history.push(url)
        }




    }
    return (
    <div>
    {Test.test_questions?.map((question,index)=>(
         <Questiontest question = {question} key = {index} result = {result} />))}
         <div>

        <button onClick = {post_result}>Post</button>


         </div>
    </div>

    );
}
export default TestPage