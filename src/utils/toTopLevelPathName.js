const toTopLevelPathName = (path) => {
  const pathNames = path.split('/').filter((p) => p)
  return pathNames.length ? pathNames[0] : ''
}

export { toTopLevelPathName }
