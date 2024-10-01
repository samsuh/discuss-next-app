'use server'

import { auth } from '@/auth'
import { z } from 'zod'

//validate incoming inputs using zod
//create the post
//do error handling
//revalidate route and redirect

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
})

interface CreatePostFormState {
  errors: {
    title?: string[]
    content?: string[]
    _form?: string[]
  }
}

export async function createPost(formState: CreatePostFormState, formData: FormData): Promise<CreatePostFormState> {
  //how to check if user is logged in. error if not logged in trying to perform this action
  const session = await auth()
  if (!session || !session.user){
    return {
      errors: {
        _form: ['Must be logged in to perform this action']
      }
    }
  }

  const result = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content')
  })

  if (!result.success){
    return {errors: result.error.flatten().fieldErrors}
  }
  
  //temp 
  return {errors: {}}

  //todo: revalidate topicShowPage after creating a new post
}
