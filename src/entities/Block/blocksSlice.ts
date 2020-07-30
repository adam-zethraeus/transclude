import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type BlockId = string;
export type BlockRecord = {
    id: BlockId
    content: LeafBlockContent | BranchBlockContent
}
export type Blocks = { allIds: BlockId[], byId: Record<string, BlockRecord> };
export type LeafBlockContent = string
export type BranchBlockContent = BlockId[]
export function isLeafBlockContent(content: LeafBlockContent | BranchBlockContent): content is LeafBlockContent {
    return typeof(content) == "string";
}


const initialState: Blocks = {
    byId: {
        "?": {
            id: "?",
            content: "empty"
        }
    },
    allIds: ["?"]
}

export const blocksSlice = createSlice({
    name: 'blocks',
    initialState,
    reducers: {
        addBlock: (state, action: PayloadAction<BlockRecord>) => {
            let newBlock = action.payload;
            if (!state.byId[newBlock.id]) {
                state.byId[newBlock.id] = newBlock;
                state.allIds.push(newBlock.id);
            }
        }
    },
});

export const { addBlock } = blocksSlice.actions;

// FIXME: use nested reducers instead here.
export const makeBlockRecordSelector = (id: BlockId) => {
    return (state: RootState) => { 
        return state.blocks.byId[id];
    };
}

export default blocksSlice.reducer;
