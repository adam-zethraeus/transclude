import { createSlice, PayloadAction, createSelector, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { assert } from '../../utils'

export type BlockId = string;
export type BlockRecord = {
    id: BlockId
    content: BlockContent
    subBlockIds: BlockId[]
}
export type BlockContent = string;
export type Blocks = { allIds: BlockId[], byId: Record<string, BlockRecord> };


export function findPathToBlock(state: RootState, curr: BlockId, to: BlockId, path: BlockId[] = []): BlockId[] | null {
    if (path.includes(curr)) {
        return null;
    }
    let currPath = path.concat([curr]);
    if (curr === to) {
        return currPath;
    }
    let currRecord = state.blocks.byId[curr];
    assert(!!currRecord, `Invalid block: ${curr} linked via: ${path}`)

    for (let id of currRecord.subBlockIds) {
        let nextPath = findPathToBlock(state, id, to, currPath);
        if (nextPath !== null) {
            return nextPath;
        }
    } 
    return null;
} 

const initialState: Blocks = {
    byId: {},
    allIds: []
}

export const blocksSlice = createSlice({
    name: 'blocks',
    initialState,
    reducers: {
        updateBlock: {
            reducer: (state, action: PayloadAction<BlockRecord>) => {
                if (!!state.byId[action.payload.id]) {
                    state.byId[action.payload.id].content = action.payload.content
                }
            },
            prepare: (blockId: BlockId, value: string) => {
                return {
                    payload: {
                        id: blockId,
                        content: value
                    } as BlockRecord
                }
            }
        },
        addBlock: {
            reducer: (state, action: PayloadAction<BlockRecord>) => {
                let newBlock = action.payload;
                if (!state.byId[newBlock.id]) {
                    state.byId[newBlock.id] = newBlock;
                    state.allIds.push(newBlock.id);
                }
            },
            prepare: () => {
                return {
                    payload: {
                        id: nanoid(),
                        content: ''
                    } as BlockRecord
                }
            },
        }
    }
});

export const { addBlock, updateBlock } = blocksSlice.actions;

const getBlockRecord = (state: RootState, id: string) => state.blocks.byId[id];

export const makeGetBlockRecord = () => createSelector(getBlockRecord, x => x)

export default blocksSlice.reducer;
