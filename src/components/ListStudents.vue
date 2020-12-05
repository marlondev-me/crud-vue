<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Lista de Alunos</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(student, index) in students"
          :key="index"
          @click="setActiveStudent(student, index)"
        >
          {{ student.name }}
        </li>
      </ul>

    </div>
    <div class="col-md-6">
      <div v-if="currentStudent">
        <h4>Aluno</h4>
        <div>
          <label><strong>Nome: </strong></label> {{ currentStudent.name }}
        </div>
        <div>
          <label><strong>E-mail: </strong></label> {{ currentStudent.email }}
        </div>
        <div>
          <label><strong>Telefone: </strong></label> {{ currentStudent.phone}}
        </div>

        <router-link :to="'/students/' + currentStudent.id" class="badge badge-warning">EDITAR</router-link>
      </div>
      <div v-else>
        <br />
        <p>Clique em um nome...</p>
      </div>
    </div>
  </div>
</template>

<script>
import StudentDataService from "@/services/StudentDataService";

export default {
  name: "students-list",
  data() {
    return {
      students: [],
      currentStudent: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveStudents() {
      StudentDataService.getAll()
        .then(response => {
          this.students = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveStudents();
      this.currentStudent = null;
      this.currentIndex = -1;
    },

    setActiveStudent(student, index) {
      this.currentStudent = student;
      this.currentIndex = index;
    }
  },
  mounted() {
    this.retrieveStudents();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
