import { useLocation } from '@reach/router'

const useTopLvFolderName = () => {
  return useLocation().pathname.slice(1).split('/')[0]
}

export { useTopLvFolderName }
