import { faces } from '../../src/data/faces'

// Get all the face nodes(img)
const facePhotos = document.querySelectorAll('.faceCard img')

let columnNumber = 3

/**
 * Dynamically updates the column number based on the screen size
 */
function handleScreenResize() {
  if (window.matchMedia('(max-width: 524px)').matches) {
    columnNumber = window.matchMedia('(max-width: 330px)').matches ? 1 : 2
  } else {
    columnNumber = 3
  }
}

// Add an event listener to the window to make the hover effect responsive
// Call the handeScreenResize function on load to determine the accurate column number
handleScreenResize()
window.addEventListener('resize', handleScreenResize)

/**
 * Calculates the indexes of adjacent faces for a given face index.
 *
 * @param {number} index - The index of the current face in the `faces` array.
 * @returns {Object} An object containing the indexes of the adjacent faces:
 * - `upIndex`: The index of the face above the current one, or null if there is no face above.
 * - `downIndex`: The index of the face below the current one, or null if there is no face below.
 * - `leftIndex`: The index of the face to the left of the current one, or null if there is no face to the left.
 * - `rightIndex`: The index of the face to the right of the current one, or null if there is no face to the right.
 */
function getAdjacentIndexes(index) {
  const upIndex = index - columnNumber >= 0 ? index - columnNumber : null
  const downIndex =
    index + columnNumber < faces.length ? index + columnNumber : null
  const leftIndex = index % columnNumber !== 0 ? index - 1 : null
  const rightIndex = (index + 1) % columnNumber !== 0 ? index + 1 : null

  return { upIndex, downIndex, leftIndex, rightIndex }
}

/**
 * Handles the hover event on a face, updating the neighboring face images
 * based on their respective directions.
 *
 * @param {Event} e - The event object, triggered when the user hovers over a face image.
 */
function handleFaceHover(e) {
  const hovereFaceId = e.target.id

  // Find the index of the hovered face in the 'faces' array
  // If the hovered face index is invalid (not found), exit the function
  const hoveredFaceIndex = faces.findIndex((face) => face.id === hovereFaceId)
  if (hoveredFaceIndex === -1) return

  // Get the indexes of adjacent faces
  const { upIndex, downIndex, leftIndex, rightIndex } =
    getAdjacentIndexes(hoveredFaceIndex)

  const neighbors = [
    { index: upIndex, direction: 'lookingDownImg' },
    { index: downIndex, direction: 'lookingUpImg' },
    { index: leftIndex, direction: 'lookingRightImg' },
    { index: rightIndex, direction: 'lookingLeftImg' },
  ]

  /// Update the images of neighboring faces based on the direction
  neighbors.forEach(({ index, direction }) => {
    // If the neighbor exists (not null), update its image source
    if (index !== null) {
      document.getElementById(faces[index].id).src = faces[index][direction]
    }
  })
}

/**
 * Resets all face images to their default source/state.
 */
function resetPhotos() {
  // Iterate through each face photo and reset to the default image
  facePhotos.forEach((facePhoto, index) => {
    facePhoto.src = faces[index].defaultImg
  })
}

// Add event listeners to the face images
facePhotos.forEach((facePhoto) => {
  // Makes the neighbouring faces look towards the target when hovered
  facePhoto.addEventListener('mouseenter', handleFaceHover)
  // Resets all faces to their default image once the mouse exits the face
  facePhoto.addEventListener('mouseleave', resetPhotos) // There's probably a better way to do this
})
