import { useEffect, useRef, useState } from 'react'
import classNames from 'classNames'

export type Command = {
  name: string
  command: () => void
}
const Spotlight = ({ spotlight, escape, commands }: { spotlight: boolean, escape: () => void, commands: Command[] }) => {
  const input = useRef<HTMLInputElement>(null),
        [ matching, setMatching ] = useState<Command[]>([]),
        [ selected, setSelected ] = useState(0)
  useEffect(() => {
    input.current?.focus()
    input.current?.select()
  }, [spotlight])
  return <>
    <div
      className='absolute top-1/4 left-1/2 -translate-x-1/2 w-1/2 sm:w-1/3 z-30 flex flex-col gap-2 selection:bg-gray-900 selection:text-gray-100 dark:selection:bg-gray-100 dark:selection:text-gray-900'
      onKeyDown={event => {
        if (event.key === 'Tab' || event.key === 'ArrowDown') {
          event.preventDefault()
          setSelected((selected + 1) % matching.length)
        }
        if (event.key === 'ArrowUp') {
          event.preventDefault()
          setSelected((selected - 1 + matching.length) % matching.length)
        }
        if (event.key === 'Enter') {
          event.preventDefault()
          matching[selected].command()
        }
        if (event.key === 'Escape') {
          event.preventDefault()
          escape()
        }
      }}
    >
      <div className='flex flex-col gap-2'>
        <div className={classNames(
          'border rounded-xl p-2 h-8 flex items-center backdrop-blur bg-gray-100/70 dark:bg-gray-900/70 gap-2 dark:shadow-white/10 transition duration-1000',
          spotlight
            ? 'shadow-lg border-gray-300 dark:border-gray-700'
            : '-translate-y-16 opacity-0 pointer-events-none scale-110 border-transparent shadow-2xl'
        )}>
          <svg viewBox='0 0 16 16' className={classNames(
            'h-full fill-none transition duration-1000',
            spotlight
              ? ''
              : 'scale-0'
          )}>
            <path
              d='
                M 5 1
                l 7 7
                l -7 7
              '
              className='stroke-gray-300 dark:stroke-gray-700 stroke-2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <input
            type='text'
            className='bg-transparent outline-none w-full caret-gray-900 dark:caret-gray-100 text-xs'
            ref={input}
            placeholder='type a command...'
            onInput={event => {
              const command = event.currentTarget.value.trim().toLowerCase()
              setMatching(
                commands.filter(({ name }) => name.includes(command) && command.length > 0)
              )
              setSelected(0)
            }}
          />
        </div>
        <ul className={classNames(
          'border rounded-xl p-2 flex flex-col items-center backdrop-blur bg-gray-100/70 dark:bg-gray-900/70 dark:shadow-white/10 transition duration-1000 text-xs delay-75',
          spotlight
            ? 'shadow-lg border-gray-300 dark:border-gray-700'
            : '-translate-y-16 opacity-0 pointer-events-none scale-110 border-transparent shadow-2xl',
          matching.length > 0
            ? ''
            : 'hidden'
        )}>
          {matching.map(({ name, command }, index) => <li
            key={name}
            onClick={command}
            className={classNames(
              'w-full rounded-lg p-2 transition',
              index === selected
                ? 'bg-gray-200/70 dark:bg-gray-800/70'
                : ''
            )}
            onMouseEnter={() => setSelected(index)}
          >
            <span>{name}</span>
          </li>)}
        </ul>
      </div>
    </div>
    <div
      className={classNames(
        'absolute w-full h-full transition duration-1000 z-20',
        spotlight
          ? 'backdrop-blur'
          : 'pointer-events-none'
      )}
    ></div>
  </>
}

export default Spotlight
