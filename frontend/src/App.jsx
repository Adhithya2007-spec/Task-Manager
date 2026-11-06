
import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = 'http://localhost:5000/api'

function App() {
  // Authentication states
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  // Task states
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')

  // Load tasks when the user logs in
  useEffect(() => {
    async function fetchTasks() {
      if (!token) {
        setTasks([])
        return
      }

      try {
        const response = await axios.get(`${API_URL}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setTasks(
          response.data.map(task => ({
            id: task._id,
            title: task.title,
            description: task.description,
            dueDate: task.dueDate
              ? task.dueDate.substring(0, 10)
              : '',
            completed: task.completed
          }))
        )
      } catch (error) {
        console.error('Error loading tasks:', error)
        alert('Could not load tasks. Please log in again.')
      }
    }

    fetchTasks()
  }, [token])

  // Login and registration
  const handleAuth = async (e) => {
    e.preventDefault()

    try {
      const endpoint = isRegistering ? 'register' : 'login'

      const userData = isRegistering
        ? { name, email, password }
        : { email, password }

      const response = await axios.post(
        `${API_URL}/users/${endpoint}`,
        userData
      )

      if (isRegistering) {
        alert('Registration successful! Please log in.')
        setIsRegistering(false)
        setName('')
        setPassword('')
        return
      }

      const receivedToken = response.data.token

      localStorage.setItem('token', receivedToken)
      setToken(receivedToken)

      setEmail('')
      setPassword('')

      alert('Login successful!')
    } catch (error) {
      alert(
        error.response?.data?.message ||
        'Authentication failed. Please try again.'
      )
    }
  }

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken('')
    setTasks([])
    setEmail('')
    setPassword('')
    setName('')
  }

  // Add a new task
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim()) {
      alert('Please enter a task title.')
      return
    }

    try {
      const response = await axios.post(
        `${API_URL}/tasks`,
        {
          title,
          description,
          dueDate: dueDate || null
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const newTask = {
        id: response.data._id,
        title: response.data.title,
        description: response.data.description,
        dueDate: response.data.dueDate
          ? response.data.dueDate.substring(0, 10)
          : '',
        completed: response.data.completed
      }

      setTasks(previousTasks => [...previousTasks, newTask])

      setTitle('')
      setDescription('')
      setDueDate('')
    } catch (error) {
      alert(
        error.response?.data?.message ||
        'Could not add task. Please try again.'
      )
    }
  }

  // Mark task as completed or pending
  const toggleComplete = async (id) => {
    const task = tasks.find(item => item.id === id)

    if (!task) return

    try {
      await axios.put(
        `${API_URL}/tasks/${id}`,
        {
          completed: !task.completed
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setTasks(previousTasks =>
        previousTasks.map(item =>
          item.id === id
            ? { ...item, completed: !item.completed }
            : item
        )
      )
    } catch (error) {
      alert('Could not update task.')
    }
  }

  // Delete a task
  const deleteTask = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this task?'
    )

    if (!confirmed) return

    try {
      await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setTasks(previousTasks =>
        previousTasks.filter(task => task.id !== id)
      )
    } catch (error) {
      alert('Could not delete task.')
    }
  }

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'Pending') return !task.completed
    if (filter === 'Completed') return task.completed
    return true
  })

  return (
    <main className="container">
      <h1>Task Manager</h1>
      <p className="subtitle">Organize your day, one task at a time.</p>

      {!token && (
        <section className="task-form">
          <h2>{isRegistering ? 'Create Account' : 'Login'}</h2>

          <form onSubmit={handleAuth}>
            {isRegistering && (
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            )}

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            <button type="submit">
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </form>

          <p>
            {isRegistering
              ? 'Already have an account?'
              : "Don't have an account?"}
            {' '}
            <button
              type="button"
              className="text-button"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? 'Login' : 'Register'}
            </button>
          </p>
        </section>
      )}

      {token && (
        <>
          <div className="logout-container">
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>

          {/* Add New Task */}
          <section className="task-form">
            <h2>Add New Task</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />

              <textarea
                placeholder="Task description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />

              <label htmlFor="dueDate">Due Date</label>
              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
              />

              <button type="submit">Add Task</button>
            </form>
          </section>

          {/* My Tasks */}
          <section className="task-list">
            <h2>My Tasks ({tasks.length})</h2>

            <div className="filters">
              {['All', 'Pending', 'Completed'].map(option => (
                <button
                  key={option}
                  className={filter === option ? 'active' : ''}
                  onClick={() => setFilter(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            {filteredTasks.length === 0 ? (
              <p className="empty-message">
                No tasks found. Add a new task!
              </p>
            ) : (
              filteredTasks.map(task => (
                <div
                  className={`task-card ${
                    task.completed ? 'completed' : ''
                  }`}
                  key={task.id}
                >
                  <div className="task-content">
                    <h3>{task.title}</h3>

                    {task.description && (
                      <p>{task.description}</p>
                    )}

                    {task.dueDate && (
                      <p className="due-date">
                        Due date: {task.dueDate}
                      </p>
                    )}

                    <p className="status">
                      Status: {task.completed ? 'Completed' : 'Pending'}
                    </p>
                  </div>

                  <div className="task-actions">
                    <button
                      onClick={() => toggleComplete(task.id)}
                    >
                      {task.completed ? 'Undo' : 'Complete'}
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>
        </>
      )}
    </main>
  )
}

export default App
