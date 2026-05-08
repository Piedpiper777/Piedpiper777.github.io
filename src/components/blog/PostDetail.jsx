import postsContent from '../../.generated/posts-content.json'
import { getAdjacentPosts, sortedPosts } from '../../data/blogRuntime'
import TableOfContents from './TableOfContents'
import PostPager from './PostPager'

function PostDetail({ slug }) {
  const post = sortedPosts.find((item) => item.slug === slug)
  const content = postsContent.find((item) => item.slug === slug)

  if (!post || !content) {
    return (
      <div className="empty-state">
        <h3>文章不存在</h3>
        <p>请返回列表重新选择。</p>
      </div>
    )
  }

  const { prevPost, nextPost } = getAdjacentPosts(slug)

  return (
    <article className="post-detail">
      <button className="back-btn" onClick={() => { window.location.hash = '#/blog' }}>
        ← 返回博客列表
      </button>

      <h1>{post.title}</h1>
      <div className="post-meta">{post.date} · {post.tags.join(' / ')}</div>

      <div className="post-layout">
        <div className="post-content" dangerouslySetInnerHTML={{ __html: content.html }} />
        <TableOfContents toc={content.toc} />
      </div>

      <PostPager prevPost={prevPost} nextPost={nextPost} />
    </article>
  )
}

export default PostDetail
