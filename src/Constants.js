export const defaultLocalData = {
  users: {},
  boards: [],
};

export const sampleItems = {
  title: "Sample Title",
  description: "Sample Description",
  stage: "",
  assignee: [],
  createdAt: "04-04-2004",
  updatedAt: "07-10-2003",
  creator: "Admin",
  priority: 1,
}

export const sampleStages = [
    {
      label: "Stage1",
      items: [sampleItems , sampleItems , sampleItems],
      total: 3,
    },
    {
      label: "Stage2",
      items: [sampleItems , sampleItems],
      total: 2,
    },
]


