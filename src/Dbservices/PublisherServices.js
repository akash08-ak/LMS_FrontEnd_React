import axios from "axios";

const PublishrURl = "https://lmspublisherapi.azurewebsites.net/api/Publishers/";

export const publisherService = {
  
  getAllpublisher,
  getpublisherById,
  createpublisher,
  updatepublisher,
  deletepublisher,
};



function getAllpublisher() {
  return axios.get(PublishrURl + "GetPublishers/");
}

function getpublisherById(id) {
  return axios.get(PublishrURl + "GetPublisherById/" + id);
}

function createpublisher(AuthorObj) {
  return axios.post(PublishrURl + "CreatePublisher/", AuthorObj);
}

function updatepublisher(AuthorObj) {
  return axios.put(PublishrURl + "UpdatePublisher/", AuthorObj);
}

function deletepublisher(id) {
  return axios.delete(PublishrURl + "DeletePublisher/"+ id);
}

export default publisherService;
