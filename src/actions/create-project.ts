'use server'

import { z } from 'zod'
import { auth } from '@/auth'
import type { Project } from '@prisma/client'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import paths from '@/paths'
import { revalidatePath } from 'next/cache'

const createProjectSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: 'Must be lowercase letters or dashes no spaces',
    }),
  description: z.string().min(10),
})

interface CreateProjectFormState {
  errors: {
    name?: string[]
    description?: string[]
    _form?: string[]
  }
}

export async function createProject(
  formState: CreateProjectFormState,
  formData: FormData
): Promise<CreateProjectFormState> {
  const result = createProjectSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  })

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  //check user's session
  const session = await auth()
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be signed in to do this!'],
      },
    }
  }

  let project: Project
  try {
    project = await db.project.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    })
  } catch (error: unknown) {
    //if error, assign to _form property in formState
    if (error instanceof Error) {
      return {
        errors: { _form: [error.message] },
      }
    } else {
      return {
        errors: { _form: ['Something went wrong'] },
      }
    }
  }

  revalidatePath('/')
  redirect(paths.projectShow(project.slug))
}
