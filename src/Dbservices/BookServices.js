import axios from "axios";

const BookURl = "https://lmsbookapi.azurewebsites.net//api/Books/";


export const BookService = {
  
  getAllBook,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
 
};


function getAllBook() {
  return axios.get(BookURl + "GetBooks/");
}

function getBookById(id) {
  return axios.get(BookURl   + "GetBookById/"+ id);
}

function createBook(AuthorObj) {
  return axios.post(BookURl  + "CreateBook/", AuthorObj);
}

function updateBook(AuthorObj) {
  return axios.put(BookURl  + "UpdateBook/", AuthorObj);
}

function deleteBook(id) {
  return axios.delete(BookURl  + "DeleteBook/" + id);
}

export default BookService;
