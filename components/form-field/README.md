# Form Field Components

A comprehensive set of form field components that use React Context to eliminate prop drilling. These components automatically manage field properties like `id`, `name`, `disabled`, `required`, and validation states.

## Features

- **Context-based prop management** - No more prop drilling for field properties
- **Automatic ID generation** - Uses React's `useId` to generate unique IDs when not provided
- **Automatic form state integration** - Fields automatically disable when form is submitting
- **Form context error integration** - FormError reads field-specific errors from form context by field name
- **Built-in validation support** - Error states and validation messages
- **Accessibility ready** - Proper ARIA attributes and labels
- **Flexible composition** - Support for `asChild` pattern with Radix UI
- **TypeScript support** - Full type safety and IntelliSense

## Components

### Core Components

- `FormField` - Main wrapper that provides context and auto-generates IDs
- `FormLabel` - Label component with automatic `htmlFor` association
- `FormInput` - Input component with automatic field properties and form state integration
- `FieldError` - Field error message display component with conditional rendering
- `FormHelpText` - Help text display component

## Basic Usage

### Simple Text Input

```tsx
import { FormField, FormLabel, FormInput, FieldError, FormHelpText } from '@/components/form-field'

function ContactForm() {
  return (
    <FormField required>
      <FormLabel>Email Address</FormLabel>
      <FormInput type="email" placeholder="Enter your email" />
      <FormHelpText>We'll never share your email with anyone else.</FormHelpText>
      <FieldError />
    </FormField>
  )
}
```

## Advanced Usage

### Using with Form State

The form field components automatically integrate with the existing form state system:

```tsx
import { Form } from '@/components/form-state'
import { FormField, FormLabel, FormInput, FieldError } from '@/components/form-field'

async function handleSubmit(formData: FormData) {
  // Form submission logic
  return { success: true }
}

function ContactForm() {
  return (
    <Form action={handleSubmit}>
      <FormField required>
        <FormLabel>Full Name</FormLabel>
        {/* will be disabled when form is submitting */}
        <FormInput type="text" placeholder="Enter your full name" />
        <FieldError when="empty">
          Name is required
        </FieldError>
        <FieldError when="invalid">
          Name is invalid
        </FieldError>
      </FormField>
      
      <FormField required>
        <FormLabel>Email Address</FormLabel>
        {/* will be disabled when form is submitting */}
        <FormInput type="email" placeholder="Enter your email" />
        <FieldError when="empty">
          Email is required
        </FieldError>
        <FieldError when="invalid">
          Email is invalid
        </FieldError>
      </FormField>
      
      <Button type="submit">
        <FormSubmitMessage>Submit</FormSubmitMessage>
        <FormPendingMessage>Submitting...</FormPendingMessage>
      </Button>
    </Form>
  )
}
```

### Using asChild Pattern

You can use the `asChild` prop to render components as different elements, including textareas:

```tsx
import { FormField, FormLabel, FormInput } from '@/components/form-field'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

function CustomForm() {
  return (
    <FormField>
      <FormLabel asChild>
        <Label>Custom Label</Label>
      </FormLabel>
      <FormInput asChild>
        <Input placeholder="Custom input" />
      </FormInput>
    </FormField>
  )
}

function TextareaForm() {
  return (
    <FormField>
      <FormLabel>Message</FormLabel>
      <FormInput asChild>
        <Textarea placeholder="Enter your message" rows={4} />
      </FormInput>
      <FieldError />
    </FormField>
  )
}
```

### Custom Error Messages

```tsx
import { FormField, FormLabel, FormInput, FieldError } from '@/components/form-field'

function CustomErrorForm() {
  return (
    <FormField required>
      <FormLabel>Password</FormLabel>
      <FormInput type="password" />
      <FieldError when="empty" asChild>
        <div className="text-red-500 text-sm">
          Password is required
        </div>
      </FieldError>
      <FieldError when="invalid" asChild>
        <div className="text-red-500 text-sm">
          Password must be at least 8 characters long
        </div>
      </FieldError>
    </FormField>
  )
}
```

## API Reference

### FormField Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fieldId` | `string` | auto-generated | Unique identifier for the field (auto-generated if not provided) |
| `name` | `string` | `fieldId` | Name attribute for the field |
| `required` | `boolean` | `false` | Whether the field is required |
| `disabled` | `boolean` | `false` | Whether the field is disabled |
| `readOnly` | `boolean` | `false` | Whether the field is read-only |
| `value` | `string \| number \| boolean` | - | Current field value |
| `error` | `string` | - | Field validation error message |
| `helpText` | `string` | - | Help/description text for the field |
| `label` | `string` | - | Field label text |
| `placeholder` | `string` | - | Field placeholder text |
| `type` | `string` | `'text'` | Field type (text, email, password, etc.) |
| `min` | `number` | - | Minimum value for number inputs |
| `max` | `number` | - | Maximum value for number inputs |
| `step` | `number` | - | Step value for number inputs |
| `maxLength` | `number` | - | Maximum length for text inputs |
| `pattern` | `string` | - | Pattern for input validation |
| `autoComplete` | `string` | - | Auto-complete attribute |
| `className` | `string` | - | Additional CSS classes |

### FormLabel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Label content |
| `asChild` | `boolean` | `false` | Render as different element |
| `className` | `string` | - | Additional CSS classes |

### FormInput Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Input content (for asChild) |
| `asChild` | `boolean` | `false` | Render as different element |
| `className` | `string` | - | Additional CSS classes |
| `inputProps` | `InputHTMLAttributes` | - | Additional input props |

**Note**: FormInput automatically disables when the form is submitting (if used within a Form component).

### FieldError Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Error content (for asChild) |
| `asChild` | `boolean` | `false` | Render as different element |
| `className` | `string` | - | Additional CSS classes |
| `when` | `'empty' \| 'invalid'` | `'invalid'` | When to show the error message |

### FormHelpText Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Help text content (for asChild) |
| `asChild` | `boolean` | `false` | Render as different element |
| `className` | `string` | - | Additional CSS classes |

## Automatic ID Generation

The `FormField` component automatically generates unique IDs using React's `useId` hook when no `fieldId` is provided:

```tsx
// ID will be auto-generated (e.g., ":r1:")
<FormField required>
  <FormLabel>Email</FormLabel>
  <FormInput type="email" />
</FormField>

// Or provide your own ID
<FormField fieldId="user-email" required>
  <FormLabel>Email</FormLabel>
  <FormInput type="email" />
</FormField>
```

## Context Integration

The form field components automatically integrate with the existing form state system:

- **Automatic disabling** - Fields are automatically disabled when `formState.isSubmitting` is true
- **Validation states** - Fields show invalid state when there are errors or required fields are empty after submission
- **Error display** - Error messages are automatically associated with fields using ARIA attributes
- **Form context error integration** - FieldError components automatically read field-specific errors from the form context by field name

### Form Context Error Integration

The `FieldError` component now reads field-specific errors from the form context using the field's `name` attribute. This allows for centralized error management:

```tsx
// FieldError automatically reads errors for the "email" field from form context
<FormField name="email" required>
  <FormLabel>Email</FormLabel>
  <FormInput type="email" />
  <FieldError when="invalid" /> {/* Reads from form context by field name */}
</FormField>
```

You can set field errors programmatically using the form actions:

```tsx
import { useFormActions, FormActionType } from '@/components/form-state'

function MyComponent() {
  const formActions = useFormActions()
  
  // Set a field error
  formActions({
    type: FormActionType.SetFieldError,
    payload: { fieldName: 'email', error: 'This email is already taken' }
  })
  
  // Clear a field error
  formActions({
    type: FormActionType.ClearFieldError,
    payload: 'email'
  })
}
```

## Accessibility Features

- **Automatic label association** - Labels are automatically associated with inputs using `htmlFor`
- **ARIA attributes** - Proper `aria-invalid`, `aria-describedby`, and `role` attributes
- **Error announcements** - Error messages are announced to screen readers
- **Required field indicators** - Visual indicators for required fields

## TypeScript Support

All components are fully typed with TypeScript:

```tsx
import type { FormFieldProps, FormLabelProps, FormInputProps } from '@/components/form-field'

// Type-safe props - fieldId is optional and will be auto-generated
const fieldProps: FormFieldProps = {
  required: true,
  type: 'email',
  children: <FormLabel>Email</FormLabel>
}
```
