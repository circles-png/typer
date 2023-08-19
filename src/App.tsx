import { useEffect, useRef, useState } from 'react'
import Finder from 'Finder'
import Menu from 'Menu'
import Spotlight from 'Spotlight'
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
        textArea = useRef<HTMLTextAreaElement>(null),
        save = () => {
          const element = document.createElement('a'),
                content = textArea.current?.value
          element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(content || '')}`)
          element.setAttribute('download', `${content?.split('\n')[0] || 'Typer Document'}.txt`)
          element.style.display = 'none'
          document.body.appendChild(element)
          element.click()
          document.body.removeChild(element)
        },
        [ text, setText ] = useState(''),
        [ darkMode, setDarkMode ] = useState(false),
        toggleDark = () => {
          setDarkMode(!darkMode)
        },
        [ spotlight, setSpotlight ] = useState(false),
        [ finder, setFinder ] = useState(false)

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
        'grid place-content-center h-full bg-gray-100 caret-gray-900 dark:bg-gray-900 dark:text-gray-100 text-gray-900 dark:caret-gray-100 duration-1000 ease-out transition overflow-hidden relative'
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
        if ((event.getModifierState('Meta') || event.getModifierState('Control')) && event.key === 'f') {
          event.preventDefault()
          setFinder(!finder)
          if (finder)
            setTimeout(() => {
              textArea.current?.focus()
            }, 0)
        }
        if ((event.getModifierState('Meta') || event.getModifierState('Control')) && event.getModifierState('Shift') && event.key === 'p' || event.key === 'Escape') {
          event.preventDefault()
          setSpotlight(!spotlight)
          if (spotlight)
            setTimeout(() => {
              textArea.current?.focus()
            }, 0)
        }
      }}
      tabIndex={0}
    >
      <textarea
        className='resize-none m-8 sm:m-16 selection:bg-gray-900 selection:text-gray-100 bg-transparent dark:selection:bg-gray-100 dark:selection:text-gray-900 outline-none'
        placeholder={`${placeholders[Math.floor(Math.random() * placeholders.length)]}...`}
        onInput={event => {
          setText(event.currentTarget.value)
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
        ref={textArea}
        cols={1000}
        rows={1000}
        autoFocus
      />
      <Menu
        toggleDark={toggleDark}
        darkMode={darkMode}
        save={save}
        text={text}
      />
      <Spotlight spotlight={spotlight} escape={() => setSpotlight(false)} />
      <Finder finder={finder} text={text} />
    </div>
  </>
}

export default App
