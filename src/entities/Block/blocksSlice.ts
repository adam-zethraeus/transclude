import { createSlice, PayloadAction, createSelector, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type BlockId = string;
export type BlockRecord = {
    id: BlockId
    content: BlockContent
    subBlockIds: BlockId[]
}
export type BlockContent = string;
export type Blocks = { allIds: BlockId[], byId: Record<string, BlockRecord> };


export function searchBlockRecords(state: RootState, from: BlockId, filter: (record: BlockRecord) => boolean, path: BlockId[] = []): BlockId | null {
    let blockRecord = state.blocks.byId[from];
    if (filter(blockRecord)) {
        return from;
    }
    if (path.includes(from)) {
        return null;
    }
    let newPath = path.concat([from]);
    for (let id of blockRecord.subBlockIds) {
        if (state.blocks.byId[id] !== null) {
            let foundRecord = searchBlockRecords(state, id, filter, newPath);
            if (foundRecord !== null) {
                return foundRecord;
            }
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
                        content: ""
                    } as BlockRecord
                }
            },
        }
    },
});

export const { addBlock } = blocksSlice.actions;

const getBlockRecord = (state: RootState, props: { id: string }) => state.blocks.byId[props.id];

export const makeGetBlockRecord = () => createSelector(getBlockRecord, x => x)

export default blocksSlice.reducer;
