export interface INotificationsService {
  showSuccessNotification(message: string): void
  showErrorNotification(message: string): void
  showNotification(message: string): void
}