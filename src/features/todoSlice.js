import {createSlice ,createAsyncThunk } from '@reduxjs/toolkit'

export const getTodoAsync= createAsyncThunk ('todos/getTodoAysn',async() => {
    const response = await fetch ('https://jsonplaceholder.typicode.com/todos')
            if(response.ok)
            {
                const todos = await response.json();
                return {todos}
            }

});
export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', 
async (payload) =>{
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST' ,
        headers :{
            'content-type' : 'app;ication/json',
        },
        body: JSON.stringfy({title: payload.title})
    })
           if(response.ok){
               const todo =await response.json();
               return{ todo };
           }
})
export const toggleCompleteAsync = createAsyncThunk(
	'todos/completeTodoAsync',
	async (payload) => {
		const resp = await fetch(`https://jsonplaceholder.typicode.com/todos${payload.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ completed: payload.completed }),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { todo };
		}
	}
);
export const deleteTodoAsync = createAsyncThunk(
	'todos/deleteTodoAsync',
	async (payload) => {
		const resp = await fetch(`https://jsonplaceholder.typicode.com/todos${payload.id}`, {
			method: 'DELETE',
		});

		if (resp.ok) {
			return { id: payload.id };
		}
	}
);
export const todoSlice = createSlice({
    name: 'todos',
    initialState: [
        {id: 1 , title: 'todo1', done : false},
        {id:2 , title: 'todo2', done : false},
        {id: 3 , title: 'todo3', done : false},
    ],
    reducers: {
        addTodo: (state,action) =>{
            

            const  newTodo ={
            item :action.payload.title,
             done: false,
             id:Date.now()
             };
       
        
          state.push(newTodo);
           
        
        } ,
        
        toggleComplete : (state , action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
             );
             state[index].done= action.payload.done;
            
        },
        deleteTodo: (state ,action)=>{
            return state.filtter((todo )=> todo.id !== action.payload.id)
        },
        extraReducers:{
            [getTodoAsync.pending]: (state ,action) =>{
                console.log('fetching data ...')
            },
            [getTodoAsync.fulfilled]: (state , action) =>{
                console.log('fetched data successfully!')
                return action.payload.todos;
            },
            [addTodoAsync.fulfilled]: (state , action) => {
                state.push(action.payload.todo);
            }
        }
    }
}) ;

export const{ 
    addTodo, 
    toggleComplete,
    deleteTodo,
    
 } = todoSlice.actions;

export default todoSlice.reducer;
