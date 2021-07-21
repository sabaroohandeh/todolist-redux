import React from 'react';
import { useSelector } from 'react-redux';


const TotalCompleteItems = () => {
	const doneTodos= useSelector((state)=> state.todos.filter((todo)=> todo.done ===true))
return <h4 className='mt-3'>Total Complete Items: {doneTodos.length}</h4>;
};

export default TotalCompleteItems;
