import { FormEvent, useEffect, useRef } from 'react'
import classNames from 'classNames'

const Finder = ({ finder, onInput, text }: { finder: boolean, onInput: (event: FormEvent<HTMLInputElement>) => void, text: string }) => {
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!finder)
      return
    input.current?.focus({ preventScroll: true })
    input.current?.select()
  }, [finder])
  return <>
    <div
      className={classNames(
        'absolute h-full right-0 w-48 z-10 flex flex-col gap-2 selection:bg-gray-900 selection:text-gray-100 dark:selection:bg-gray-100 dark:selection:text-gray-900 p-4 transition duration-1000',
        finder
          ? 'opacity-100'
          : 'translate-x-full opacity-0'
      )}
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
            onInput={onInput}
          />
        </div>
        <div className='p-2'>
          <ul className='rounded-lg px-2 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 flex flex-col divide-y-2 divide-gray-300 dark:divide-gray-700'>
            {
              (input.current?.value.length
                ? Array.from(text.matchAll(new RegExp(input.current?.value || '', 'ug')))
                : []).map(match => <div className='text-gray-400 dark:text-gray-600 flex py-1 justify-between'>
                <span className='pr-2'>
                  {Array.from(text.substring(0, match.index))
                    .filter(character => character === '\n').length}
                  :
                  {(match.index || 0) - text.lastIndexOf('\n', match.index) - 1}
                </span>
                <span className='pl-2'>
                  <span className='bg-clip-text from-transparent dark:to-gray-400 to-gray-600 bg-gradient-to-r text-transparent'>{text.substring((match.index || 0) - 3, match.index)}</span>
                  <span className='dark:text-gray-100 text-gray-900'>{input.current?.value}</span>
                  <span className='bg-clip-text from-transparent dark:to-gray-400 to-gray-600 bg-gradient-to-l text-transparent'>{text.substring((match.index || 0) + (input.current?.value.length || 0), (match.index || 0) + 3 + 1 + (input.current?.value.length || 0))}</span>
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
