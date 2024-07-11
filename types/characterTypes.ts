export interface CharacterType {
  id: string
  name: string
  alternate_names: string[]
  species: string
  gender: string
  house: string
  dateOfBirth: string | null
  yearOfBirth: number | null
  wizard: boolean
  ancestry: string
  eyeColour?: string // 선택적(optional) 속성
  hairColour: string
  wand: {
    wood: string
    core: string
    length: number | null
  }
  patronus: string
  hogwartsStudent: boolean
  hogwartsStaff: boolean
  actor: string
  alternate_actors: string[]
  alive: boolean
  image: string
}
