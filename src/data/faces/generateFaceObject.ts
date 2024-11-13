import type { Face, FaceDirection } from '.'

/**
 * Generates a Face object with image paths for the specified face color.
 * @param faceColor - The color of the face.
 * @returns A Face object with unique ID and image paths for each direction.
 */
export default function generateFaceObject(faceColor: string): Face {
  const basePath = '/images/faces/'

  const generateImgPath = (direction: FaceDirection) =>
    `${basePath}${faceColor}-${direction}.png`

  return {
    id: `${faceColor}Face`,
    defaultImg: generateImgPath('default'),
    lookingDownImg: generateImgPath('looking-down'),
    lookingLeftImg: generateImgPath('looking-left'),
    lookingRightImg: generateImgPath('looking-right'),
    lookingUpImg: generateImgPath('looking-up'),
  }
}
