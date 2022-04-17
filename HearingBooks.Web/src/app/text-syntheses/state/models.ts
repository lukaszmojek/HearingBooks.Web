export interface ITextSynthesis {
  id: string
  title: string
  synthesisText: string
  characterCount: number
  price: string
  requestedOn: Date
  synthesisLength: string
  synthesisFileUrl: string
  language: string
  voice: string
}

export interface ITextSynthesisRequest {
  title: string
  textToSynthesize: string
  language: string
  voice: string
  requestingUserId: string
}