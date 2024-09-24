'use server'

import { desc } from 'framer-motion/client'

export async function createProject(formData: FormData) {
  const name = formData.get('name')
  const description = formData.get('description')
  console.log('Name is:', name)
  console.log('Description is:', description)

  //todo: revalidate homepage after new project creation
}
