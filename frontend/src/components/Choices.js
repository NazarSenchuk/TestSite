import { Link, Redirect} from 'react-router-dom';
import React, { useState , NavLink } from 'react';
    import Button from 'react-bootstrap/Button';
    import Modal from 'react-bootstrap/Modal';


const Choicesitem = ({choice , result,question_text, question_id} ) =>{
   const [checked, setChecked] = React.useState(false);


    const handleChange = () => {
      setChecked(!checked);
      result[question_id] = choice?.choice_text
      };

    return (
        <div className="form-check">
			<input
				type="radio"
				name="choice"
				className="form-check-input"
				id={choice?.choice_text}
				checked={checked}
                onChange={handleChange}

			/>
			<label>{ choice?.choice_text }</label
			>
		</div>

    )





}
export default Choicesitem