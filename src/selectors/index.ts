import { createSelector } from '@reduxjs/toolkit'
import { BlockId, BlocksStoreDataType, PageRecord, PagesStoreDataType, RootState } from '../types';

export const getPageRecord = (state: PagesStoreDataType, id: string): PageRecord => state.byId[id];
export const getPageBlocks = (state: PagesStoreDataType, id: string): BlockId[] => getPageRecord(state, id).blockIds;
export const getBlockRecord = (state: RootState, id: BlockId) => state.data.blocks.byId[id];
export const getSubBlocks = (state: BlocksStoreDataType, id: BlockId): BlockId[] => state.byId[id]?.subBlockIds;
export const getBlocksStore = createSelector((state: RootState) => state.data.blocks, x => x);

export const makeGetBlockRecord = () => createSelector(getBlockRecord, x => x)
