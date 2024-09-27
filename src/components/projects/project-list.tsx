import Link from 'next/link'
import { Chip } from '@nextui-org/react'
import { db } from '@/db'
import paths from '@/paths'
import { div } from 'framer-motion/client'

export default async function ProjectList() {
  const projects = await db.project.findMany()

  const renderedProjects = projects.map((project) => {
    return (
      <div key={project.id}>
        <Link href={paths.projectShow(project.slug)}>
          <Chip color="warning" variant="shadow">
            {project.slug}
          </Chip>
        </Link>
      </div>
    )
  })

  return <div className="flex flex-row flex-wrap gap-2">{renderedProjects}</div>
}
