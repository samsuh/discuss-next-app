'use server'

import { auth } from '@/auth'
import { db } from '@/db'
import paths from '@/paths'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
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

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  //how to check if user is logged in. error if not logged in trying to perform this action
  const session = await auth()
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['Must be logged in to perform this action'],
      },
    }
  }

  const project = await db.project.findFirst({
    where: { slug },
  })

  if (!project) {
    return {
      errors: {
        _form: ['Cannot find that project'],
      },
    }
  }

  const result = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  })

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }

  let post
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        projectId: project.id,
      },
    })
  } catch (error) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } }
    } else {
      return { errors: { _form: ['Failed to create Post'] } }
    }
  }

  revalidatePath(paths.projectShow(slug))
  redirect(paths.postShow(slug, post.id))

  //todo: revalidate topicShowPage after creating a new post
}
