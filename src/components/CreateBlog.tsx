import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { blogApi } from '@/api/blogs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Plus, X } from 'lucide-react'
import type { CreateBlogInput } from '@/types/blog'

export function CreateBlog() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
  const [formData, setFormData] = useState<CreateBlogInput>({
    title: '',
    category: [],
    description: '',
    date: new Date().toISOString(),
    coverImage: '',
    content: '',
  })
  
  const [categoryInput, setCategoryInput] = useState('')

  const createMutation = useMutation({
    mutationFn: blogApi.createBlog,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      navigate(`/blog/${data.id}`)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createMutation.mutate(formData)
  }

  const addCategory = () => {
    if (categoryInput.trim() && !formData.category.includes(categoryInput.trim().toUpperCase())) {
      setFormData({
        ...formData,
        category: [...formData.category, categoryInput.trim().toUpperCase()],
      })
      setCategoryInput('')
    }
  }

  const removeCategory = (categoryToRemove: string) => {
    setFormData({
      ...formData,
      category: formData.category.filter((cat) => cat !== categoryToRemove),
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addCategory()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button variant="outline" onClick={() => navigate('/')} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blogs
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Create New Blog</CardTitle>
          <CardDescription>
            Fill in the details below to create a new blog post
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter blog title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="A short summary of your blog"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categories</Label>
              <div className="flex gap-2">
                <Input
                  id="category"
                  placeholder="Add a category (e.g., TECH, FINANCE)"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button type="button" onClick={addCategory} size="icon" variant="secondary">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {formData.category.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-2">
                  {formData.category.map((cat) => (
                    <div
                      key={cat}
                      className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                    >
                      {cat}
                      <button
                        type="button"
                        onClick={() => removeCategory(cat)}
                        className="hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL *</Label>
              <Input
                id="coverImage"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                required
              />
              {formData.coverImage && (
                <div className="mt-2 rounded-lg overflow-hidden border">
                  <img
                    src={formData.coverImage}
                    alt="Cover preview"
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL'
                    }}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                placeholder="Write your blog content here..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={12}
                required
              />
              <p className="text-xs text-muted-foreground">
                {formData.content.length} characters
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={createMutation.isPending}
                className="flex-1"
              >
                {createMutation.isPending ? 'Creating...' : 'Create Blog'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
            </div>

            {createMutation.isError && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-md">
                <p className="text-sm">
                  Failed to create blog:{' '}
                  {createMutation.error instanceof Error
                    ? createMutation.error.message
                    : 'Unknown error'}
                </p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
