import { useState, useEffect } from 'react'
import { planData } from '../data/planData'

const STORAGE_KEY = 'learning-notes'

function NotesView() {
  const [notes, setNotes] = useState([])
  const [selectedWeekId, setSelectedWeekId] = useState(1)
  const [editingNote, setEditingNote] = useState(null)
  const [noteContent, setNoteContent] = useState('')
  const [showEditor, setShowEditor] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setNotes(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load notes:', e)
      }
    }
  }, [])

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
    }
  }, [notes])

  const weekNotes = notes.filter(n => n.weekId === selectedWeekId)

  const handleNewNote = () => {
    setEditingNote(null)
    setNoteContent('')
    setShowEditor(true)
  }

  const handleEditNote = (note) => {
    setEditingNote(note)
    setNoteContent(note.content)
    setShowEditor(true)
  }

  const handleSaveNote = () => {
    if (!noteContent.trim()) return

    if (editingNote) {
      setNotes(notes.map(n => 
        n.id === editingNote.id 
          ? { ...n, content: noteContent, updatedAt: new Date().toISOString() }
          : n
      ))
    } else {
      const newNote = {
        id: Date.now(),
        weekId: selectedWeekId,
        content: noteContent,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      setNotes([...notes, newNote])
    }

    setShowEditor(false)
    setEditingNote(null)
    setNoteContent('')
  }

  const handleDeleteNote = (id) => {
    if (confirm('确定要删除这条笔记吗？')) {
      setNotes(notes.filter(n => n.id !== id))
    }
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="notes-view">
      <h2>📝 学习记录</h2>

      <div className="notes-controls">
        <select 
          value={selectedWeekId} 
          onChange={e => setSelectedWeekId(Number(e.target.value))}
        >
          {planData.weeks.map(week => (
            <option key={week.id} value={week.id}>
              {week.title}
            </option>
          ))}
        </select>

        <button onClick={handleNewNote}>+ 新建笔记</button>
      </div>

      {showEditor && (
        <div className="note-editor">
          <textarea
            value={noteContent}
            onChange={e => setNoteContent(e.target.value)}
            placeholder="输入你的学习笔记..."
          />
          <div className="note-editor-actions">
            <button className="save-btn" onClick={handleSaveNote}>
              保存
            </button>
            <button className="cancel-btn" onClick={() => {
              setShowEditor(false)
              setEditingNote(null)
              setNoteContent('')
            }}>
              取消
            </button>
          </div>
        </div>
      )}

      {weekNotes.length === 0 && !showEditor ? (
        <div className="empty-state">
          <h3>暂无笔记</h3>
          <p>点击"新建笔记"开始记录你的学习内容</p>
        </div>
      ) : (
        <ul className="notes-list">
          {weekNotes
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .map(note => (
              <li 
                key={note.id} 
                className={`note-item ${editingNote?.id === note.id ? 'active' : ''}`}
                onClick={() => handleEditNote(note)}
              >
                <div className="note-item-header">
                  <span className="note-item-title">笔记</span>
                  <div>
                    <span className="note-item-date">{formatDate(note.updatedAt)}</span>
                    <button 
                      className="delete-btn" 
                      style={{ marginLeft: '1rem' }}
                      onClick={e => {
                        e.stopPropagation()
                        handleDeleteNote(note.id)
                      }}
                    >
                      删除
                    </button>
                  </div>
                </div>
                <div className="note-item-content">
                  {note.content.substring(0, 200)}
                  {note.content.length > 200 ? '...' : ''}
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}

export default NotesView
