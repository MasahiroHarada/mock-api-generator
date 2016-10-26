<template lang="html">
  <div id="mock-form">
    <p class="error" v-if="error">{{error}}</p>
    <form>
      <div class="form-part">
        <textarea
          name="mock-body" rows="12" cols="40"
          placeholder="response body (application/json)"
          v-model="body"></textarea>
        <p class="error" v-if="jsonError">{{jsonError}}</p>
      </div>
      <div class="form-part">
        <input type="checkbox" name="mock-is-auth" id="mock-is-auth" v-model="isAuth">
        <label for="mock-is-auth">authenticate with API key</label>
      </div>
      <div class="form-part form-part-btn">
        <button
          type="button" name="button"
          class="btn"
          @click="create">generate</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      body: '',
      isAuth: false,
      jsonError: null,
      error: null
    }
  },
  props: [
    'showLoading',
    'onCreate',
    'onError'
  ],
  methods: {
    create() {
      if (!this.isValidForm()) {
        return false;
      }
      this.showLoading();
      this.submitForm();
    },
    submitForm() {
      const url = '/create';
      const req = {
        "mock-body": this.body,
        "mock-is-auth": this.isAuth
      };
      this.$http.post(url, req)
        .then(response => {
          if (!response.ok) {
            throw Error();
          }
          this.onCreate(response.body.data);
          this.clearForm();
        })
        .catch(error => {
          this.onError();
          this.error = 'Sorry, something\'s not quite right';
        });
    },
    isValidForm() {
      if (this.body === '') {
        this.jsonError = 'Response body cannot be empty';
        return false;
      }
      try {
        JSON.parse(this.body);
        return true;
      } catch (err) {
        this.jsonError = `SyntaxError: ${err.message}`;
        return false;
      }
    },
    clearForm() {
      this.body = '';
      this.isAuth = false;
    }
  }
}
</script>
