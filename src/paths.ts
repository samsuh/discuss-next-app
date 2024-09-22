const paths = {
  home() {
    return '/'
  },
  projectShow(projectSlug: string) {
    return `/projects/${projectSlug}`
  },
  postCreate(projectSlug: string) {
    return `/projects/${projectSlug}/posts/new`
  },
  postShow(projectSlug: string, postId: string) {
    return `/projects/${projectSlug}/posts/${postId}`
  },
}

export default paths
