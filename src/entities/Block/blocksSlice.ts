import { createSlice, PayloadAction, createSelector, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type BlockId = string;
export type BlockRecord = {
    id: BlockId
    content: BlockContent
}
export type BlockContent =  LeafBlockContent | BranchBlockContent;
export type Blocks = { allIds: BlockId[], byId: Record<string, BlockRecord> };
export type LeafBlockContent = string
export type BranchBlockContent = BlockId[]
export function isLeafBlockContent(content: BlockContent): content is LeafBlockContent {
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

const getBlock = (state: RootState, props: { id: string }) => state.blocks.byId[props.id];

export const makeGetBlock = () => createSelector(getBlock, x => x)

export default blocksSlice.reducer;
