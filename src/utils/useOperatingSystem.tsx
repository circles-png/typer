export enum OperatingSystem {
    Windows, macOS, Unix, Linux, Unknown
}

const useOperatingSystem = () => {
  let operatingSystem = OperatingSystem.Unknown
  if (window.navigator.userAgent.indexOf('Win') !== -1)
    operatingSystem = OperatingSystem.Windows
  if (window.navigator.userAgent.indexOf('Mac') !== -1)
    operatingSystem = OperatingSystem.macOS
  if (window.navigator.userAgent.indexOf('X11') !== -1)
    operatingSystem = OperatingSystem.Unix
  if (window.navigator.userAgent.indexOf('Linux') !== -1)
    operatingSystem = OperatingSystem.Linux

  return operatingSystem
}

export default useOperatingSystem
