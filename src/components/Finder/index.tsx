import { RefObject, useEffect, useRef, useState } from 'react'
import classNames from 'classNames'

const Finder = ({ finder, text, escape, textArea }: { finder: boolean, text: string, escape: () => void, textArea: RefObject<HTMLTextAreaElement> }) => {
  const input = useRef<HTMLInputElement>(null),
        [ inputText, setInputText ] = useState(''),
        [ selected, setSelected ] = useState(0),
        matches = inputText.length
          ? Array.from(text.matchAll(new RegExp(inputText || '', 'ug')))
          : []

  useEffect(() => {
    if (!finder)
      return
    input.current?.focus({ preventScroll: true })
    input.current?.select()
  }, [finder])
  return <>
    <div
      className={classNames(
        'absolute h-full right-0 w-64 z-10 flex flex-col gap-2 selection:bg-gray-900 selection:text-gray-100 dark:selection:bg-gray-100 dark:selection:text-gray-900 p-4 transition duration-1000',
        finder
          ? 'opacity-100'
          : 'translate-x-full opacity-0'
      )}
      onKeyDown={event => {
        if (event.key === 'Tab' || event.key === 'ArrowDown') {
          event.preventDefault()
          setSelected((selected + 1) % matches.length)
        }
        if (event.key === 'ArrowUp') {
          event.preventDefault()
          setSelected((selected - 1 + matches.length) % matches.length)
        }
        if (event.key === 'Enter') {
          if (!matches.length)
            return
          event.preventDefault()
          textArea.current?.focus()
          textArea.current?.setSelectionRange(matches[selected].index || 0, (matches[selected].index || 0) + (inputText.length || 0))
          escape()
        }
        if (event.key === 'Escape') {
          event.preventDefault()
          textArea.current?.focus()
          escape()
        }
      }}
    >
      <div className='h-full border border-gray-300 dark:border-gray-700 rounded-xl backdrop-blur text-xs'>
        <div className='border-b border-gray-300 dark:border-gray-700 flex items-center p-2 gap-2 h-8'>
          <svg viewBox='0 0 16 16' className={classNames(
            'h-full fill-none w-4',
            finder
              ? ''
              : 'scale-0'
          )}>
            <circle cx={6} cy={6} r={5} className='stroke-2 stroke-gray-300 dark:stroke-gray-700' />
            <line x1={10} y1={10} x2={15} y2={15} className='stroke-2 stroke-gray-300 dark:stroke-gray-700' strokeLinecap='round' />
          </svg>
          <input
            type='text'
            className='w-full bg-inherit outline-none'
            ref={input}
            onInput={event => {
              setInputText(event.currentTarget.value)
            }}
          />
        </div>
        <div className={classNames(
          'p-2',
          matches.length
            ? ''
            : 'hidden'
        )}>
          <ul className='rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 flex flex-col divide-gray-300 dark:divide-gray-700 p-2'>
            {
              matches.map((match, index) => <div
                className={classNames(
                  'text-gray-900 dark:text-gray-100 flex py-1 justify-between px-2 cursor-pointer transition rounded-lg',
                  selected === index
                    ? 'bg-gray-300 dark:bg-gray-700'
                    : ''
                )}
                onMouseEnter={() => {
                  setSelected(index)
                }}
                onClick={() => {
                  textArea.current?.focus()
                  textArea.current?.setSelectionRange(match.index || 0, (match.index || 0) + (inputText.length || 0))
                  escape()
                }}
              >
                <span className='pr-2'>
                  {Array.from(text.substring(0, match.index))
                    .filter(character => character === '\n').length}
                  :
                  {(match.index || 0) - text.lastIndexOf('\n', match.index) - 1}
                </span>
                <span className='pl-2 select-none'>
                  <span className='bg-clip-text from-transparent dark:to-gray-400 to-gray-600 bg-gradient-to-r text-transparent whitespace-pre dark:via-gray-400/20 via-gray-600/20'>
                    {text.substring((match.index || 0) - 4, match.index).padStart(4, ' ')}
                  </span>
                  <span className='dark:text-gray-100 text-gray-900'>{inputText}</span>
                  <span className='bg-clip-text from-transparent dark:to-gray-400 to-gray-600 bg-gradient-to-l text-transparent whitespace-pre dark:via-gray-400/20 via-gray-600/20'>
                    {text.substring((match.index || 0) + (inputText.length || 0), (match.index || 0) + 4 + (inputText.length || 0))
                      .padEnd(4, ' ')}
                  </span>
                </span>
              </div>)
            }
          </ul>
        </div>
      </div>
    </div>
  </>
}

export default Finder
