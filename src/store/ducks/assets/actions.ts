import { action } from 'typesafe-actions'
import { AssetsTypes } from './types'


interface Metadata {
    key: string,
    value: any
  }

interface MetadataObj {
    [key: string]: Metadata
}


export const loadRequest = () => action(AssetsTypes.LOAD_REQUEST)

export const loadSuccess = (data: MetadataObj[]) => action(AssetsTypes.LOAD_SUCCESS, { data })

export const loadFailure = () => action(AssetsTypes.LOAD_FAILURE)