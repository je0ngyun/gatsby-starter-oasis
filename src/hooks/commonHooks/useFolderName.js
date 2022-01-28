import { useLocation } from '@reach/router'

const useFolderName = () => {
  return useLocation().pathname.slice(1).split('/')[0]
}

export { useFolderName }
