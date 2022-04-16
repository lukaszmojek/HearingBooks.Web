export interface ITextSynthesis {
  title: string
  content: string
  characterCount: number
  price: string
  requestedOn: Date
  synthesisLength: string
  synthesisFileUrl: string
}

export interface ITextSynthesisRequest {
  title: string
  textToSynthesize: string
  language: string
  voice: string
  requestingUserId: string
}