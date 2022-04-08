export interface ISynthesisLanguage {
  symbol: string
  name: string
}

export interface ISynthesisVoice {
  name: string
  gender: SynthesisVoiceGender
}

export enum SynthesisVoiceGender {
  Man = 'Man',
  Woman = 'Woman'
}