<template>
  <div class="container">
    <div>
      <prismic-image :field="document.hero_image"/>

      <h1 class="title">{{ $prismic.richTextAsPlain(document.title) }}</h1>

      <prismic-rich-text :field="document.content"/>
    </div>
  </div>
</template>

<script>
import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo,
  },
  head () {
    return {
      title: this.$prismic.richTextAsPlain(this.document.page_title),
      meta: [
        { hid: 'description', name: 'description', content: this.$prismic.richTextAsPlain(this.document.page_description) }
      ]
    }
  },
  async asyncData({ context, error, req }) {
    try {
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, { req })
      const result = await api.getSingle('homepage')
      const document = result.data

      return {
        document,
        documentId: result.id,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-bottom: 50px;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
