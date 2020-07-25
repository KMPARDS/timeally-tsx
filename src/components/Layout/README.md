## Using Layout Component

```tsx
<Layout title="New Page Title">
  <p>Child elements</p>
</Layout>
```

#### Note

The `title` prop is required to be passed.

#### More optional props

- **`subtitle`** Takes in a string
- **`transparent`** Booelan
- **`button`** takes an object

```ts
type LayoutProps = {
  title: string;
  subtitle?: string;
  transparent?: boolean;
  button?: {
    name: string;
    link?: string;
    className?: string;
    onClick?: (event: any) => void;
  };
};
```
