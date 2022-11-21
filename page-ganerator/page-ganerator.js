const inquirer = require('inquirer')
const fs = require('fs-extra')

console.log(`\n 
 ██████╗  █████╗ ███████╗██╗███████╗    
██╔═══██╗██╔══██╗██╔════╝██║██╔════╝    
██║   ██║███████║███████╗██║███████╗    
██║   ██║██╔══██║╚════██║██║╚════██║    
╚██████╔╝██║  ██║███████║██║███████║    
 ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝╚══════╝
 \n`)

const colorApply = (str, code) => {
  return `\x1b[${code}m${str}\x1b[0m`
}

const color = {
  blue(str) {
    return colorApply(str, 36)
  },
  green(str) {
    return colorApply(str, 32)
  },
  yellow(str) {
    return colorApply(str, 33)
  },
  pink(str) {
    return colorApply(str, 35)
  },
}

const exit = (msg = 'Exit...') => {
  console.log('\n')
  console.log(color.pink(msg))
  console.log('\n')
  process.exit(1)
}

const pageInfoQuestion = [
  {
    type: 'input',
    name: 'pageName',
    message: 'Please enter the page name you want to create.\n>>',
    validate(input) {
      const pass = input.match(/^[a-z]+$/g)
      return (
        !!pass ||
        `Please enter a valid page name\n   Page names must consist of letters only`
      )
    },
    filter(input) {
      return input.toLowerCase()
    },
  },
  {
    type: 'input',
    name: 'pageDescription',
    message: 'Please enter the page description you want to create.\n>>',
  },
]

const getReconfirmationQuestion = (pageName, pageDescription) => {
  return [
    {
      type: 'rawlist',
      name: 'confirm',
      message:
        'Is the name of the page you re going to create right?\n' +
        '>> Page-name : ' +
        color.green(`${pageName}\n`) +
        '>> Page-description : ' +
        color.green(`${pageDescription}`),
      choices: ['Yes', 'No'],
    },
  ]
}

const getAnswer = async function (question) {
  try {
    const answer = await inquirer.prompt(question)
    return answer
  } catch (err) {
    exit(err)
  }
}

const isExistDirectory = async function (...paths) {
  try {
    const isExist = (
      await Promise.all(paths.map((path) => fs.pathExists(path)))
    ).some((isExist) => isExist === true)
    return isExist
  } catch (err) {
    exit(err)
  }
}

const makeDirectory = function (...paths) {
  try {
    paths.forEach(async (path) => {
      await fs.ensureDir(path)
    })
  } catch (err) {
    exit(err)
  }
}

const makeFile = function (...paths) {
  try {
    paths.forEach(async (path) => {
      await fs.ensureFile(path + '/index.js')
      await fs.ensureFile(path + '/index.scss')
    })
  } catch (err) {
    exit(err)
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
    return { indexJs, indexScss }
  } catch (err) {
    exit(err)
  }
}

const outFile = function (jsFile, sassFile, ...paths) {
  try {
    paths.forEach(async (path) => {
      await fs.outputFile(path + '/index.js', jsFile)
      await fs.outputFile(path + '/index.scss', sassFile)
    })
  } catch (err) {
    exit(err)
  }
}

const run = async () => {
  const { pageName, pageDescription } = await getAnswer(pageInfoQuestion)
  const { confirm } = await getAnswer(
    getReconfirmationQuestion(pageName, pageDescription)
  )

  if (confirm === 'No') {
    exit()
  }

  const pagePath = `./src/pages/${pageName}`
  const postPath = `./posts/${pageName}`
  const templateFilePath = `./page-ganerator/template/`

  if (await isExistDirectory(pagePath, postPath)) {
    console.log('\n')
    console.log(color.yellow('The directory already exists.'))
    console.log(
      `${color.yellow('Please check the inside of')} ${color.pink(
        './posts/ and ./src/page/'
      )}`
    )
    exit()
  }

  const { indexJs, indexScss } = await getTemplateFiles(
    pageName,
    pageDescription,
    templateFilePath
  )
  makeDirectory(pagePath, postPath)
  makeFile(pagePath)
  outFile(indexJs, indexScss, pagePath)

  console.log('\n')
  console.log('Page-related files and folders were successfully created.')
  console.log(`> ${color.green(`./src/pages/${pageName}/index.js`)}`)
  console.log(`> ${color.green(`./src/pages/${pageName}/index.scss`)}`)
  console.log(`> ${color.green(`./posts/${pageName}/\n`)}`)
  console.log(
    `> Please complete the configuration in the user-meta-config file`
  )
  console.log(`> ${color.blue(`./user-meta-config.js\n`)}`)
}

run()
