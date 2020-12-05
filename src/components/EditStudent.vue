<template>
  <div v-if="currentStudent" class="edit-form">
    <h4>Aluno</h4>
    <form>
      <div class="form-group">
        <label for="name">Nome</label>
        <input type="text" class="form-control" id="name"
          v-model="currentStudent.name"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" class="form-control" id="email"
          v-model="currentStudent.email"
        />
      </div>

      <div class="form-group">
        <label for="phone">Telefone</label>
        <input type="text" class="form-control" id="phone"
          v-model="currentStudent.phone"
        />
      </div>
    </form>

    <button class="badge badge-danger mr-2"
      @click="deleteStudent"
    >
      Excluir
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateStudent"
    >
      Atualizar
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Clique em um aluno...</p>
  </div>
</template>

<script>
import StudentDataService from "@/services/StudentDataService";

export default {
  name: "student",
  data() {
    return {
      currentStudent: null,
      message: ''
    };
  },
  methods: {
    getStudent(id) {
      console.log('to aqui')
      StudentDataService.get(id)
        .then(response => {
          this.currentStudent = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentStudent.id,
        name: this.currentStudent.name,
        email: this.currentStudent.email,
        published: status
      };

      StudentDataService.update(this.currentStudent.id, data)
        .then(response => {
          this.currentStudent.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateStudent() {
      StudentDataService.update(this.currentStudent.id, this.currentStudent)
        .then(response => {
          console.log(response.data);
          this.message = 'O aluno foi atualizado com sucesso!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteStudent() {
      StudentDataService.delete(this.currentStudent.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "students" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getStudent(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
