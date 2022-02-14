import { useLocation } from '@reach/router'

const useTopLevelPathName = () => {
  const pathNames = useLocation()
    .pathname.split('/')
    .filter((p) => p)
  return pathNames.length ? pathNames[0] : ''
}

export { useTopLevelPathName }
