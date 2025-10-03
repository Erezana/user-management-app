export type UserForm = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  website?: string;
  street?: string;
  city?: string;
};

export function validateUser(form: UserForm) {
  const errors: Partial<Record<keyof UserForm, string>> = {};

  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  return errors;
}
