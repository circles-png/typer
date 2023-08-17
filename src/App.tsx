import { useRef, useState } from 'react'

const App = () => {
  const placeholders = [
    'Mr. and Mrs. Dursley of number four, Privet Drive...',
    'Once upon a time...',
    'Dear diary...',
    'In a land far away...',
    'When Mr Bilbo Baggins of Bag End announced...',
    'In a hole in the ground there lived...',
    'There was a boy called...'
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
        [ charCount, setCharCount ] = useState(0)

  return <>
    <div className='grid place-content-center h-full bg-gray-100 caret-black'>
      <textarea
        className='resize-none p-8 sm:p-16 w-full selection:bg-gray-900 selection:text-gray-100 bg-transparent'
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
          if ((event.getModifierState('Meta') || event.getModifierState('Control')) && event.key === 's') {
            event.preventDefault()
            save()
          }
        }}
        ref={text}
        cols={1000}
        rows={1000}
      />
      <span className='flex divide-x-2 divide-gray-400 [&>*]:px-4 [&>*:last-child]:pr-0 [&>*:first-child]:pl-0 items-end shadow-lg rounded-xl border p-2 text-sm justify-center m-auto my-4'>
        <button
          className='flex flex-col items-center'
          onClick={save}
        >
          <span className='flex gap-1 items-center text-[8px] leading-none'>
            <span className='text-xs'>&#8984;</span>
            <span>+</span>
            <span>s</span>
          </span>
          <span className='rounded-lg border px-1'>save</span>
        </button>
        <span>words: {wordCount}</span>
        <span>characters: {charCount}</span>
      </span>
    </div>
  </>
}

export default App
