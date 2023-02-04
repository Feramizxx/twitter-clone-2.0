import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tweet',
  title: 'Tweet',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'blockTweet',
      title: 'Block Tweet',
      description: 'ADMIN Controls: Toggle if tweet is deemed inapropriate',
      type: 'boolean',
    }),

    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
    }),

    defineField({
      name: 'profileImg',
      title: 'Profile Image',
      type: 'string',
    }),


    defineField({
      name: 'image',
      title: 'tweet Image',
      type: 'string',
    }),
  ],

  // preview: {
  //   select: {
  //     title: 'title',
  //     author: 'author.name',
  //     media: 'mainImage',
  //   },
  //   prepare(selection) {
  //     const {author} = selection
  //     return {...selection, subtitle: author && `by ${author}`}
  //   },
  // },
})
