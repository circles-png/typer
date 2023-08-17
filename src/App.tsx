import { useState } from 'react'

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
        [ wordCount, setWordCount ] = useState(0)
  return <>
    <div className='grid place-content-center h-full'>
      <textarea
        className='resize-none appearance-none p-8 sm:p-16 w-screen h-screen bg-gray-100 selection:bg-gray-900 selection:text-gray-100'
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
      />
      <span className='absolute bottom-4 right-1/2 translate-x-1/2 flex divide-x-2 divide-gray-400 [&>*]:px-4 [&>*:last-child]:pr-0 [&>*:first-child]:pl-0 items-end shadow-lg rounded-xl border p-2 text-sm'>
        <button className='flex flex-col items-center'>
          <span className='flex gap-1 items-center text-[8px] leading-none'>
            <span className='text-xs'>&#8984;</span>
            <span>+</span>
            <span>s</span>
          </span>
          <span className='rounded-lg border px-1'>save</span>
        </button>
        <span>words: {wordCount}</span>
      </span>
    </div>
  </>
}

export default App
