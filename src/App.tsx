import { useState } from 'react'

const App = () => {
  const placeholders = [
    'Type',
    'Dear diary'
  ],
        [ wordCount, setWordCount ] = useState(0)
  return <>
    <div className='grid place-content-center h-full'>
      <textarea
        className='resize-none appearance-none p-16 w-screen h-screen'
        placeholder={`${placeholders[Math.floor(Math.random() * placeholders.length)]}...`}
        onInput={event => {
          setWordCount(Array.from(event.currentTarget.value.matchAll(/\S+\s?/ug)).length)
        }}
      />
      <span className='absolute bottom-4 right-4 flex divide-x-2 [&_*]:px-2 [&_*:last-child]:pr-0'>
        <button>save</button>
        <span>words: {wordCount}</span>
      </span>
    </div>
  </>
}

export default App
