<template>
  <h2>Edit post</h2>
  <hr />
  <br />
  <form @submit.prevent="submitEditPost()">
    <div class="mb-3">
      <label for="title" class="form-label">Title</label>
      <input
        v-model="title"
        type="text"
        class="form-control"
        placeholder="Title"
        name="title"
        maxlength="255"
        required
      />
    </div>
    <div class="mb-3">
      <label for="body" class="form-label">Body</label>
      <textarea
        v-model="body"
        class="form-control"
        placeholder="Body"
        name="body"
        required
      ></textarea>
    </div>
    <div class="mb-3">
      <button type="submit" class="btn btn-info">Edit</button>
    </div>
  </form>
</template>
<script>
import axios from "axios"
export default {
  created() {
    this.getPostDetail()
  },
  data: () => ({
    title: "",
    body: "",
  }),
  methods: {
    getPostDetail() {
      const postId = this.$route.params.id
      axios
        .get(`http://127.0.0.1:8000/api/post-detail/${postId}`)
        .then((response) => {
          const post = { ...response.data }
          this.title = post.title
          this.body = post.body
        })
    },
    submitEditPost() {
      const payload = {
        title: this.title,
        body: this.body,
      }
      const postId = this.$route.params.id
      axios
        .post(`http://127.0.0.1:8000/api/post-update/${postId}`, payload)
        .then((response) => {
          this.$router.push("/")
        })
    },
  },
}
</script>
