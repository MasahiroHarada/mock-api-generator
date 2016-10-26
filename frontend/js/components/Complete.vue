<template lang="html">
  <div id="complete">
    <h2>Successfully created your mock API!</h2>
    <div class="form-part">
      <label>URL</label>
      <textarea readonly class="unresizable" rows="2" cols="40" :value="url"></textarea>
    </div>
    <div class="form-part" v-if="apiKey">
      <label>API Key</label>
      <input type="text" readonly :value="apiKey">
    </div>
    <div class="form-part form-part-btn">
      <a class="btn" :href="url" target="_blank" v-if="!apiKey">try api</a>
      <button
        type="button"
        class="btn"
        @click="onBackToHomeClick">back to home</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: [
    'url',
    'apiKey',
    'backToHome'
  ]
}
</script>
