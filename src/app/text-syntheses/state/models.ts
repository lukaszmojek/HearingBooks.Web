export interface ITextSynthesis {
  id: string
  requestingUserId: string
  title: string
  status: TextSynthesisStatus
  synthesisText: string
  blobName: string
  // characterCount: number
  priceInUsd: number
  // requestedOn: Date
  // synthesisLength: string
  // synthesisFileUrl: string
  language: string
  voice: string
}

export interface ITextSynthesisRequest {
  title: string
  textToSynthesize: string
  language: string
  voice: string
}

export enum TextSynthesisStatus {
  Submitted = 0,
  Pending = 1,
  Processing = 2,
  Completed = 3,
  Cancelled = 4
}