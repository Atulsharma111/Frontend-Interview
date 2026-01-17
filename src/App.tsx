import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from '@/components/Header'
import { BlogList } from '@/components/BlogList'
import { BlogDetail } from '@/components/BlogDetail'
import { CreateBlog } from '@/components/CreateBlog'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/create" element={<CreateBlog />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
