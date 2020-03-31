const [deleteDepartement] = useMutation(DELETE_DEPARTEMENT);

const handleDelete = e => {
  deleteDepartement({ variables: { _id: e, } });
  setTimeout(() => {
    handleSucces();
  }, 700);
}