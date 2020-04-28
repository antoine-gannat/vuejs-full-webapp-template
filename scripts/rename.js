const fs = require('fs')

// list of element to avoid
const blacklist = ['node_modules', 'client-dist', 'server-dist', 'rename.js', '.git', 'favicon.ico']

function processFiles(newName){
  // replace the template project name by the new one
  function replaceInFile(file){
    console.log("Renaming occurences in file", file)
    // read the file
    let fileAsString = fs.readFileSync(file, 'utf8')
    // replace 'template-webapp' by the new name
    fileAsString = fileAsString.replace(/template-webapp/g, newName)
    // replace 'template_webapp' by the new name
    // this is mainly used for environment variables, so capitalize the value and replace '-' by '_'
    fileAsString = fileAsString.replace(/template_webapp/g, newName.replace(/-/g,'_').toUpperCase())
    // write back to the file
    fs.writeFileSync(file, fileAsString)
  }

  // list of directory to analyse
  // start with the current directory
  let directories = ['.']
  // while there is directories to analyse
  while (directories.length > 0){
    // list every element in the current directory
    let elements = fs.readdirSync(directories[0]);
    // for each element
    elements.forEach((el) => {
      // don't check the element if it's blacklisted
      if (blacklist.includes(el)){
        return
      }
      // get the full path of the element
      const fullPath = directories[0] + '/' + el
      // use stat to get informations about this element
      let elInfo = fs.statSync(fullPath)
      // if this is a directory
      if (elInfo.isDirectory()){
        // add it to the list for analysis
        directories.push(fullPath)
      }else if (elInfo.isFile()){
        // else if it's a file, open it and replace the searched string by what we need
        replaceInFile(fullPath)
      }
    })
    // remove the folder we just analyzed
    directories.shift()
  }
}

// check if the arguments are correct
if (process.argv.length != 3){
  console.log("Usage: npm run rename 'new-name'")
  process.exit(0)
}
// get the new name from the arguements
let newName = process.argv[2]

console.log("Renaming project to:", newName)
// find every file and rename the project where its possible
processFiles(newName)