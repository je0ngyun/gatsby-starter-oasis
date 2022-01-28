const inquirer = require('inquirer')
const fs = require('fs-extra')

const colorIt = (str, code) => {
  return `\x1b[${code}m${str}\x1b[0m`
}

console.log('┌------------------------┐')
console.log('|  ' + colorIt('gatsby-starter-oasis', 32) + '  |')
console.log('└------------------------┘\n')

const pageNameQa = [
  {
    type: 'input',
    name: 'pageName',
    message: 'Please enter the page name you want to create >> ',
    validate(value) {
      const pass = value.match(/^[a-z]+$/g)
      return !!pass || `Please enter a valid page name`
    },
    filter(val) {
      return val.toLowerCase()
    },
  },
  {
    type: 'input',
    name: 'pageDescription',
    message: 'Please enter the page description you want to create >> ',
  },
]

const getConfirmQa = (pageName, pageDescription) => {
  return [
    {
      type: 'rawlist',
      name: 'confirm',
      message:
        'Is the name of the page you re going to create right?' +
        '\n\n> page-name : ' +
        colorIt(`${pageName}`, 32) +
        '\n> page-description : ' +
        colorIt(`${pageDescription}`, 32) +
        '\n',
      choices: ['Yes', 'No'],
    },
  ]
}

const getAnswer = async function (qa) {
  try {
    const answer = await inquirer.prompt(qa).then((answer) => answer)
    return answer
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

const isExistDirectory = async function (...paths) {
  try {
    const exists =
      (await fs.pathExists(paths[0])) || (await fs.pathExists(paths[1]))
    return exists
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

const makeDirectory = function (...paths) {
  try {
    paths.forEach(async (path) => {
      await fs.ensureDir(path)
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

const makeFile = function (...paths) {
  try {
    paths.forEach(async (path) => {
      await fs.ensureFile(path + '/index.js')
      await fs.ensureFile(path + '/index.scss')
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

const getTemplateFiles = async function (
  pageName,
  pageDescription,
  templateDirPath
) {
  try {
    const indexJs = await fs
      .readFile(templateDirPath + '/template.js', 'utf8')
      .then((file) => file.replace(/PN#####/g, pageName))
      .then((file) => file.replace(/DS#####/g, pageDescription))

    const indexScss = await fs.readFile(
      templateDirPath + '/template.scss',
      'utf8'
    )
    return { indexJs: indexJs, indexScss: indexScss }
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

const outFile = function (jsFile, ScssFile, ...paths) {
  try {
    paths.forEach(async (path) => {
      await fs.outputFile(path + '/index.js', jsFile)
      await fs.outputFile(path + '/index.scss', ScssFile)
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

;(async () => {
  const { pageName, pageDescription } = await getAnswer(pageNameQa)
  const { confirm } = await getAnswer(getConfirmQa(pageName, pageDescription))

  if (confirm === 'No') {
    console.log('\nExit...\n')
    process.exit(1)
  }

  const pagePath = `./src/pages/${pageName}`
  const postPath = `./posts/${pageName}`
  const templateFilePath = `./page-gen-template`

  if (await isExistDirectory(pagePath, postPath)) {
    console.log('\n>', colorIt('The directory already exists.', 33))
    console.log(
      '> Please check the inside of ' +
        colorIt('./posts/ and ./src/page/\n', 35)
    )
    process.exit(1)
  }

  makeDirectory(pagePath, postPath)
  makeFile(pagePath)

  const { indexJs, indexScss } = await getTemplateFiles(
    pageName,
    pageDescription,
    templateFilePath
  )

  outFile(indexJs, indexScss, pagePath)

  console.log('\n> Page-related files and folders were successfully created.')
  console.log('> ' + colorIt(`./src/pages/${pageName}/index.js`, 32))
  console.log('> ' + colorIt(`./src/pages/${pageName}/index.scss`, 32))
  console.log('> ' + colorIt(`./posts/${pageName}/\n`, 32))
  console.log(
    '> Please complete the configuration in the user-meta-config file'
  )
  console.log('> ' + colorIt(`./user-meta-config.js\n`, 36))
})()
