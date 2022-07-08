export interface IDialogueSynthesis {
  id: string
  requestingUserId: string
  status: string
  title: string
  dialogueText: string
  blobContainerName: string
  blobName: string
  language: string
  firstSpeakerVoice: string
  secondSpeakerVoice: string
  priceInUsd: number
}

export interface IDialogueSynthesisRequest {
  title: string
  dialogueText: string
  language: string
  firstSpeakerVoice: string
  secondSpeakerVoice: string
}