import ProjectCreateForm from '@/components/projects/project-create-form'
import ProjectList from '@/components/projects/project-list'
import { Divider } from '@nextui-org/react'

export default async function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top Posts</h1>
      </div>
      <div className="border shadow py-3 px-2">
        <ProjectCreateForm />
        <Divider className="my-2" />
        <h3 className="text-lg">Projects</h3>
        <ProjectList />
      </div>
    </div>
  )
}
