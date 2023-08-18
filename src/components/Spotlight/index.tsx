import { useEffect, useRef } from 'react'
import classNames from 'classNames'

const Spotlight = ({ spotlight }: { spotlight: boolean }) => {
  const input = useRef<HTMLInputElement>(null)
  useEffect(() => {
    input.current?.focus()
  }, [spotlight])
  return <>
    <div className={classNames(
      'absolute top-1/4 left-1/2 -translate-x-1/2 border rounded-xl w-1/2 sm:w-1/3 p-2 h-8 flex items-center backdrop-blur bg-gray-100/70 dark:bg-gray-900/70 gap-2 dark:shadow-white/10 transition duration-1000 z-10',
      spotlight
        ? 'shadow-lg border-gray-300 dark:border-gray-700'
        : '-translate-y-16 opacity-0 pointer-events-none scale-110 border-transparent shadow-2xl'
    )}>
      <svg viewBox='0 0 16 16' className={classNames(
        'h-full fill-none transition duration-1000',
        spotlight
          ? ''
          : 'scale-0 rotate-180'
      )}>
        <path
          d='
        M 4 0
        l 8 8
        l -8 8
      '
          className='stroke-gray-300 dark:stroke-gray-700 stroke-2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      <input type='text' className='bg-transparent outline-none w-full caret-gray-900 dark:caret-gray-100 text-sm' ref={input} />
    </div>
    <div
      className={classNames(
        'absolute w-full h-full transition duration-1000',
        spotlight
          ? 'backdrop-blur'
          : 'pointer-events-none'
      )}
    ></div>
  </>
}

export default Spotlight
