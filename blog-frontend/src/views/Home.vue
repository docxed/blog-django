<template>
  <h2>Create post</h2>
  <hr />
  <br />
  <form @submit.prevent="submitPost()">
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
      <button type="submit" class="btn btn-success">Create</button>
    </div>
  </form>
  <br /><br />
  <h2>Posts</h2>
  <hr />
  <br />
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Title</th>
        <th scope="col" colspan="3">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="post in posts" :key="post.id">
        <th scope="row">{{ post.id }}</th>
        <td>{{ post.title }}</td>
        <td>
          <router-link
            class="btn btn-primary btn-sm"
            :to="`/postDetail/${post.id}`"
            >Detail</router-link
          >
        </td>
        <td>
          <router-link
            class="btn btn-warning btn-sm"
            :to="`/postEdit/${post.id}`"
            >Edit</router-link
          >
        </td>
        <td>
          <a class="btn btn-danger btn-sm" @click="deletePost(post.id)"
            >Delete</a
          >
        </td>
      </tr>
      <tr>
        <td colspan="5" v-if="posts.length == 0">
          <p class="text-center">No posts found</p>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import axios from "axios"
export default {
  created() {
    this.getPostList()
  },
  data: () => ({
    title: "",
    body: "",
    posts: [],
  }),
  methods: {
    deletePost(postId) {
      if (confirm("Are you sure you want to delete this post?") == false) return
      axios
        .delete(`http://127.0.0.1:8000/api/post-delete/${postId}`)
        .then((response) => {
          this.posts = this.posts.filter((post) => post.id !== postId)
        })
    },
    getPostList() {
      axios.get(`http://127.0.0.1:8000/api/post-list/`).then((response) => {
        this.posts = [...response.data]
      })
    },
    submitPost() {
      const payload = {
        title: this.title,
        body: this.body,
      }
      axios
        .post(`http://127.0.0.1:8000/api/post-create/`, payload)
        .then((response) => {
          this.posts.push({
            id: response.data.id,
            title: response.data.title,
            body: response.data.body,
          })
          this.title = ""
          this.body = ""
        })
    },
  },
}
</script>
