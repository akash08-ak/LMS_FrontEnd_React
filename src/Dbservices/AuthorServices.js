import axios from "axios";

const AuthorURl = "https://20.221.33.60/api/Authors/";


export const authorService = {
  getAllAuthor,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  
};

function getAllAuthor() {
  return axios.get(AuthorURl + "GetAuthors/");
}

function getAuthorById(id) {
  return axios.get(AuthorURl + "GetAuthorById/"+ id);
}

function createAuthor(AuthorObj) {
  return axios.post(AuthorURl + "CreateAuthor/" , AuthorObj);
}

function updateAuthor(AuthorObj) {
  return axios.put(AuthorURl + "UpdateAuthor/" , AuthorObj);
}

function deleteAuthor(id) {
  return axios.delete(AuthorURl + "DeleteAuthor/" + id);
}

 
export default authorService;
