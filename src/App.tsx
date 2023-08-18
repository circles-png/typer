import { useEffect, useRef, useState } from 'react'
import Menu from 'Menu'
import Spotlight from 'components/Spotlight'
import classNames from 'classNames'

const App = () => {
  const placeholders = [
    'Mr. and Mrs. Dursley of number four, Privet Drive',
    'Once upon a time',
    'Dear diary',
    'In a land far away',
    'When Mr Bilbo Baggins of Bag End announced',
    'In a hole in the ground there lived',
    'There was a boy called'
  ],
        text = useRef<HTMLTextAreaElement>(null),
        save = () => {
          const element = document.createElement('a'),
                content = text.current?.value
          element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(content || '')}`)
          element.setAttribute('download', `${content?.split('\n')[0] || 'Typer Document'}.txt`)
          element.style.display = 'none'
          document.body.appendChild(element)
          element.click()
          document.body.removeChild(element)
        },
        [ wordCount, setWordCount ] = useState(0),
        [ charCount, setCharCount ] = useState(0),
        [ byteCount, setByteCount ] = useState(0),
        [ darkMode, setDarkMode ] = useState(false),
        toggleDark = () => {
          setDarkMode(!darkMode)
        },
        [ spotlight, setSpotlight ] = useState(false)

  if (darkMode) {
    document.body.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.body.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
      setDarkMode(true)
    else
      setDarkMode(false)
  }, [])

  return <>
    <div
      className={classNames(
        'grid place-content-center h-full bg-gray-100 caret-gray-900 dark:bg-gray-900 dark:text-gray-100 dark:caret-gray-100 duration-1000 ease-out transition'
      )}
      onKeyDown={event => {
        if ((event.getModifierState('Meta') || event.getModifierState('Control')) && event.key === 's') {
          event.preventDefault()
          save()
        }
        if ((event.getModifierState('Meta') || event.getModifierState('Control')) && event.key === 'b') {
          event.preventDefault()
          toggleDark()
        }
        if ((event.getModifierState('Meta') || event.getModifierState('Control')) && event.getModifierState('Shift') && event.key === 'p') {
          event.preventDefault()
          setSpotlight(!spotlight)
          if (spotlight)
            setTimeout(() => {
              text.current?.focus()
            }, 0)
        }
      }}
      tabIndex={0}
    >
      <textarea
        className='resize-none p-8 sm:p-16 w-full selection:bg-gray-900 selection:text-gray-100 bg-transparent dark:selection:bg-gray-100 dark:selection:text-gray-900 outline-none'
        placeholder={`${placeholders[Math.floor(Math.random() * placeholders.length)]}...`}
        onInput={event => {
          setWordCount(
            (
              event.currentTarget.value
                .replace(/[^\w\s]|_/ug, '')
                .replace(/\s+/ug, ' ')
                .toLowerCase()
                .match(/\b[a-z\d]+\b/ug) || []
            ).length
          )
          setCharCount(event.currentTarget.value.length)
          setByteCount(new TextEncoder().encode(event.currentTarget.value).length)
        }}
        onKeyDown={event => {
          if (event.key === 'Tab') {
            event.preventDefault()
            const end = event.currentTarget.selectionEnd,
                  start = event.currentTarget.selectionStart
            event.currentTarget.value = `${event.currentTarget.value.substring(0, start)
            }    ${event.currentTarget.value.substring(end)}`
            event.currentTarget.selectionStart = start + 4
            event.currentTarget.selectionEnd = start + 4
          }
        }}
        ref={text}
        cols={1000}
        rows={1000}
        autoFocus
      />
      <Menu
        toggleDark={toggleDark}
        darkMode={darkMode}
        save={save}
        wordCount={wordCount}
        charCount={charCount}
        byteCount={byteCount}
      />
      <Spotlight spotlight={spotlight} />
    </div>
  </>
}

export default App
