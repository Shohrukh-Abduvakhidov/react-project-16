import { useDispatch, useSelector } from 'react-redux'
import { del, add, update, completed } from './store/reducer/todolist/todolistSlice.js'
import { useState } from 'react'

export default function App() {
	const data = useSelector(store => store.todolist.data)
	const dispatch = useDispatch()

	const [addTitle, setAddTitle] = useState('')
	const [addDescription, setAddDescription] = useState('')
	const [addStatus, setAddStatus] = useState(false)
	const [open, setOpen] = useState(false)

	const [editId, setEditId] = useState(null)
	const [editTitle, setEditTitle] = useState('')
	const [editDescription, setEditDescription] = useState('')
	const [editStatus, setEditStatus] = useState(false)
	const [openEdit, setOpenEdit] = useState(false)

	const handleAdd = () => {
		const newTodo = {
			id: Date.now(),
			title: addTitle,
			description: addDescription,
			status: addStatus,
		}
		dispatch(add(newTodo))

		setAddTitle('')
		setAddDescription('')
		setAddStatus(false)
		setOpen(false)
	}
	const editCLick = todo => {
		setEditId(todo.id)
		setEditTitle(todo.title)
		setEditDescription(todo.description)
		setEditStatus(todo.status)
		setOpenEdit(true)
	}
	const handleUpdate = () => {
		dispatch(
			update({
				id: editId,
				title: editTitle,
				description: editDescription,
				status: editStatus,
			})
		)
		setOpenEdit(false)
	}
	return (
		<div className='w-[100%] m-auto mt-10'>
			<div className='flex gap-[20px] w-[90%] items-center m-auto justify-between'>
			<h1 className='text-[30px] font-bold my-4'>TODO LIST  
				 <span className='text-purple-700 font-bold'> Redux</span>
			</h1>
			<button
				onClick={() => setOpen(true)}
				className='border-blue-900 cursor-pointer px-[20px] py-[10px] rounded-md bg-blue-500 text-[#fff] font-bold'
			>
				+ Add New
			</button>
			</div>
			{open && (
				<div className='fixed m-auto top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
					<div className='flex w-[500px] h-[300px] flex-col items-center gap-3 rounded-lg bg-white	border-black border-2 p-10'>
						<p className='font-bold text-start items-start w-[90%] m-auto'>Add New Todo</p>
						<div className='flex w-[90%] m-auto gap-5 flex-col'>
							<input
								type='text'
								value={addTitle}
								onChange={e => setAddTitle(e.target.value)}
								placeholder='Enter title'
								className='p-2 w-full border rounded-md'
							/>
							<input
								type='text'
								value={addDescription}
								onChange={e => setAddDescription(e.target.value)}
								placeholder='Enter description'
								className='p-2 border rounded-md'
							/>
						</div>
						<div className='flex gap-[20px] items-center justify-items-start w-[90%] m-auto	'>
						<button
							onClick={handleAdd}
							className='border-blue-500 border-[1px] text-blue-500 font-bold rounded-md hover:bg-blue-200 py-2 px-5'
						>
							Add
						</button>
						<button onClick={() => setOpen(false)} className='cursor-pointer'>Cancel</button>
						</div>
					</div>
				</div>
			)}
			<table className='w-[90%] m-auto'>
				<thead>
					<tr className='border-b border-gray-500'>
						<th className='py-[10px]'>TItle</th>
						<th>Description</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody className='text-center'>
					{
						data.map((todo) => (
							<tr key={todo.id} className='border-b font-bold border-gray-500'>
								<td className='py-[10px]'>{todo.title}</td>
								<td className='py-[10px]'>{todo.description}</td>
								<td className='py-[10px] w-[150px]'>
									<p className={todo.status ? "text-[#fff] bg-[green] rounded-md py-[10px] " : "text-[#fff] bg-[red] rounded-md py-[10px]"}>{todo.status ? "Active" : "Inactive"}</p>
								</td>
								<td className='w-[300px]'>
									<div className='flex gap-[10px] items-center w-[70%] m-auto'>
										<button onClick={() => dispatch(del(todo.id))} className='bg-[red] cursor-pointer text-[#fff] font-bold rounded-md py-[5px] px-[10px]'>
											Delete
										</button>
										<button onClick={() => dispatch(editCLick(todo))} className='bg-blue-500 text-[#fff] cursor-pointer font-bold rounded-md py-[5px] px-[10px]'>
											Edit
										</button>
										<input checked={todo.status} onChange={() => dispatch(completed(todo.id))} type="checkbox" name="" id="" className='w-[20px] h-[20px] cursor-pointer' />
									</div>
								</td>
							</tr>
						))
					}
				</tbody>
			</table>

			{openEdit && (
				<div className='fixed m-auto top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
					<div className='flex w-[500px] h-[300px] flex-col items-center gap-3 rounded-lg bg-white	border-black border-2 p-10'>
						<p className='font-bold w-[90%] m-auto'>Edit todo</p>
					<div className='flex gap-5 flex-col w-[90%] m-auto'>
						<input
							type='text'
							value={editTitle}
							onChange={e => setEditTitle(e.target.value)}
							placeholder='Edit title'
							className='p-2 border rounded-md'
						/>
						<input
							type='text'
							value={editDescription}
							onChange={e => setEditDescription(e.target.value)}
							placeholder='Edit description'
							className='p-2 border rounded-md'
						/>
					</div>
					<div className='flex gap-[20px] items-center w-[90%] m-auto'>
					<button
						onClick={handleUpdate}
						className='border-blue-500 border-[1px] text-blue-500 font-bold rounded-md hover:bg-blue-200 py-2 px-5'
					>
						Update
					</button>
					<button onClick={() => setOpenEdit(false)} className='cursor-pointer'>Cancel</button>
					</div>
				</div>
				</div>
			)}
		</div>
	)
}
