import { httpPost } from '../helpers/http'

export default {
  crawlingProduct: ({ links }) =>
    httpPost(
      '/guest/crawler',
      {
        links,
      },
      {}
    ),
}
