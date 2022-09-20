import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { TabState, TabDispatch } from '../_store/HangulMakerStore'

export const useTabDispatch: () => TabDispatch = useDispatch;
export const useTabSelector: TypedUseSelectorHook<TabState> = useSelector;