import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { blogApi } from '@/api/blogs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle, ArrowLeft, Calendar } from 'lucide-react'

export function BlogDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const { data: blog, isLoading, error } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogApi.getBlogById(id!),
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-10 w-32 mb-6" />
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <Skeleton className="h-96 w-full mb-8 rounded-lg" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="outline" onClick={() => navigate('/')} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blogs
        </Button>
        <div className="flex flex-col items-center justify-center min-h-100 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-2xl font-bold mb-2">Blog Not Found</h2>
          <p className="text-muted-foreground mb-4">
            {error instanceof Error ? error.message : 'The blog you are looking for does not exist'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button variant="outline" onClick={() => navigate('/')} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blogs
      </Button>

      <article>
        <div className="mb-6">
          <div className="flex gap-2 mb-4 flex-wrap">
            {blog.category.map((cat) => (
              <Badge key={cat} variant="secondary">
                {cat}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center text-muted-foreground mb-2">
            <Calendar className="mr-2 h-4 w-4" />
            <time dateTime={blog.date}>
              {new Date(blog.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <p className="text-xl text-muted-foreground">{blog.description}</p>
        </div>

        <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="whitespace-pre-wrap text-foreground leading-relaxed">
            {blog.content}
          </div>
        </div>
      </article>
    </div>
  )
}
