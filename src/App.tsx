import useOperatingSystem, { OperatingSystem } from 'useOperatingSystem'
import { useRef, useState } from 'react'
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
        os = useOperatingSystem()

  if (darkMode)
    document.body.classList.add('dark')
  else
    document.body.classList.remove('dark')
  return <>
    <div
      className={classNames(
        'grid place-content-center h-full bg-gray-100 caret-gray-900 dark:bg-gray-900 dark:text-gray-100 dark:caret-gray-100 transition duration-1000'
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
      />
      <span className='flex divide-x-2 divide-gray-300 [&>*]:px-4 [&>*:last-child]:pr-0 [&>*:first-child]:pl-0 items-end shadow-lg rounded-xl border p-2 text-sm justify-center m-auto my-4 dark:divide-gray-700 transition duration-1000 border-gray-300 dark:border-gray-700'>
        <button
          className='flex flex-col items-center'
          onClick={toggleDark}
        >
          <span className='flex gap-1 items-center text-[8px] leading-none'>
            {
              os === OperatingSystem.macOS
                ? <span className='text-xs'>&#8984;</span>
                : <span>CTRL</span>
            }
            <span>B</span>
          </span>
          <span className='rounded-lg border px-1 transition duration-1000 border-gray-300 dark:border-gray-700'>
            {
              darkMode
                ? 'dark'
                : 'light'
            }
          </span>
        </button>
        <button
          className='flex flex-col items-center'
          onClick={save}
        >
          <span className='flex gap-1 items-center text-[8px] leading-none'>
            {
              os === OperatingSystem.macOS
                ? <span className='text-xs'>&#8984;</span>
                : <span>CTRL</span>
            }
            <span>S</span>
          </span>
          <span className='rounded-lg border px-1 transition duration-1000 border-gray-300 dark:border-gray-700'>save</span>
        </button>
        <span>words: {wordCount}</span>
        <span>characters: {charCount} ({byteCount} bytes)</span>
      </span>
    </div>
  </>
}

export default App
