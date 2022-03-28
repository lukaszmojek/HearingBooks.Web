export interface MenuItem {
  name: string
  routerLink: string
  shouldBeAvailable: () => boolean
}