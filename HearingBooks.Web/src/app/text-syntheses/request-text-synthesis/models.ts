export interface ISynthesisLanguage {
  symbol: string
  name: string
}

export interface ISynthesisVoice {
  name: string
  displayName: string
  type: SynthesisVoiceType
  isMultilingual: boolean
}

export enum SynthesisVoiceType {
  Male,
  Female,
  Kid
}