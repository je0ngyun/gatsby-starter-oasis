const pathToFolderName = (path) => {
  return path.slice(1).split('/')[0]
}

export { pathToFolderName }
