import useOperatingSystem, { OperatingSystem } from 'useOperatingSystem'

const Menu = (
  {
    toggleDark,
    darkMode,
    save,
    text,
    spotlight,
    finder
  }: {
      toggleDark: () => void,
      darkMode: boolean,
      save: () => void,
      text: string,
      spotlight: () => void,
      finder: () => void
    }
) => {
  const os = useOperatingSystem()
  return <span className='flex flex-col items-stretch sm:flex-row divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-300 [&>*]:py-2 sm:[&>*]:py-0 sm:[&>*]:px-2 [&>*:last-child]:pb-0 sm:[&>*:last-child]:py-0 sm:[&>*:last-child]:pr-0 [&>*:first-child]:pt-0 sm:[&>*:first-child]:py-0 sm:[&>*:first-child]:pl-0 shadow-lg dark:shadow-white/10 rounded-xl border p-2 text-sm justify-center m-auto my-4 dark:divide-gray-700 border-gray-300 dark:border-gray-700'>
    <div className='flex justify-evenly gap-2'>
      <button
        className='flex flex-col items-center group'
        onClick={finder}
      >
        <span className='flex gap-1 items-center text-[8px] leading-none'>
          {os === OperatingSystem.macOS
            ? <span className='text-xs'>&#8984;</span>
            : <span>CTRL</span>}
          <span>F</span>
        </span>
        <span className='rounded-lg border px-1 border-gray-300 dark:border-gray-700 group-hover:bg-gray-300 dark:group-hover:bg-gray-600 transition'>
          find
        </span>
      </button>
      <button
        className='flex flex-col items-center group'
        onClick={spotlight}
      >
        <span className='flex gap-1 items-center text-[8px] leading-none'>
          {os === OperatingSystem.macOS
            ? <>
                <span className='text-xs'>
                  &#8984;
                </span>
                <span className='scale-150 -translate-y-px'>
                  &#8679;
                </span>
              </>
            : <span>CTRL SHIFT</span>}
          <span>P</span>
        </span>
        <span className='rounded-lg border px-1 border-gray-300 dark:border-gray-700 group-hover:bg-gray-300 dark:group-hover:bg-gray-600 transition'>
          spotlight
        </span>
      </button>
      <button
        className='flex flex-col items-center group'
        onClick={toggleDark}
      >
        <span className='flex gap-1 items-center text-[8px] leading-none'>
          {os === OperatingSystem.macOS
            ? <span className='text-xs'>&#8984;</span>
            : <span>CTRL</span>}
          <span>B</span>
        </span>
        <span className='rounded-lg border px-1 border-gray-300 dark:border-gray-700 group-hover:bg-gray-300 dark:group-hover:bg-gray-600 transition'>
          {darkMode
            ? 'dark'
            : 'light'}
        </span>
      </button>
      <button
        className='flex flex-col items-center group'
        onClick={save}
      >
        <span className='flex gap-1 items-center text-[8px] leading-none'>
          {os === OperatingSystem.macOS
            ? <span className='text-xs'>&#8984;</span>
            : <span>CTRL</span>}
          <span>S</span>
        </span>
        <span className='rounded-lg border px-1 border-gray-300 dark:border-gray-700 group-hover:bg-gray-300 dark:group-hover:bg-gray-600 transition'>
          save
        </span>
      </button>
    </div>
    <div>
      <span className='flex items-center justify-center'>
        words: {(
          text
            .replace(/[^\w\s]|_/ug, '')
            .replace(/\s+/ug, ' ')
            .toLowerCase()
            .match(/\b[a-z\d]+\b/ug) || []
        ).length}
      </span>
      <span className='flex items-center justify-center'>characters: {text.length} ({new TextEncoder().encode(text).length} bytes)</span>
    </div>
  </span>
}

export default Menu
