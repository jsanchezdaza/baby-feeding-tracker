export const isMobileDevice = (): boolean => {
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export const isIOSDevice = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

export const preventDoubleTabZoom = (element: HTMLElement): void => {
  let lastTouchEnd = 0
  element.addEventListener('touchend', (event) => {
    const now = new Date().getTime()
    if (now - lastTouchEnd <= 300) {
      event.preventDefault()
    }
    lastTouchEnd = now
  }, false)
}

export const setViewportHeight = (): void => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

export const initMobileOptimizations = (): void => {
  if (isMobileDevice()) {
    setViewportHeight()
    window.addEventListener('resize', setViewportHeight)
    window.addEventListener('orientationchange', () => {
      setTimeout(setViewportHeight, 500)
    })
    preventDoubleTabZoom(document.body)
    document.body.classList.add('mobile-device')
    if (isIOSDevice()) {
      document.body.classList.add('ios-device')
    }
  }
}