<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Nome: </label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="student.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="email">E-mail: </label>
        <input
          class="form-control"
          id="email"
          required
          v-model="student.email"
          name="email"
        />
      </div>

      <div class="form-group">
        <label for="phone">Telefone: </label>
        <input
          class="form-control"
          id="phone"
          required
          v-model="student.phone"
          name="phone"
        />
      </div>

      <button @click="saveStudent" class="btn btn-success">CADASTRAR</button>
    </div>

    <div v-else>
      <h4>Cadastro Efetuado com sucesso!</h4>
      <button class="btn btn-success" @click="newStudent">Cadastrar Novo</button>
    </div>
  </div>
</template>

<script>
import StudentDataService from "@/services/StudentDataService";

export default {
  name: "add-student",
  data() {
    return {
      student: {
        id: null,
        name: "",
        email: "",
        phone: ""
      },
      submitted: false
    };
  },
  methods: {
    saveStudent() {
      var data = {
        name: this.student.name,
        email: this.student.email,
        phone: this.student.phone,
      };

      StudentDataService.create(data)
        .then(response => {
          this.student.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newStudent() {
      this.submitted = false;
      this.student = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
