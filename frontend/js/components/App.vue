<template>
  <div>
    <mock-form
      v-if="isShowForm"
      :showLoading="showLoading.bind(this)"
      :onError="backToHome.bind(this)"
      :onCreate="onCreate.bind(this)"></mock-form>
    <loading v-if="isShowLoading"></loading>
    <complete
      v-if="isShowComplete"
      :url="url"
      :apiKey="apiKey"
      :onBackToHomeClick="backToHome.bind(this)"></complete>
  </div>
</template>

<script>
const MockFormComponent = require('./MockForm.vue');
const LoadingComponent = require('./Loading.vue');
const CompleteComponent = require('./Complete.vue');

export default {
  components: {
    "mock-form": MockFormComponent,
    "loading": LoadingComponent,
    "complete": CompleteComponent
  },
  data() {
    return {
      loading: false,
      complete: false,
      apiKey: '',
      url: ''
    }
  },
  computed: {
    isShowForm() {
      return !this.loading && !this.complete;
    },
    isShowLoading() {
      return this.loading && !this.complete;
    },
    isShowComplete() {
      return !this.loading && this.complete;
    }
  },
  methods: {
    showLoading() {
      this.loading = true;
      this.complete = false;
    },
    showComplete() {
      this.loading = false;
      this.complete = true;
    },
    backToHome() {
      this.loading = false;
      this.complete = false;
    },
    onCreate(responseData) {
      this.url = responseData.url;
      this.apiKey = responseData.apiKey;
      this.showComplete();
    }
  }
}
</script>
