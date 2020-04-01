const notes = [
  {
    title: 'My next trip',
    body: 'I would like to go to Singapore'
  },
  {
    title: 'Favorite Food',
    body: 'Nuts are great, so are carrots with hummis'
  },
  {
    title: 'last note',
    body: 'this is the last note'
  }
]
// 1. the 'findIndex' array method will call the 'finder' function iteratively (e.g. once)
//    for each item in 'notes' array, until such time as 'finder' returns 'true'.              // (A)
// 2. as it does this, 'finder' will have access to the 'current note' under scrutiny via
//    the 'noteItem' parameter, which is passed into 'finder' by 'findIndex' automatically.    // (B)
// 3. if the title attribute of current 'noteItem' matches 'titleToFind' then return
//    true, else return false.                                                                 // (C)
// 4. console.log() statements added to show this more clearly in the output.                  // (D)
const deleteNote = function(notesArray, titleToFind) {
  const finder = function(noteItem, index) {
    // (B)
    console.log(`finder called with index: [${index}] and noteItem: ${JSON.stringify(noteItem)}]`) // (D)

    if (noteItem.title.toLowerCase() === titleToFind.toLowerCase()) {
      // (C)
      return true
    } else {
      return false
    }
  }
  const index = notesArray.findIndex(finder) // (A)
}

console.log(deleteNote(notes, 'last note'))
