export default {
  blocks: {
    byId: {
      "bId1": {
        id: "bId1",
        content: "block one.",
        subBlockIds: ["bId2", "bId3"]
      },
      "bId2": {
        id: "bId2",
        content: "block two.",
        subBlockIds: []
      },
      "bId3": {
        id: "bId3",
        content: "[block three](/page/pId1/bId3).",
        subBlockIds: ["bId4"]
      },
      "bId4": {
        id: "bId4",
        content: "## block four.\n[block four](/page/pId1/bId4). `block four`. **block four**. _block four_. \n\n1. block four.\n2. block four. \n 3. block four",
        subBlockIds: ["bId2"]
      },
      "bId5": {
        id: "bId5",
        content: "block five",
        subBlockIds: []
      },
    },
    allIds: ["bId1", "bId2", "bId3", "bId4", "bId5"],
  },
  pages: {
    byId: {
      "pId1": {
        id: "pId1",
        title: "Page One",
        blockIds: ["bId1", "bId5"],
      }
    },
    allIds: ["pId1"],
  },
  view:  {
    mode: "BROWSE",
    time: 1597007917373
  }
}
