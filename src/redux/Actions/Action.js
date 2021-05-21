export const viewData = (data) => {
  return {
    type: "VIEW",
    payload: {
      data,
    },
  };
};

export const addNew = (data) => {
  return {
    type: "ADD_NEW",
    payload: { data },
  };
};

export const updateData = (data) => {
  return {
    type: "UPDATE",
    payload: { data },
  };
};

export const deleteData = (data) => {
  return {
    type: "DELETE",
    payload: { data },
  };
};
