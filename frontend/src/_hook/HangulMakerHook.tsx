import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { State, Dispatch } from '../_store/store'
import { hangulFirst, hangulMiddle, hangulLast, ConsonantOrder, VowelOrder, FtoL } from '../_store/store'

export const UseDispatchHook: () => Dispatch = useDispatch;
export const UseSelectorHook: TypedUseSelectorHook<State> = useSelector;

// 초성중성종성 리스트
export const firstList:string[] = hangulFirst;
export const middleList:string[] = hangulMiddle;
export const lastList:string[] = hangulLast;

// 자음 모음 순서
export const EnumConsonantOrder = ConsonantOrder;
export const EnumVowelOrder = VowelOrder;
export const EnumFtoL = FtoL;