import axios from "axios";

const IBookURL = "https://localhost:44334/api/IssueBooks/";


export const IbookService = {
  
  getAllIBook,
  getIBookById,
  createIBook,
  updateIBook,
  deleteIBook,
};


function getAllIBook() {
  return axios.get(IBookURL +"GetIssueBooks/");
}

function getIBookById(id) {
  return axios.get(IBookURL +"GetIssueBookById/" + id);
}

function createIBook(AuthorObj) {
  return axios.post(IBookURL +"CreateIssueBook/", AuthorObj);
}

function updateIBook(AuthorObj) {
  return axios.put(IBookURL +"UpdateIssueBook/", AuthorObj);
}

function deleteIBook(id) {
  return axios.delete(IBookURL +"DeleteIssueBook/" + id);
}

export default IbookService;
