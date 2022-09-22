import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { TabState, TabDispatch } from '../_store/HangulMakerStore'
import { hangulFirst, hangulMiddle, hangulLast } from '../_store/HangulMakerStore'

export const useTabDispatch: () => TabDispatch = useDispatch;
export const useTabSelector: TypedUseSelectorHook<TabState> = useSelector;
// 초성중성종성 리스트
export const firstList:string[] = hangulFirst;
export const middleList:string[] = hangulMiddle;
export const lastList:string[] = hangulLast;