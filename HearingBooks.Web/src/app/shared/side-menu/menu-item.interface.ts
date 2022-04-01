export interface MenuItem {
  translationKey: string
  routerLink: string
  shouldBeAvailable: () => boolean
}
