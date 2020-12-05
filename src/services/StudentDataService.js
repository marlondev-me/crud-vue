import api from "./api";

class StudentDataService {
  getAll() {
    return api.get("/students");
  }

  get(id) {
    return api.get(`/students/${id}`);
  }

  create(data) {
    return api.post("/students", data);
  }

  update(id, data) {
    return api.put(`/students/${id}`, data);
  }

  delete(id) {
    return api.delete(`/students/${id}`);
  }
}

export default new StudentDataService();