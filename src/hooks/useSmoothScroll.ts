'use client'

export function useSmoothScroll() {
  const scrollTo = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (!element) return

    window.scrollTo({
      top: element.offsetTop,
      behavior: 'smooth'
    })
  }

  return scrollTo
}