<div className='mt-6 space-y-4'>
				{data.map(todo => (
					<div
						key={todo.id}
						className='flex justify-between items-center p-4 rounded-lg'
					>
						<div>
							<p className='text-lg font-semibold'>{todo.title }</p>
							<p className='text-gray-600'>{todo.description}</p>
						<p className=''>{todo.status?"done":"not done"}</p>
						</div>
						<div className='flex gap-2'>
							<input
								type='checkbox'
								className='w-[15px]'
								checked={todo.status}
								onChange={()=>dispatch(completed(todo.id))}
							/>
							<button
								onClick={() => dispatch(del(todo.id))}
								className='bg-red-500 text-white py-[4px] px-[10px] text-[12px] rounded-md hover:bg-red-600 '
							>
								Delete
							</button>
							<button
								onClick={() => dispatch(editCLick(todo))}
								className='bg-red-500 text-white py-[4px] px-[10px] text-[12px] rounded-md hover:bg-red-600 '
							>
								edit
							</button>
						</div>
					</div>
				))}
			</div>