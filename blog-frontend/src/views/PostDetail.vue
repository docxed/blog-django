<template>
  <div v-if="post">
    <h2>{{ post.title }}</h2>
    <hr />
    <br />
    <p>{{ post.body }}</p>
    <p>ID {{ post.id }}</p>
    <p>Date {{ post.pub_date }}</p>
  </div>
</template>
<script>
import axios from "axios"
export default {
  created() {
    this.getPostDetail()
  },
  data: () => ({
    post: null,
  }),
  methods: {
    async getPostDetail() {
      const postId = this.$route.params.id
      axios
        .get(`http://127.0.0.1:8000/api/post-detail/${postId}`)
        .then((response) => {
          this.post = { ...response.data }
        })
    },
  },
}
</script>
