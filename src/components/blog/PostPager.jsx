function PostPager({ prevPost, nextPost }) {
  return (
    <div className="post-pager">
      {prevPost ? (
        <button onClick={() => { window.location.hash = `#/blog/${encodeURIComponent(prevPost.slug)}` }}>
          ← {prevPost.title}
        </button>
      ) : (
        <span />
      )}
      {nextPost ? (
        <button onClick={() => { window.location.hash = `#/blog/${encodeURIComponent(nextPost.slug)}` }}>
          {nextPost.title} →
        </button>
      ) : (
        <span />
      )}
    </div>
  )
}

export default PostPager
