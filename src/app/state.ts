export default {
  data: {
    blocks: {
      byId: {
        "bId1": {
          id: "bId1",
          content: "block one.",
          subBlockIds: ["bId2", "bId3"],
          creationTime: 0,
          lastModificationTime: 0,
        },
        "bId2": {
          id: "bId2",
          content: "block two.",
          subBlockIds: [],
          creationTime: 0,
          lastModificationTime: 0,
        },
        "bId3": {
          id: "bId3",
          content: "[block three](/page/pId1/bId3).",
          subBlockIds: ["bId4"],
          creationTime: 0,
          lastModificationTime: 0,
        },
        "bId4": {
          id: "bId4",
          content: "## block four.\n[block four](/page/pId1/bId4). `block four`. **block four**. _block four_. \n\n1. block four.\n2. block four. \n 3. block four",
          subBlockIds: [],
          creationTime: 0,
          lastModificationTime: 0,
        },
        "bId5": {
          id: "bId5",
          content: "block five",
          subBlockIds: [],
          creationTime: 0,
          lastModificationTime: 0,
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
  },
  view:  {
    mode: "BROWSE",
  }
}
