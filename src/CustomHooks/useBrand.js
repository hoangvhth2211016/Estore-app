import React from 'react'
import { useContext } from 'react'
import { BrandContext } from '../ContextProvider/Context'

export default function useBrand() {
    return useContext(BrandContext);
}
