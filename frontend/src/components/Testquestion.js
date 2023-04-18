import { Link, Redirect} from 'react-router-dom';
import React, { useState , NavLink } from 'react';
    import Button from 'react-bootstrap/Button';
    import Modal from 'react-bootstrap/Modal';
import Choicesitem from '../components/Choices'

const Questionitem = ({question,result } ) =>{

    return (
    <div className ="question">

        <h1 className="text-center mb-3">{question?.question_text }</h1>
    <form>
        {question?.test_choices.map((choice,index)=>(
            <Choicesitem key = {index} choice= {choice} result = {result} question_text = {question?.question_text} question_id  = {question?.id} />
        ))}
    </form>
    </div>
)


}
export default Questionitem