function getShortMessages(messages) {
    // SOLUTION GOES HERE
    return messages.filter(i=>{
        return i.message.length<50
    })
    .map(i=>i.message)
  }

  module.exports = getShortMessages