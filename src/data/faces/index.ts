import generateFaceObject from './generateFaceObject'

export type Face = {
  id: string
  defaultImg: string
  lookingDownImg: string
  lookingLeftImg: string
  lookingRightImg: string
  lookingUpImg: string
}

export type FaceDirection =
  | 'default'
  | 'looking-up'
  | 'looking-down'
  | 'looking-right'
  | 'looking-left'

// The color prefix of the faces
const faceColors: string[] = [
  'brown',
  'red',
  'pink',
  'green',
  'blue',
  'orange',
  'violet',
  'yellow',
  'jade',
] as const

export const faces: Face[] = faceColors.map(generateFaceObject)
