<template>
  <b-container fluid>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
      integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
      crossorigin="anonymous"
    />
    <b-col md class="d-flex justify-content-center h-100">
      <b-card class="align-content-center">
        <div class="buttons">
          <b-col class="forkSpoon homeSide" xl="12">
            <router-link to="/" vslot="{ route, navigate}">
              <b-button v-b-tooltip.hover.top="'Home'" class="forkSpoonButton">
                <img alt="Vue forkSpoon" src="../../assets/home.png" />
              </b-button>
            </router-link>
          </b-col>
        </div>
        <b-table
          class="tableOrder"
          striped
          hover
          :items="users"
          :fields="fields"
          :per-page="perPages"
          :current-page="currentPage"
        >
          <template v-slot:cell(actions)="row">
            <b-button
              variant="success"
              size="sm"
              @click="setUser(row.item, row.index, $event.target)"
              class="mr-1"
              v-b-modal.modal-update
              ><i class="fas fa-edit"></i
            ></b-button>
            <b-button
              variant="danger"
              size="sm"
              @click="setDelete(row.item, row.index, $event.target)"
              class="mr-1"
              v-b-modal.modal-delete
              ><i class="far fa-trash-alt"></i
            ></b-button>
          </template>
        </b-table>
        <div class="paginations">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPages"
            size="md"
            class="my-0"
            @change="handlePageChange"
          ></b-pagination>
        </div>
        <b-modal
          id="modal-update"
          class="modalAdd"
          title="Update Item"
          hide-footer
          no-close-on-backdrop
          @close="alertClose()"
        >
          <b-container>
            <b-alert variant="success" v-bind:show="alert">{{ isMsg }}</b-alert>
            <b-alert variant="danger" v-bind:show="alertError">{{
              isMsgError
            }}</b-alert>
            <form class="formAdd">
              <b-form-input
                type="text"
                v-model="form.user_password"
                placeholder="Password"
                required
              ></b-form-input>
              <br />
              <b-form-input
                type="text"
                v-model="form.user_name"
                placeholder="User Name"
                required
              ></b-form-input>
              <br />
              <b-form-select
                v-model="form.user_role"
                size="sm"
                placeholder="User Role"
                required
              >
                <option disabled value>Role</option>
                <option value="1">Administrator</option>
                <option value="2">Cashier</option>
              </b-form-select>
              <b-form-select
                v-model="form.user_status"
                id="inputS"
                size="sm"
                placeholder="User Status"
                required
              >
                <option disabled value>Category Status</option>
                <option value="1">Active</option>
                <option value="0">Non-Active</option>
              </b-form-select>
              <br />
              <b-button :disabled="isDisabled" @click="patchUser()"
                >Update</b-button
              >
            </form>
          </b-container>
        </b-modal>
        <b-modal
          id="modal-delete"
          hide-header
          hide-footer
          no-close-on-backdrop
          no-close-on-esc
        >
          <b-container class="modaldelete">
            <div class="youSure">
              <h3>Are You Sure?</h3>
            </div>
            <br />
            <b-button
              class="buttonCancelDel"
              pill
              variant="danger"
              @click="$bvModal.hide('modal-delete')"
              >Cancel</b-button
            >
            <b-button
              class="buttonYesDel"
              pill
              variant="success"
              @click="delUser(), $bvModal.hide('modal-delete')"
              >Yes</b-button
            >
          </b-container>
        </b-modal>
      </b-card>
    </b-col>
  </b-container>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'User',
  data() {
    return {
      currentPage: 1,
      fields: [
        { key: 'user_id', label: 'Id' },
        { key: 'user_email', label: 'Email' },
        { key: 'user_name', label: 'User Name' },
        { key: 'user_role', label: 'User Role' },
        { key: 'user_status', label: 'User Status' },
        { key: 'actions', label: 'Actions' }
      ],
      form: {
        user_name: '',
        user_password: '',
        user_role: '',
        user_status: ''
      },
      alert: false,
      isMsg: '',
      alertError: false,
      isMsgError: '',
      alerDel: false,
      isMsgDel: ''
    }
  },
  created() {
    this.getAllUser()
  },
  computed: {
    ...mapGetters({
      users: 'getUsers',
      totallRows: 'getRowses',
      perPages: 'getPerPages'
    }),
    isDisabled() {
      return (
        this.form.user_name <= 0 ||
        this.form.user_role <= 0 ||
        this.form.user_status <= 0
      )
    },
    rows() {
      return this.totallRows
    }
  },
  methods: {
    ...mapActions(['getAllUser', 'updateUser', 'deleteUser']),
    ...mapMutations(['setPagess']),
    handlePageChange(event) {
      this.setPagess(event)
      this.getAllUser()
    },
    alertClose() {
      this.alert = false
    },
    setUser(data) {
      this.form = {
        user_name: data.user_name,
        user_role: data.user_role,
        user_status: data.user_status
      }
      this.user_id = data.user_id
    },
    patchUser() {
      const setData = {
        user_id: this.user_id,
        form: this.form
      }
      this.updateUser(setData)
        .then((response) => {
          this.alert = true
          this.isMsg = response.msg
          this.getAllUser()
        })
        .catch((error) => {
          this.alertError = true
          this.isMsgError = error.data.msg
        })
    },
    setDelete(data) {
      this.user_id = data.user_id
    },
    delUser() {
      this.deleteUser(this.user_id)
        .then((response) => {
          this.alertDel = true
          this.isMsgDel = response.msg
          this.getAllUser()
        })
        .catch((error) => {
          this.alertDel = true
          this.isMsgDel = error.data.msg
        })
    }
  }
}
</script>

<style scoped>
.buttonLogSign {
  font-weight: bold;
}

.buttons {
  display: flex;
  flex-direction: column;
}
.card {
  margin-top: auto;
  margin-bottom: auto;
  height: auto;
  text-align: center;
  max-width: 100%;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);
}
.card-body {
  background: whitesmoke;
}
.container-fluid {
  height: 1000px;
}
.container-fluid h3 {
  text-align: center;
}

@media screen and (max-width: 700px) {
  .card-body {
    overflow-x: scroll;
  }
}
</style>
