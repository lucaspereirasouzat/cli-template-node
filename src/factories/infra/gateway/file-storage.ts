import { FileStorage } from '@/infra/gateways/file-storage'

export const makeFileStorage = (): FileStorage => {
  return new FileStorage()
}
