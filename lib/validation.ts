const MAX = {
  name: 120,
  email: 254,
  phone: 30,
  company: 160,
  title: 160,
  slug: 160,
  category: 100,
  description: 5000,
  shortDescription: 500,
  serviceDescription: 5000,
  review: 3000,
  url: 2048,
  icon: 100,
  message: 5000,
  technology: 100,
  feature: 300,
  status: 50,
};

export function text(value: unknown, field: string, max: number): string;
export function text(
  value: unknown,
  field: string,
  max: number,
  required: true
): string;
export function text(
  value: unknown,
  field: string,
  max: number,
  required: false
): string | undefined;
export function text(
  value: unknown,
  field: string,
  max: number,
  required: boolean = true
): string | undefined {
  if (value == null || value === "") {
    if (required) {
      throw new Error(`${field} is required.`);
    }

    return undefined;
  }

  if (typeof value !== "string") {
    throw new Error(`${field} must be text.`);
  }

  const v = value.trim();

  if (required && !v) {
    throw new Error(`${field} is required.`);
  }

  if (v.length > max) {
    throw new Error(`${field} is too long.`);
  }

  return v;
}

export function boolean(value: unknown, field: string): boolean {
  if (typeof value !== "boolean") {
    throw new Error(`${field} must be a boolean.`);
  }

  return value;
}

export function integer(
  value: unknown,
  field: string,
  min?: number,
  max?: number
): number {
  if (
    typeof value !== "number" ||
    !Number.isInteger(value) ||
    !Number.isFinite(value)
  ) {
    throw new Error(`${field} must be an integer.`);
  }

  if (min !== undefined && value < min) {
    throw new Error(`${field} is too small.`);
  }

  if (max !== undefined && value > max) {
    throw new Error(`${field} is too large.`);
  }

  return value;
}

export function stringList(
  value: unknown,
  field: string,
  maxItems = 50,
  maxItemLength = 300
): string[] {
  if (!Array.isArray(value)) {
    throw new Error(`${field} must be an array.`);
  }

  if (value.length > maxItems) {
    throw new Error(`${field} has too many items.`);
  }

  return value.map((item, index) =>
    text(item, `${field}[${index}]`, maxItemLength)
  );
}

export function email(value: unknown, field = "Email"): string {
  const v = text(value, field, MAX.email).toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
    throw new Error(`${field} is invalid.`);
  }

  return v;
}

export function url(
  value: unknown,
  field = "URL",
  required = false
): string | undefined {
  /*
   * Do not pass the runtime boolean directly to text().
   * The text() overloads intentionally distinguish literal true/false,
   * so handle the optional case here.
   */
  if (value == null || value === "") {
    if (required) {
      throw new Error(`${field} is required.`);
    }

    return undefined;
  }

  const v = text(value, field, MAX.url, true);

  try {
    const parsed = new URL(v);

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new Error();
    }
  } catch {
    throw new Error(`${field} must be a valid HTTP(S) URL.`);
  }

  return v;
}

export function phone(value: unknown, field = "Phone"): string | undefined {
  if (value == null || value === "") {
    return undefined;
  }

  const v = text(value, field, MAX.phone, false);

  if (!v) {
    return undefined;
  }

  if (!/^[+()\d\s.-]{7,30}$/.test(v)) {
    throw new Error(`${field} is invalid.`);
  }

  return v;
}

export const limits = MAX;