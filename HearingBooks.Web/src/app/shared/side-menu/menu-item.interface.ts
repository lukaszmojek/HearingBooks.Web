export interface MenuItem {
  translationKey: string
  routerLink: string | any[]
  shouldBeAvailable: () => boolean
}
