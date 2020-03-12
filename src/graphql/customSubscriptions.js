export const onCreateOrUpdateOrDelete = /* GraphQL */ `
  subscription OnCreateOrUpdateOrDelete {
    addedPost {
      id
      date
      data
    }
    editedPost {
      id
      date
      data
    }
    deletePost {
      id
      date
      data
    }
  }
`;
