import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { blogApi } from '@/api/blogs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle } from 'lucide-react'

export function BlogList() {
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogApi.getAllBlogs,
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">All Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full rounded-none" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-100 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-2xl font-bold mb-2">Error Loading Blogs</h2>
          <p className="text-muted-foreground mb-4">
            {error instanceof Error ? error.message : 'An unexpected error occurred'}
          </p>
          <p className="text-sm text-muted-foreground">
            Make sure the backend server is running on port 3001
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">All Blogs</h1>
      
      {blogs && blogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No blogs found. Create your first blog!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs?.map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.id}`} className="group">
              <Card className="overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardHeader className="flex-1">
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {blog.category.map((cat) => (
                      <Badge key={cat} variant="secondary">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {blog.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {blog.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {new Date(blog.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
