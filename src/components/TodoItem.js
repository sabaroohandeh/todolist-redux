import React from 'react';
import {useDispatch} from 'react-redux';
import  togglecomplete  from '../features/todoSlice';
import deleteTodo from '../features/todoSlice';


const TodoItem = ({ id, title, done }) => {
	const dispatch = useDispatch();

	const handledoneclick = () => {
		dispatch(togglecomplete({id: id , done : !done}));
	}

	const handleDeletClick = () => {
		dispatch(deleteTodo ({id: id}));
	};
	return (
		<li className={`list-group-item ${done && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
					<input type='checkbox' className='mr-3' checked={done} onChange={handledoneclick}></input>
					{title}
				</span>
				<button onClick={handleDeletClick} className='btn btn-danger'>Delete</button>
			</div>
		</li>
	);
};

export default TodoItem;
