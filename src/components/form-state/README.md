# Form State Management Components

A reusable form component set that manages submitting and error states, following the cursor rules for component architecture.

## File Structure

```
components/form-state/
├── form-state.tsx          # Main form component
├── form-state.ui.tsx       # Client UI components
├── form-state.state.tsx    # State management
├── form-state.type.ts      # Shared types
├── index.ts               # Exports
└── README.md              # Documentation
```

## Usage

### Basic Form

```tsx
import { Form, FormErrorDisplay, FormSubmitMessage } from '@/components/form-state'
import { Button } from '@/components/ui/button'

async function submitForm(formData: FormData) {
  // Your form submission logic
  const result = await yourServerAction(formData)
  return { success: result.success, error: result.error }
}

export function MyForm() {
  return (
    <Form action={submitForm}>
      <div className="space-y-4">
        <input name="title" placeholder="Title" />
        <textarea name="description" placeholder="Description" />
        
        <FormErrorDisplay />
        
        <div className="flex gap-2">
          <Button type="submit">
            <FormSubmitMessage>Submit</FormSubmitMessage>
          </Button>
        </div>
      </div>
    </Form>
  )
}
```

### With Server Action

```tsx
import { Form, FormErrorDisplay, FormSubmitMessage, FormResetButton } from '@/components/form-state'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'

async function createPost(formData: FormData) {
  'use server'
  
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  
  try {
    // Your server action logic
    await savePost({ title, description })
    
    // Handle success (redirect, etc.)
    redirect('/posts')
  } catch (error) {
    return { 
      success: false, 
      error: 'Failed to create post' 
    }
  }
}

export function MyForm() {
  return (
    <Form action={createPost}>
      <div className="space-y-4">
        <input name="title" placeholder="Title" />
        <textarea name="description" placeholder="Description" />
        
        <FormErrorDisplay />
        
        <div className="flex gap-2">
          <Button type="submit">
            <FormSubmitMessage>Submit</FormSubmitMessage>
          </Button>
          <FormResetButton>Reset</FormResetButton>
        </div>
      </div>
    </Form>
  )
}
```

### Using State Hooks

```tsx
import { useForm, useFormActions, useFormContext } from '@/components/form-state'

function CustomSubmitButton() {
  const { isSubmitting } = useForm()
  const dispatch = useFormActions()
  const { action } = useFormContext()

  const handleCustomAction = () => {
    dispatch({ type: 'SET_ERROR', payload: 'Custom error message' })
  }

  return (
    <button 
      type="submit" 
      disabled={isSubmitting}
      onClick={handleCustomAction}
    >
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
  )
}
```

### With Pending Message

```tsx
import { Form, FormErrorDisplay, FormPendingMessage } from '@/components/form-state'

export function MyForm() {
  return (
    <Form action={submitForm}>
      <div className="space-y-4">
        <input name="title" placeholder="Title" />
        
        <FormErrorDisplay />
        <FormPendingMessage>Processing your request...</FormPendingMessage>
        
        <button type="submit">Submit</button>
      </div>
    </Form>
  )
}
```

## Components

### Form
Main form component that provides FormProvider and injects action into context.

**Props:**
- `action`: Form action function to handle submission
- `children`: Form content

### FormErrorDisplay
Displays error messages when form submission fails.

### FormSubmitMessage
Shows submit button text with loading state. Use inside your own submit button.

### FormPendingMessage
Shows pending/loading message when form is submitting.

### FormResetButton
Button to reset form state to initial values.

## State Management

The form state includes:
- `isSubmitting`: Whether the form is currently being submitted
- `error`: Current error message (null if no error)
- `hasSubmitted`: Whether the form has been submitted at least once

## Hooks

- `useForm()`: Get current form state
- `useFormActions()`: Get dispatch function for state updates
- `useFormContext()`: Get form context (includes state, dispatch, and action)

## Architecture

This component set follows the cursor rules:
- Server components handle content composition
- Client components handle interactivity and state
- State management is separated into its own file
- Types are defined in a separate file
- UI components are extracted for reusability
- Users create their own submit buttons for maximum flexibility
