import axios from "axios";

const MemberURl = "https://localhost:44328/api/Members/";

export const memberService = {
 
  getAllMember,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
  
};


function getAllMember() {
  return axios.get(MemberURl +"GetMembers/");
}

function getMemberById(id) {
  return axios.get(MemberURl +"GetMemberById/" + id);
}

function createMember(AuthorObj) {
  return axios.post(MemberURl +"CreateMember/", AuthorObj);
}

function updateMember(AuthorObj) {
  return axios.put(MemberURl +"UpdateMember/", AuthorObj);
}

function deleteMember(id) {
  return axios.delete(MemberURl +"DeleteMember/" + id);
}

export default memberService;
