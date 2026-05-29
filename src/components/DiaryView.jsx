import { useState, useEffect } from 'react'
import DiaryList from './DiaryList'
import DiaryDetail from './DiaryDetail'

function getCurrentSlug() {
  const hash = window.location.hash || '#/diary'
  const match = hash.match(/^#\/diary\/(.+)$/)
  if (!match) return null
  try {
    return decodeURIComponent(match[1])
  } catch {
    return null
  }
}

function DiaryView() {
  const [slug, setSlug] = useState(getCurrentSlug)

  useEffect(() => {
    const onHashChange = () => setSlug(getCurrentSlug())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return slug ? <DiaryDetail slug={slug} /> : <DiaryList />
}

export default DiaryView
