export type BlockId = string;
export type BlockRecord = {
  id: BlockId
  content: string
  subBlockIds: BlockId[]
  creationTime: number
  lastModificationTime: number
}

export type BlocksStoreDataType = { allIds: BlockId[], byId: Record<string, BlockRecord> };

export type BlockPath = {
  pageId: PageId
  blockId: BlockId
  intermediateBlockIds: BlockId[]
}

export type PageId = string;
export type PageRecord = {
  id: PageId,
  title: string,
  blockIds: BlockId[] // TODO: rename to subBlockIds, topLevelBlockIds or something that doesn't imply it contains all its decendents.
};
export type PagesStoreDataType = { allIds: PageId[], byId: Record<string, PageRecord> };

export type RootState = {
  data: {
    blocks: BlocksStoreDataType
    pages: PagesStoreDataType
  },
  view: ViewState
};

export enum Mode {
  Browse = "BROWSE",
  Serialize = "SERIALIZE"
}

type ViewMode = {
  mode: Mode
}

export type BrowseView = ViewMode & {
  mode: Mode.Browse
  focusPath?: BlockPath
}

export type SerializeView = ViewMode & {
  mode: Mode.Serialize
}

export type ViewState = ViewMode & (BrowseView | SerializeView);
