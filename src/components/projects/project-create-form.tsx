'use client'

import { useFormState } from 'react-dom'
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@nextui-org/react'
import * as actions from '@/actions'
import FormButton from '../common/form-button'

export default function ProjectCreateForm() {
  const [formState, action] = useFormState(actions.createProject, {
    errors: {},
  })
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create New Project</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Project</h3>
            <Input
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              name="name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(', ')}
            />
            <Textarea
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your Project"
              name="description"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(', ')}
            />
            {formState.errors._form ? (
              <div className="p-2 bg-red-200 border rounded border-red-400">
                {formState.errors._form?.join(', ')}
              </div>
            ) : null}
            <FormButton>Create Project</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}
